const sgMail = require("@sendgrid/mail");
const clientUrl = process.env.CLIENT_URL;
const emailUser = process.env.EMAIL_USER;
const sendgridKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridKey);

const sendRegistrationConfirmation = async (email, token) => {
  const msg = {
    to: `${email}`,
    from: emailUser,
    subject: `Verify your account`,
    text: "and easy to do anywhere, even with Node.js",
    html: `<p>Hello, please click the following link to verify your account.</p>
              <br>
              <p><a href="${clientUrl}/confirm/${token}">Verify Me</a></p>
              <br>
              <p>Thanks,</p>
              <p>Food Oasis</p>`
  };
  sgMail.send(msg, false, (err, result) => {
    if (err) {
      return Promise.reject("Sending registration confirmation email failed.");
    } else {
      return Promise.resolve(result);
    }
  });
};

module.exports = {
  sendRegistrationConfirmation
};

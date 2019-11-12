const nodemailer = require("nodemailer");
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;
const emailUser = process.env.EMAIL_USER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendRegistrationConfirmation = async (email, token) => {
  const options = {
    to: `${email}`,
    from: emailUser,
    subject: `Verify your account`,
    html: `<p>Hello, please click the following link to verify your account.</p>
            <br>
            <p><a href="${serverUrl}/accounts/confirm/${token}">Verify Me</a></p>
            <br>
            <p>Thanks,</p>
            <p>Food Oasis</p>`
  };
  transporter.sendMail(options, function(err, result) {
    if (err) {
      return Promise.reject("Sending registration confirmation email failed.");
    } else {
      return Promise.resolve(result);
    }
  });
};

const sendResetPasswordConfirmation = async (email, token) => {
  const options = {
    to: `${email}`,
    from: "dnr.jobsforhope@gmail.com",
    subject: `Password Reset`,
    html: `
                <p>Please click the following link to reset your password.</p>
                <br>
                <p><a href='${clientUrl}/accounts/reset/${token}'>Reset</a></p>
                <br>
                <p>Thanks,</p>
                <p>Food Oasis</p>`
  };
  transporter.sendMail(options, function(err, result) {
    if (err) {
      return Promise.reject(
        "Sending reset password confirmation email failed."
      );
    } else {
      return Promise.resolve(result);
    }
  });
};

module.exports = {
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation
};

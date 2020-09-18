const applyEmailTemplate = require("../../client/src/helpers/EmailTemplate");
const nodemailer = require("nodemailer");
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;
const emailUser = process.env.EMAIL_USER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendRegistrationConfirmation = async (
  email,
  token,
  emailTemplate = applyEmailTemplate
) => {
  const emailBody = `
    <p style="font-weight: bold;">
      Hello,
    </p>
    <p>
      Thank you for registering with Food Oasis HI! 
      Please take a moment to verify your account by clicking the link below.
    <br>
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;background-color: #336699;border:1px solid #353535; border-radius: 5px;margin-left: auto;margin-right: auto;">
      <tr>
      <td class="button" style="padding:0;font-size:14px;line-height:16px;letter-spacing:0.04em;text-transform:uppercase;color:#C4C4C4;border: none;border-radius: 3px;color: #ffffff;padding: 10px 14px;">
        <a href="${serverUrl}/accounts/confirm/${token}" style="text-decoration: none;line-height: 100%;background: #336699;color: #ffffff;">Verify Email</a>
      </td>
      </tr>
    </table>
    <br>
    Thanks,
    <br>
    Food Oasis Team
  `;
  const options = {
    to: `${email}`,
    from: emailUser,
    subject: `Verify your account`,
    html: `${emailTemplate.applyEmailTemplate(emailBody)}`,
  };
  transporter.sendMail(options, function (err, result) {
    if (err) {
      return Promise.reject("Sending registration confirmation email failed.");
    } else {
      return Promise.resolve(result);
    }
  });
};

const sendResetPasswordConfirmation = async (
  email,
  token,
  emailTemplate = applyEmailTemplate
) => {
  const emailBody = `
    <p style="font-weight: bold;">
      Hello,
    </p>
    <p>
      Your Food Oasis HI password can be reset by clicking the link below.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;background-color: #336699;border:1px solid #353535; border-radius: 5px;margin-left: auto;margin-right: auto;">
      <tr>
      <td class="button" style="padding:0;font-size:14px;line-height:16px;letter-spacing:0.04em;text-transform:uppercase;color:#C4C4C4;border: none;border-radius: 3px;color: #ffffff;padding: 10px 14px;">
        <a href="${clientUrl}/accounts/reset/${token}" style="text-decoration: none;line-height: 100%;background: #336699;color: #ffffff;">Reset Password</a>
      </td>
      </tr>
    </table>
    <br>
    Regards,
    <br>
    Food Oasis HI Team
  `;
  const options = {
    to: `${email}`,
    from: emailUser,
    subject: `Password Reset`,
    html: `${emailTemplate.applyEmailTemplate(emailBody)}`,
  };
  transporter.sendMail(options, function (err, result) {
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
  sendResetPasswordConfirmation,
};

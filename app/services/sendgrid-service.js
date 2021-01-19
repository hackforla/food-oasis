const sgMail = require("@sendgrid/mail");
const applyEmailTemplate = require("./EmailTemplate");
const clientUrl = process.env.CLIENT_URL;
const emailUser = process.env.EMAIL_USER;
const sendgridKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridKey);

const send = async (emailTo, emailFrom, subject, textBody, htmlBody) => {
  const msg = {
    to: emailTo,
    from: emailFrom,
    subject: subject,
    text: textBody,
    html: htmlBody,
  };
  return sgMail.send(msg, false, (err) => {
    if (err) {
      return Promise.reject(
        `Sending registration confirmation email failed. ${err.message}`
      );
    }
    return Promise.resolve(true);
  });
};

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
      Thank you for registering with Food Oasis! 
      Please take a moment to verify your account by clicking the link below.
    <br>
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;background-color: #336699;border:1px solid #353535; border-radius: 5px;margin-left: auto;margin-right: auto;">
      <tr>
      <td class="button" style="padding:0;font-size:14px;line-height:16px;letter-spacing:0.04em;text-transform:uppercase;color:#C4C4C4;border: none;border-radius: 3px;color: #ffffff;padding: 10px 14px;">
        <a href="${clientUrl}/confirm/${token}" style="text-decoration: none;line-height: 100%;background: #336699;color: #ffffff;">Verify Email</a>
      </td>
      </tr>
    </table>
    <br>
    Thanks,
    <br>
    Food Oasis Team
  `;
  const msg = {
    to: `${email}`,
    from: emailUser,
    subject: `Verify your account`,
    text: `Verify your account`,
    html: `${emailTemplate(emailBody, clientUrl)}`,
  };
  return sgMail.send(msg, false, (err) => {
    if (err) {
      return Promise.reject("Sending registration confirmation email failed.");
    }
    return Promise.resolve(true);
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
      Your Food Oasis password can be reset by clicking the link below.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;background-color: #336699;border:1px solid #353535; border-radius: 5px;margin-left: auto;margin-right: auto;">
      <tr>
      <td class="button" style="padding:0;font-size:14px;line-height:16px;letter-spacing:0.04em;text-transform:uppercase;color:#C4C4C4;border: none;border-radius: 3px;color: #ffffff;padding: 10px 14px;">
        <a href="${clientUrl}/resetPassword/${token}" style="text-decoration: none;line-height: 100%;background: #336699;color: #ffffff;">Reset Password</a>
      </td>
      </tr>
    </table>
    <br>
    Regards,
    <br>
    Food Oasis Team
  `;
  const msg = {
    to: `${email}`,
    from: emailUser,
    subject: `Confirm Password Reset for Food Oasis`,
    text: `Confirm Password Reset for Food Oasis`,
    html: `${emailTemplate(emailBody, clientUrl)}`,
  };
  return sgMail.send(msg, false, (err) => {
    if (err) {
      return Promise.reject(
        "Sending password reset confirmation email failed."
      );
    } else {
      return Promise.resolve(true);
    }
  });
};

module.exports = {
  send,
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
};

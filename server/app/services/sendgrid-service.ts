import sgMail from "@sendgrid/mail";
import applyEmailTemplate from "./EmailTemplate";
import { ContactFormData, Email } from "../../types/email-type";

const emailUser: string = process.env.EMAIL_USER || "";
const sendgridKey: string = process.env.SENDGRID_API_KEY || "";
sgMail.setApiKey(sendgridKey);

const send = async (email: Email) => {
  const msg = {
    to: email.emailTo,
    from: email.emailFrom,
    subject: email.subject,
    text: email.textBody,
    html: email.htmlBody,
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
// account verification
const sendRegistrationConfirmation = async (
  email: string,
  token: string,
  clientUrl: string,
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

// password reset
const sendResetPasswordConfirmation = async (
  email: string,
  token: string,
  clientUrl: string,
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

// Contact us form
const sendContactEmail = async ({
  name,
  email,
  title,
  message,
  clientUrl,
  phone,
}: ContactFormData) => {
  const emailBody = `
  <p
  style="
    font-family: sans-serif;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 15px;
  "
>
  Hello,
</p>
<p
  style="
    font-family: sans-serif;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    margin-bottom: 15px;
  "
>
  There is a new message from a Food Oasis user.
</p>
  <table
  border="0"
  cellpadding="0"
  cellspacing="0"
  style="
    border-collapse: separate;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: auto;
  "
>
  <tbody>
    <tr>
      <td
        style="
          word-break: break-word;
          vertical-align: top;
        "
        valign="top"
      >
        <div>
          <div
            style="
              min-width: 320px;
              max-width: 600px;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: #ffffff;
            "
          >
            <div
              style="
                border-collapse: collapse;
                display: table;
                width: 100%;
                background-color: #ffffff;
              "
            >
              <div
                style="
                  min-width: 320px;
                  max-width: 600px;
                  display: table-cell;
                  vertical-align: top;
                  width: 600px;
                "
              >
                <div>
                  <div
                    style="
                      border-top: 0px solid
                        transparent;
                      border-left: 0px solid
                        transparent;
                      border-bottom: 0px solid
                        transparent;
                      border-right: 0px solid
                        transparent;
                      padding-top: 5px;
                      padding-bottom: 5px;
                      padding-right: 0px;
                      padding-left: 0px;
                    "
                  >
                    <div
                      style="
                        color: #000000;
                        font-family: Open Sans,
                          Helvetica Neue,
                          Helvetica, Arial,
                          sans-serif;
                        line-height: 1.5;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <div
                        style="
                          line-height: 1.5;
                          font-size: 12px;
                          color: #000000;
                          font-family: Open Sans,
                            Helvetica Neue,
                            Helvetica, Arial,
                            sans-serif;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                          <span
                            style="
                              color: #999999;
                            "
                            >Name</span
                          >
                        </p>
                        <span
                          style="
                            margin: 0;
                            font-size: 16px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                            font-size: 16px;
                          "
                        >
                          ${name}
                        </span>
                      </div>
                    </div>

                    <div
                      style="
                        color: #000000;
                        font-family: Open Sans,
                          Helvetica Neue,
                          Helvetica, Arial,
                          sans-serif;
                        line-height: 1.5;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <div
                        style="
                          line-height: 1.5;
                          font-size: 12px;
                          color: #000000;
                          font-family: Open Sans,
                            Helvetica Neue,
                            Helvetica, Arial,
                            sans-serif;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                          <span
                            style="
                              color: #999999;
                            "
                            >Email</span
                          >
                        </p>
                        <span
                          style="
                            margin: 0;
                            font-size: 16px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                            font-size: 16px;
                          "
                        >
                          <a
                            href="mailto:${email}"
                            target="_blank"
                            >${email}</a
                          >
                        </span>
                      </div>
                    </div>

                    <div
                      style="
                        color: #000000;
                        font-family: Open Sans,
                          Helvetica Neue,
                          Helvetica, Arial,
                          sans-serif;
                        line-height: 1.5;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <div
                        style="
                          line-height: 1.5;
                          font-size: 12px;
                          color: #000000;
                          font-family: Open Sans,
                            Helvetica Neue,
                            Helvetica, Arial,
                            sans-serif;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                          <span
                            style="
                              color: #999999;
                            "
                            >Phone Number</span
                          >
                        </p>
                        <span
                          style="
                            margin: 0;
                            font-size: 16px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                            font-size: 16px;
                          "
                        >
                          ${
                            phone
                              ? phone
                              : `Not
                          Provided`
                          }
                        </span>
                      </div>
                    </div>

                    <div
                      style="
                        color: #000000;
                        font-family: Open Sans,
                          Helvetica Neue,
                          Helvetica, Arial,
                          sans-serif;
                        line-height: 1.5;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <div
                        style="
                          line-height: 1.5;
                          font-size: 12px;
                          color: #000000;
                          font-family: Open Sans,
                            Helvetica Neue,
                            Helvetica, Arial,
                            sans-serif;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                          <span
                            style="
                              color: #999999;
                            "
                            >Message</span
                          >
                        </p>
                        <span
                          style="
                            margin: 0;
                            font-size: 16px;
                            line-height: 1.5;
                            word-break: break-word;
                            margin-top: 0;
                            margin-bottom: 0;
                            font-size: 16px;
                          "
                        >
                          ${message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>
  `;
  const msg = {
    to: `foodoasisinfo@hackforla.org`,
    from: emailUser,
    subject: title,
    text: `Contact form message`,
    html: `${applyEmailTemplate(emailBody, clientUrl)}`,
  };

  return sgMail.send(msg, false, (err) => {
    if (err) {
      console.log("ERRROR********:", err);
      return Promise.reject("Sending contact form email failed.");
    }
    return Promise.resolve(true);
  });
};

export {
  send,
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
  sendContactEmail,
};

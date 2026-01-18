import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpAuthUser = process.env.SMTP_AUTH_USER;
const smtpAuthPass = process.env.SMTP_AUTH_PASS;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure, // true for 465, false for other ports
  auth: {
    user: smtpAuthUser,
    pass: smtpAuthPass,
  },
});

/* 
    msg object should have to, subject, text, html fields
*/
// Helper to extract the domain from an email address, works for "foo@domain" and "Name <foo@domain>"
function extractDomain(address: string) {
  if (!address) return "";
  // Remove display name if present
  const match = address.match(/<?([A-Z0-9._%+-]+)@([A-Z0-9.-]+\.[A-Z]{2,})>?/i);
  if (match) {
    return match[2].toLowerCase();
  }
  return "";
}

interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

const send = async (msg: MailOptions): Promise<string> => {
  const mailOptions: MailOptions = {
    ...msg,
    from: `TDM Calculator <${smtpAuthUser}>`,
  };

  try {
    const toDomain = extractDomain(mailOptions.to);
    const fromDomain = extractDomain(mailOptions.from || "");
    if (toDomain === "test.com" || fromDomain === "test.com") {
      return "Test email - not sent";
    }
    const info = await transporter.sendMail(mailOptions);
    const message = `Message sent: ${info.messageId}`;
    console.log(message);
    return message;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error sending email: %s", errorMessage);
    throw err; // Rethrow the error for further handling
  }
};

export { send };

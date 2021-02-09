const emailService = require("../services/sendgrid-service");

const send = (req, res) => {
  const { emailFrom, emailTo, subject, textBody, htmlBody } = req.body;
  emailService
    .send(emailTo, emailFrom, subject, textBody, htmlBody || textBody)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

module.exports = {
  send,
};

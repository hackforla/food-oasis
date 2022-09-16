const emailService = require("../services/sendgrid-service");
import { RequestHandler } from "express";

const send: RequestHandler<
  never,
  never, // response
  never, // request
  never
> = (req, res) => {
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

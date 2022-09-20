import emailService from '../services/sendgrid-service'
import { RequestHandler } from "express";
// import {Promi}
import { email } from "../types/email-type";
import { ClientResponse } from '@sendgrid/mail';
const send: RequestHandler<
  never, // route param
  [ClientResponse, {}] | { error: string }, // response
  email, // request
  never // query param
> = (req, res) => {
  const { emailFrom, emailTo, subject, textBody, htmlBody } = req.body;
  emailService.send(emailTo, emailFrom, subject, textBody, htmlBody || textBody)
    .then(resp => res.send(resp))
    .catch((err: any) => res.status(404).json({ error: err.toString() }))
};

export { send };

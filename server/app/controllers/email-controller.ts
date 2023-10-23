import * as emailService from "../services/sendgrid-service";
import { RequestHandler } from "express";
import { Email, ContactFormData } from "../../types/email-type";
import { ClientResponse } from "@sendgrid/mail";

const send: RequestHandler<
  // route params
  never, 
  // response
  [ClientResponse, Record<string, never>] | { error: string }, 
  // request
  Email,
  // query params 
  never 
> = (req, res) => {
  const email: Email = {
    emailFrom: req.body.emailFrom,
    emailTo: req.body.emailTo,
    subject: req.body.subject,
    textBody: req.body.textBody,
    htmlBody: req.body.htmlBody || req.body.textBody,
  };

  emailService
    .send(email)
    .then((resp) => res.send(resp))
    .catch((err: any) => res.status(404).json({ error: err.toString() }));
};

const sendContactForm: RequestHandler<
  // route params
  never, 
  // response
  [ClientResponse, Record<string, never>] | { error: string }, 
  // request
  ContactFormData, 
  // query params
  never 
> = (req, res) => {
  emailService
    .sendContactEmail(req.body)
    .then((resp) => res.send(resp))
    .catch((err: any) => res.status(404).json({ error: err.toString() }));
};

export { send, sendContactForm };

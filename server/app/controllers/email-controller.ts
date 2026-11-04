import * as emailService from "../services/ses-service";
import { RequestHandler } from "express";
import { ContactFormData } from "../../types/email-type";
import { SendEmailCommandOutput } from "@aws-sdk/client-ses";

const sendContactForm: RequestHandler<
  // route params
  never,
  // response
  SendEmailCommandOutput | { error: string },
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

export { sendContactForm };

export interface Email {
  emailTo: string;
  emailFrom: string;
  subject: string;
  textBody: string;
  htmlBody: string;
}
export interface ContactFormData {
  name: string;
  message: string;
  clientUrl: string;
  email?: string;
  title?: string;
  phone?: string;
}

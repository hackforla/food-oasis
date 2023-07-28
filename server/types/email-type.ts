export interface Email {
  emailTo: string;
  emailFrom: string;
  subject: string;
  textBody: string;
  htmlBody: string;
}
export interface ContactFormData {
  name: string;
  email: string;
  title: string;
  message: string;
  clientUrl: string;
  phone?: string;
}

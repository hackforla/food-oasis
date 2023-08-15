import axios from "axios";

const baseUrl = "/api/emails/contact";
const clientUrl = window.location.origin;

export const sendContactForm = async (formData) => {
  const response = await axios.post(baseUrl, { ...formData, clientUrl });
  return response.data;
};

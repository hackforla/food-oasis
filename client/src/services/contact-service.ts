import axios from "axios";

const baseUrl = "/api/emails/contact";
const clientUrl = window.location.origin;

// Always throws an Error whose message is safe to show the user: the server's
// message when rate limited (429), otherwise a generic one.
export const sendContactForm = async (formData: Record<string, any>) => {
  try {
    const response = await axios.post(baseUrl, {
      ...formData,
      clientUrl,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 429) {
      throw new Error(
        err.response.data?.message ||
          "Too many requests. Please try again later."
      );
    }
    throw new Error(
      "There was an error with your submission. Please try again."
    );
  }
};

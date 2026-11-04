import axios from "axios";

const baseUrl = "/api/email-templates";

export interface EmailTemplate {
  subject: string;
  intro: string;
}

export const getByKey = async (
  key: string,
  tenantId: number
): Promise<EmailTemplate> => {
  const response = await axios.get(`${baseUrl}/${encodeURIComponent(key)}`, {
    params: { tenantId },
  });
  return response.data;
};

export const post = async (
  key: string,
  tenantId: number,
  fields: Partial<EmailTemplate>
): Promise<EmailTemplate> => {
  const response = await axios.post(`${baseUrl}/${encodeURIComponent(key)}`, {
    tenantId,
    ...fields,
  });
  return response.data;
};

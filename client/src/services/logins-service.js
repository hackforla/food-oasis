import axios from "axios";
import { TENANT_ID } from "helpers/Constants";
const baseUrl = "/api/logins";

export const getAll = async (email = undefined) => {
  const response = await axios.get(baseUrl, {
    params: { email, tenantId: TENANT_ID },
  });

  return response.data;
};

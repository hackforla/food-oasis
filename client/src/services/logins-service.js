import axios from "axios";
import { tenantId } from "helpers/Configuration";
const baseUrl = "/api/logins";

export const getAll = async (email = undefined) => {
  const response = await axios.get(baseUrl, { params: { email, tenantId } });

  return response.data;
};

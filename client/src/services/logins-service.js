import axios from "axios";
import { tenantId } from "helpers/Configuration";
const baseUrl = "/api/logins";

export const getAll = async () => {
  const response = await axios.get(baseUrl, { params: { tenantId } });

  return response.data;
};

import axios from "axios";
import { TENANT_ID } from "helpers/Constants";
const baseUrl = "/api/logins";

export const getAll = async (email?: string) => {
  const response = await axios.get(baseUrl, {
    params: { email, tenantId: TENANT_ID },
  });
  const data: Data[] = response.data;
  return data;
};

export interface Data {
  id: number;
  firstName: FirstName;
  lastName: LastName;
  email: string;
  loginTime: Date;
}

export enum FirstName {
  Admin = "Admin",
  Security = "Security",
  Test = "test",
}

export enum LastName {
  LastNameUser = "user",
  User = "User",
}

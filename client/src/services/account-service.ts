import axios from "axios";
import * as analytics from "./analytics";
import { TENANT_ID } from "helpers/Constants";

const baseUrl = "/api/accounts";
const clientUrl = window.location.origin;
const tenantId = TENANT_ID;

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  passwordHash: string;
  dateCreated: Date;
  isGlobalAdmin: boolean;
  isGlobalReporting: boolean;
  tenantId: number;
  isAdmin: boolean;
  isSecurityAdmin: boolean;
  isDataEntry: boolean;
  isCoordinator: boolean;
  features: string[];
  role: string;
}

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
  code?: string;
  token?: string;
  user?: User;
  newId?: string;
  email?: string;
}

export interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const getAll = async () => {
  const response = await axios.get(baseUrl + "?tenantId=" + tenantId);
  return response;
};

export const getByEmail = async (email: string) => {
  const response = await axios.get(
    baseUrl + "/" + email + "?tenantId=" + tenantId
  );
  return response;
};

// POSTs to one of the rate-limited account endpoints. On a 429, returns the
// server's { isSuccess: false, code: "RATE_LIMITED", message } response body
// instead of letting axios throw, so callers can handle "rate limited" the
// same way they handle any other non-success ApiResponse (checking `code`)
// rather than it falling into their generic network/server-error catch
// block with a misleading message. Any other error still throws, preserving
// each caller's existing error handling.
const postAuthRequest = async <T extends ApiResponse>(
  url: string,
  body: unknown
): Promise<T> => {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 429) {
      return err.response.data;
    }
    throw err;
  }
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams): Promise<ApiResponse> => {
  const body = { firstName, lastName, email, password, clientUrl, tenantId };
  return postAuthRequest(baseUrl + "/register", body);
};

export const resendConfirmationEmail = async (
  email: string
): Promise<ApiResponse> => {
  const body = { email, clientUrl };
  return postAuthRequest(baseUrl + "/resendConfirmationEmail", body);
};

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  const body = { email, clientUrl };
  return postAuthRequest(baseUrl + "/forgotPassword", body);
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<ApiResponse> => {
  const body = { token, password };
  return postAuthRequest(baseUrl + "/resetPassword", body);
};

export const confirmRegister = async (token: string): Promise<ApiResponse> => {
  const body = { token };
  return postAuthRequest(baseUrl + "/confirmRegister", body);
};

export const login = async (
  email: string,
  password: string
): Promise<ApiResponse | undefined> => {
  const body = { email, password, tenantId };
  try {
    return await postAuthRequest(baseUrl + "/login", body);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const logout = async (): Promise<any> => {
  analytics.identify(null);
  const response = await axios.get(baseUrl + "/logout");
  return response.data;
};

export const validateToken = async (token: string): Promise<ApiResponse> => {
  const body = { token };
  const response = await axios.post(baseUrl + "/validateToken", body);
  return response.data;
};

export const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<ApiResponse> => {
  const body = { userId, oldPassword, newPassword };
  const response = await axios.post(baseUrl + "/changePassword", body);
  return response.data;
};

// This is used to updated login table with the specified permissionName column set to value
// i.e. is_admin, is_security_admin, is_data_entry
export const setPermissions = async (
  userId: number,
  permissionName: string,
  value: string | boolean
): Promise<ApiResponse | undefined> => {
  const body = { userId, permissionName, value, tenantId };
  try {
    const response = await axios.post(baseUrl + "/setPermissions", body);
    return response.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const setGlobalPermissions = async (
  userId: number,
  permissionName: string,
  value: string | boolean
): Promise<ApiResponse | undefined> => {
  const body = { userId, permissionName, value, tenantId };
  try {
    const response = await axios.post(baseUrl + "/setGlobalPermissions", body);
    return response.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const updateProfile = async (
  userId: number,
  values: Record<string, any>
) => {
  const body = { ...values, tenantId };
  try {
    const response = await axios.put(baseUrl + `/${userId}`, body);
    return response;
  } catch (error) {
    return null;
  }
};

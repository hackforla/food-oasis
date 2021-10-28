import axios from "axios";
import * as analytics from "./analytics";
import { tenantId } from "../helpers/Configuration";

const baseUrl = "/api/accounts";
const clientUrl = window.location.origin;

export const getAll = async () => {
  const response = await axios.get(
    baseUrl + "?tenantId=" + tenantId.toString()
  );
  return response;
};

export const register = async (firstName, lastName, email, password) => {
  const body = { firstName, lastName, email, password, clientUrl, tenantId };
  const response = await axios.post(baseUrl + "/register", body);
  return response.data;
};

export const resendConfirmationEmail = async (email) => {
  const body = { email, clientUrl };
  const response = await axios.post(baseUrl + "/resendConfirmationEmail", body);
  return response.data;
};

export const forgotPassword = async (email) => {
  const body = { email, clientUrl };
  const response = await axios.post(baseUrl + "/forgotPassword", body);
  return response.data;
};

export const resetPassword = async (token, password) => {
  const body = { token, password };
  const response = await axios.post(baseUrl + "/resetPassword", body);
  return response.data;
};

export const confirmRegister = async (token) => {
  const body = { token };
  const response = await axios.post(baseUrl + "/confirmRegister", body);
  return response.data;
};

export const login = async (email, password) => {
  const body = { email, password, tenantId };
  try {
    const response = await axios.post(baseUrl + "/login", body);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  analytics.identify(null);
  const response = await axios.get(baseUrl + "/logout");
  return response.data;
};

// This is used to updated login table with the specified permissionName column set to value
// i.e. is_admin, is_security_admin, is_data_entry
export const setPermissions = async (userId, permissionName, value) => {
  const body = { userId, permissionName, value, tenantId };
  try {
    const response = await axios.post(baseUrl + "/setPermissions", body);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const setGlobalPermissions = async (userId, permissionName, value) => {
  const body = { userId, permissionName, value, tenantId };
  try {
    const response = await axios.post(baseUrl + "/setGlobalPermissions", body);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

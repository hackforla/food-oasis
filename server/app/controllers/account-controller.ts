import accountService from "../services/account-service";
import loginsService from "../services/logins-service";
import { RequestHandler, Response } from "express";
import {
  Account,
  RegisterFields,
  AccountResponse,
  User,
  Role,
} from "../../types/account-types";
import { ClientResponse } from "@sendgrid/mail";

const getAll: RequestHandler<
  // route params
  never,
  // response
  Account[],
  // req body
  never,
  // query params
  { tenantId: string }
> = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const response = await accountService.selectAll(tenantId);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const getById: RequestHandler<
  { id: string },
  Account,
  never,
  { tenantId: string }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.query;
    const response = await accountService.selectById(id, tenantId);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getByEmail: RequestHandler<
  { email: string },
  { isSuccess: boolean },
  never,
  { tenantId: string }
> = async (req, res) => {
  try {
    const { email } = req.params;
    const { tenantId } = req.query;
    await accountService.selectByEmail(email, tenantId);
    res.send({ isSuccess: true });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const register: RequestHandler<
  never,
  AccountResponse,
  RegisterFields,
  never
> = async (req, res) => {
  try {
    const response = await accountService.register(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const resendConfirmationEmail: RequestHandler<
  never,
  AccountResponse,
  { email: string; clientUrl: string },
  never
> = async (req, res) => {
  try {
    const { email, clientUrl } = req.body;
    const response = await accountService.resendConfirmationEmail(
      email,
      clientUrl
    );
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const forgotPassword: RequestHandler<
  never,
  AccountResponse | { error: string } | [ClientResponse, Record<string, never>],
  {
    email: string;
    clientUrl: string;
  },
  never
> = async (req, res) => {
  try {
    const response = await accountService.forgotPassword(req.body);
    res.send(response);
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};

const resetPassword: RequestHandler<
  never,
  AccountResponse,
  {
    token: string;
    password: string;
  },
  never
> = async (req, res) => {
  try {
    const response = await accountService.resetPassword(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const setTenantPermissions: RequestHandler<
  never,
  AccountResponse,
  {
    userId: string;
    permissionName: Role;
    value: string;
    tenantId: string;
  },
  never
> = async (req, res) => {
  const { userId, permissionName, value, tenantId } = req.body;
  try {
    const response = await accountService.setTenantPermissions(
      userId,
      permissionName,
      value,
      tenantId
    );
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const setGlobalPermissions: RequestHandler<
  never,
  AccountResponse,
  {
    userId: string;
    permissionName: Role;
    value: string;
    tenantId: string;
  },
  never
> = async (req, res) => {
  const { userId, permissionName, value, tenantId } = req.body;
  try {
    const response = await accountService.setGlobalPermissions(
      userId,
      permissionName,
      value,
      tenantId
    );
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const confirmRegister: RequestHandler<
  never,
  AccountResponse | { error: string },
  {
    id: string;
    token: string;
  },
  never
> = async (req, res) => {
  try {
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const login: RequestHandler<
  never,
  AccountResponse,
  {
    email: string;
    password: string;
    tenantId: string;
  },
  never
> = async (req: any, res, next) => {
  const { email, password, tenantId } = req.body;
  try {
    const resp = await accountService.authenticate(email, password, tenantId);
    if (resp.isSuccess) {
      req.user = resp.user;
      loginsService.insert(req.user.id, tenantId);
      next();
    } else {
      res.json(resp);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const put: RequestHandler<never, Response, User, never> = async (req, res) => {
  try {
    await accountService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler<{ id: string }, Response, never, never> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await accountService.remove(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateUserProfile: RequestHandler<
  { userid: string },
  any,
  {
    firstName: string,
    lastName: string,
    email: string,
    tenantId: string
  },
  never
> = async (req, res) => {
  const userid = req.params.userid;
  const { firstName, lastName, email, tenantId } = req.body;
  const response = await accountService.updateUserProfile(userid, firstName, lastName, email, tenantId);
  if (response.isSuccess) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response);
  }
}

export default {
  confirmRegister,
  forgotPassword,
  getAll,
  getByEmail,
  getById,
  login,
  put,
  register,
  remove,
  resendConfirmationEmail,
  resetPassword,
  setGlobalPermissions,
  setTenantPermissions,
  updateUserProfile
};

const accountService = require("../services/account-service");
const loginsService = require("../services/logins-service");

const getAll = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const response = await accountService.selectAll(Number(tenantId));
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.selectById(id);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getByEmail = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const { email } = req.params;
    await accountService.selectByEmail(email, Number(tenantId));
    res.send(true);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  try {
    const response = await accountService.register(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const resendConfirmationEmail = async (req, res) => {
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

const forgotPassword = async (req, res) => {
  try {
    const response = await accountService.forgotPassword(req.body);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await accountService.resetPassword(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const setTenantPermissions = async (req, res) => {
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

const setGlobalPermissions = async (req, res) => {
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

const confirmRegister = async (req, res) => {
  try {
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const login = async (req, res, next) => {
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

const put = async (req, res) => {
  try {
    await accountService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await accountService.remove(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  register,
  confirmRegister,
  resendConfirmationEmail,
  setTenantPermissions,
  setGlobalPermissions,
  forgotPassword,
  resetPassword,
  login,
  put,
  remove,
};

const accountService = require("../services/account-service");

const getAll = async (req, res) => {
  try {
    const response = await accountService.selectAll();
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.selectById(id);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const getByEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.selectByEmail(id);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const register = async (req, res) => {
  try {
    const response = await accountService.register(req.body);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
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
    res.status("500").json({ error: err.toString() });
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
    res.status("500").json({ error: err.toString() });
  }
};

const setPermissions = async (req, res) => {
  const { userId, permissionName, value } = req.body;
  try {
    const response = await accountService.setPermissions(
      userId,
      permissionName,
      value
    );
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const confirmRegister = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.body.id) {
      res
        .status("400")
        .json({ error: "id in url does not match id in request body." });
    }
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const resp = await accountService.authenticate(email, password);
    if (resp.isSuccess) {
      req.user = resp.user;
      next();
    } else {
      res.json(resp);
    }
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const put = async (req, res) => {
  try {
    await accountService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await accountService.remove(id);
    res.sendStatus(200);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  register,
  confirmRegister,
  resendConfirmationEmail,
  setPermissions,
  forgotPassword,
  resetPassword,
  login,
  put,
  remove,
};

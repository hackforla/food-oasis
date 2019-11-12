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
    const response = await accountService.resendConfirmationEmail(req.body);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const confirmRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await accountService.confirmRegistration(req.body.token);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const login = async (req, res) => {
  accountService
    .authenticate(req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
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
    const response = await accountService.remove(id);
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
  login,
  put,
  remove
};

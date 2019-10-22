const accountService = require("../services/account-service");

const getAll = (req, res) => {
  accountService
    .selectAll()
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  const { id } = req.params;
  accountService
    .selectById(id)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const getByEmail = (req, res) => {
  const { id } = req.params;
  accountService
    .selectByEmail(id)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const register = (req, res) => {
  accountService
    .register(req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const login = (req, res) => {
  accountService
    .authenticate(req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  accountService
    .update(req.body)
    .then(resp => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  const { id } = req.params;
  accountService
    .remove(id)
    .then(resp => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  register,
  login,
  put,
  remove
};

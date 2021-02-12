const tenantService = require("../services/tenant-service");

const getAll = (req, res) => {
  tenantService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  const id = Number(req.params.id);
  tenantService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  // Need model with correctly-typed properties
  const model = {
    ...req.body,
    id: Number(req.body.id),
  };
  tenantService
    .insert(model)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  // Need model with correctly-typed properties
  const model = {
    ...req.body,
    id: Number(req.body.id),
  };
  tenantService
    .update(model)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  tenantService
    .remove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  remove,
};

const organizationService = require("../services/organization-service");

const getAll = (req, res) => {
  organizationService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  const { id } = req.params;
  organizationService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const createOrganization = (req, res) => {
  organizationService
    .create(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const updateOrganization = (req, res) => {
  organizationService
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const deleteOrganization = (req, res) => {
  const { id } = req.params;
  organizationService
    .remove(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};

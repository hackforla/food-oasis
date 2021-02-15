const parentOrganizationService = require("../services/parent-organization-service");

const getAll = (req, res) => {
  parentOrganizationService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  parentOrganizationService
    .insert(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  parentOrganizationService
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  const { id } = req.params;
  parentOrganizationService
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
  post,
  put,
  remove,
};

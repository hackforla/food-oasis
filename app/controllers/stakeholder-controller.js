const stakeholderService = require("../services/stakeholder-service");

const getAll = (req, res) => {
  let categoryIds = req.query.categoryIds;
  if (!categoryIds) {
    categoryIds = ["1", "2", "3", "4", "5", "6"];
  } else if (typeof categoryIds == "string") {
    categoryIds = [categoryIds];
  }
  stakeholderService
    .selectAll(
      req.query.name || "",
      categoryIds,
      req.query.latitude,
      req.query.longitude,
      req.query.distance
    )
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  const { id } = req.params;
  stakeholderService
    .selectById(id)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  stakeholderService
    .insert(req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  stakeholderService
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
  stakeholderService
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
  post,
  put,
  remove
};

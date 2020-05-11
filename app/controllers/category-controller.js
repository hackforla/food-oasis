const categoryService = require("../services/category-service");

const getAll = (req, res) => {
  categoryService
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
  categoryService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  categoryService
    .insert(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  categoryService
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
  categoryService
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
  post,
  put,
  remove,
};

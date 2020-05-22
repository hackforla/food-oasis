const stakeholderService = require("../services/stakeholder-service");

const search = (req, res) => {
  let categoryIds = req.query.categoryIds;
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11"];
  } else if (typeof categoryIds == "string") {
    categoryIds = [categoryIds];
  }
  const params = { ...req.query, categoryIds };
  stakeholderService
    .search(params)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const searchDashboard = (req, res) => {
  let categoryIds = req.query.categoryIds;
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11"];
  } else if (typeof categoryIds == "string") {
    categoryIds = [categoryIds];
  }
  const params = { ...req.query, categoryIds };
  stakeholderService
    .searchDashboard(params)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  const { id } = req.params;
  stakeholderService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  stakeholderService
    .insert(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  stakeholderService
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
  stakeholderService
    .remove(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const assign = (req, res) => {
  stakeholderService
    .assign(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const needsVerification = (req, res) => {
  stakeholderService
    .needsVerification(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const claim = (req, res) => {
  stakeholderService
    .claim(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  search,
  searchDashboard,
  getById,
  post,
  put,
  remove,
  needsVerification,
  assign,
  claim,
};

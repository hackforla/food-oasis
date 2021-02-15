const stakeholderService = require("../services/stakeholder-best-service");

const search = (req, res) => {
  let categoryIds = req.query.categoryIds;
  if (!req.query.latitude || !req.query.longitude) {
    res
      .status(404)
      .json("Bad request: needs latitude and longitude parameters");
  }
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11", "12"];
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
      console.log(err);
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

module.exports = {
  search,
  getById,
};

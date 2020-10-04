const suggestionService = require("../services/suggestion-service");

const getAll = (req, res) => {
  suggestionService
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
  suggestionService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const getAllByAssignedUser = (req, res) => {
  const { userId } = req.params;
  suggestionService
    .selectByAssignedUser(userId)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  suggestionService
    .insert(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  const { id } = req.params;
  suggestionService
    .remove(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

// const put = (req, res) => {
//   categoryService
//     .update(req.body)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       res.status("500").json({ error: err.toString() });
//     });
// };

module.exports = {
  getAll,
  getById,
  getAllByAssignedUser,
  post,
  remove,
  // put,
};

const suggestionService = require("../services/suggestion-service");

const getAll = async (req, res) => {
  try {
    const resp = await suggestionService.selectAll();
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const resp = await suggestionService.selectById(id);
    res.send(resp);
  } catch (err) {
    if (err.code === 0) {
      res.sendStatus(404);
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const post = async (req, res) => {
  try {
    const resp = await suggestionService.insert(req.body);
    res.status(201).json(resp);
  } catch (err) {
    if (err.message.includes("duplicate")) {
      res.status(400).json({ error: "Cannot insert duplicate row." });
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const put = async (req, res) => {
  try {
    await suggestionService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
};

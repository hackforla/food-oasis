const categoryService = require("../services/category-service");

const getAll = async (req, res) => {
  try {
    const resp = await categoryService.selectAll();
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const resp = await categoryService.selectById(id);
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
    const resp = await categoryService.insert(req.body);
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
    await categoryService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const remove = async (req, res) => {
  try {
    // params are always strings, need to
    // convert to correct Javascript type, so
    // pg=promise can format SQL correctly.
    const id = Number(req.params.id);
    const rowCount = await categoryService.remove(id);
    if (rowCount !== 1) {
      res.status(400).json({ error: "Record not found" });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  remove,
};

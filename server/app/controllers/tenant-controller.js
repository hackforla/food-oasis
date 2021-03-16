const tenantService = require("../services/tenant-service");

const getAll = async (req, res) => {
  try {
    const resp = await tenantService.selectAll();
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const resp = await tenantService.selectById(id);
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
    await tenantService.insert(req.body);
    res.sendStatus(201);
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
    if (Number(req.params.id) !== req.body.id) {
      res.status(400).json({
        error: "Request parameter 'id' does not match body of request.",
      });
      return;
    }
    const rowCount = await tenantService.update(req.body);
    if (rowCount !== 1) {
      res.status(400).json({ error: "Record not found" });
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  try {
    // params are always strings, need to
    // convert to correct Javascript type, so
    // pg=promise can format SQL correctly.
    const id = Number(req.params.id);
    const rowCount = await tenantService.remove(id);
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

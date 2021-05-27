const parentOrganizationService = require("../services/parent-organization-service");

const getAllByTenantId = async (req, res) => {
  try {
    const resp = await parentOrganizationService.selectAllById(req.params.id);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const post = async (req, res) => {
  try {
    const resp = await parentOrganizationService.insert(req.body);
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
    await parentOrganizationService.update(req.body);
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
    const rowCount = await parentOrganizationService.remove(id);
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
  getAllByTenantId,
  post,
  put,
  remove,
};

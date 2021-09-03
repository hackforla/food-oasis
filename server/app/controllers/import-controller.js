const scraperLaplFoodResourcesService = require("../import/lapl-food-resources-scrape");
const svc = require("../services/load-lapl-food-resources-service");
const importService = require("../services/import-service");

// LA Public Library Food Resources Listing - Scraped
const getLaplFoodResources = async (req, res) => {
  try {
    const response = await scraperLaplFoodResourcesService.selectAll();
    await svc.removeAll();
    response.forEach(async (row) => {
      await svc.insert(row);
    });
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

const uploadStakeholderCsv = async (req, res) => {
  const { file } = req;
  if (!file) return;
  try {
    const response = await importService.parseCsv(file);
    res.send(response);
  } catch (err) {
    console.error(err.message);
  }
};

const importStakeholderCsv = async (req, res) => {
  const { data, action, tenantId } = req.body;
  try {
    const response = await importService.importCsv(data, action, tenantId);
    res.send(response);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getLaplFoodResources,
  uploadStakeholderCsv,
  importStakeholderCsv,
};

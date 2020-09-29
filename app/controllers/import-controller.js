const scraperLaplFoodResourcesService = require("../import/lapl-food-resources-scrape");
const svc = require("../services/load-lapl-food-resources-service");
const importService = require("../import/import-csv");
const stakeholderService = require("../services/stakeholder-service");

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

const loadStakeholderCsv = async (req, res) => {
  const { file } = req;
  try {
    const response = await importService.importCsv(file.filename);
    await stakeholderService.insertBulkStakeholders(response);
    res.send(response);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getLaplFoodResources,
  loadStakeholderCsv,
};

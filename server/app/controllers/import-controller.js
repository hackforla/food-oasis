const scraperLaplFoodResourcesService = require("../import/lapl-food-resources-scrape");
const svc = require("../services/load-lapl-food-resources-service");
const importService = require("../services/import-service");

// Scrape listings from LA Public Library Food Resources Listing
// and upload to the load_lapl_food_resources table.
const getLaplFoodResources = async (req, res) => {
  try {
    // Scrape the LA Public Library web site for listings.
    const response = await scraperLaplFoodResourcesService.selectAll();
    // delete all entries in the database table () for LA Public Library listings.
    await svc.removeAll();
    // upload scraped records to the database table
    response.forEach(async (row) => {
      await svc.insert(row);
    });
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

// Upload and parse a CSV file to create a JSON object
// The client calls this first to preview the records
// before confirming that the info is correct, before calling
// the importStakeholderCsv function below to insert or
// overwrite stakeholder records.
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

// insert or overwrite stakeholder records using
// the supplied JSON array of records from the above function.
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

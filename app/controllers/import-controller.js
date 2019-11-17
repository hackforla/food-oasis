const scraperLaplFoodResourcesService = require("../import/lapl-food-resources-scrape");
const svc = require("../services/load-lapl-food-resources-service");

// LA Public Library Food Resources Listing - Scraped
const getLaplFoodResources = async (req, res) => {
  try {
    const response = await scraperLaplFoodResourcesService.selectAll();
    await svc.removeAll();
    response.forEach(async row => {
      await svc.insert(row);
    });
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

module.exports = {
  getLaplFoodResources
};

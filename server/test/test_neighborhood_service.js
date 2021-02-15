const neighborhoodService = require("../app/services/neighborhood-service");

var assert = require("assert");

it("We should have 99 neighborhoods", async () => {
  const result = await neighborhoodService.selectAll();
  assert.equal(result.length, 99);
});

it("Correctly finding coords in Lincoln Heights", async () => {
  const result = await neighborhoodService.findNeighborhood(
    -118.2095018,
    34.0711511
  );
  assert.equal(result.name, "LINCOLN HEIGHTS NC");
});

it("Correctly not finding coords in Chicago", async () => {
  const result = await neighborhoodService.findNeighborhood(
    -87.6323658,
    41.8840586
  );
  assert.equal(result, null);
});

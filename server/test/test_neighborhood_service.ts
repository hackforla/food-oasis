import {
  selectAll,
  findNeighborhood,
} from "../app/services/neighborhood-service";

import { equal } from "assert";

it("We should have 99 neighborhoods", async () => {
  const result = await selectAll();
  equal(result.length, 99);
});

it("Correctly finding coords in Lincoln Heights", async () => {
  const result = await findNeighborhood(-118.2095018, 34.0711511);
  equal(result.name, "LINCOLN HEIGHTS NC");
});

it("Correctly not finding coords in Chicago", async () => {
  const result = await findNeighborhood(-87.6323658, 41.8840586);
  equal(result, null);
});

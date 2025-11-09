import fs from "fs";
import path from "path";
import test from "../helpers/test";
import mockRequests from "../helpers/mocks";

const authFile = path.resolve(
  process.cwd(),
  "tests/playwright/.auth-state/testuser.json"
);

test("authenticate mock user and save storage state", async ({
  page,
  helpers,
}) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await mockRequests(page);
  await helpers.mockLogin();

  await page.context().storageState({ path: authFile });
  console.log("[auth.setup] Saved storageState to:", authFile);

  if (!fs.existsSync(authFile)) {
    throw new Error(`storageState file not found at ${authFile}`);
  }
});

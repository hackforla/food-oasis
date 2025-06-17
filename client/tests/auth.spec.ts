import test from "./helpers/test";

test.describe("Auth", () => {
  test("Should be able to login successfully", async ({ helpers }) => {
    await helpers.login();
  });
});

import { expect } from "@playwright/test";
import test from "./helpers/test";

test.describe("OrganizationEdit", () => {
  test("Should show a new organization form after login", async ({
    page,
    helpers,
  }) => {
    await helpers.login();
    await page.getByTestId("MenuIcon").click();

    await page.getByText("Add New Organization").click();

    await expect(page.url()).toBe(
      "http://localhost:3000/admin/organizationedit"
    );
    await expect(
      page.getByRole("heading", { name: "Organization -" })
    ).toBeVisible();

    await page.locator('[placeholder="Latitude *"]').fill("33.699");
    await page.locator('[placeholder="Longitude *"]').fill("-118");
  });
});

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

test("Should show validation errors for out-of-range coordinates", async ({
  page,
  helpers,
}) => {
  await helpers.login();
  await page.locator(".MuiBackdrop-root").click({ force: true });
  await page.getByTestId("MenuIcon").click();
  await page.getByText("Add New Organization").click();

  await expect(page.url()).toBe("http://localhost:3000/admin/organizationedit");
  await expect(
    page.getByRole("heading", { name: "Organization -" })
  ).toBeVisible();

  await page.locator('[placeholder="Latitude *"]').fill("35.0000");
  await page.keyboard.press("Tab");
  await page.locator('[placeholder="Longitude *"]').fill("-120.0000");
  await page.keyboard.press("Tab");
});

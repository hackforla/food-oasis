import { expect } from "@playwright/test";
import test from "./helpers/test";
import mockRequests from "./helpers/mocks";

test.describe("App", () => {
  test("renders without crashing", async ({ page }) => {
    await mockRequests(page);
    await page.goto("/");
    await expect(
      page.getByText("Locate free food in Los Angeles")
    ).toBeVisible();
    await expect(
      page.getByText(
        "Due to the LA Fires, some information may be out-of-date."
      )
    ).toBeVisible();
    await expect(page.getByText("Learn about this site")).toBeVisible();
    await expect(page.getByText("Learn about this site")).toHaveAttribute(
      "href",
      "/about"
    );
    page.getByLabel("Search by address or zip code").fill("90001");
    await page
      .getByText("Los Angeles, California 90001, United States")
      .click();
    await expect(page.url()).toBe("http://localhost:3000/organizations");
    await expect(page.getByText("3 Locations").first()).toBeVisible();
  });
});

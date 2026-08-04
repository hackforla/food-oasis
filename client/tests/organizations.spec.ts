import { expect } from "@playwright/test";
import test from "./helpers/test";
import mockRequests from "./helpers/mocks";

test.describe("Organizations", () => {
  test("should render detail page on preview click", async ({ page }) => {
    await mockRequests(page);
    await page.goto("/");
    await page.getByTestId("search-button").click();

    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await page.getByText("Families Forward").scrollIntoViewIfNeeded;

    await page.getByText("Stakeholder 1").click();
    await expect(page.getByText("Phone")).toBeVisible();
    await expect(page.getByText("111 Address")).toBeVisible();
    await expect(page.url()).toBe(
      "http://localhost:3000/organizations?latitude=33.79178035&longitude=-118.3186286&org=stakeholder_1&id=1"
    );
  });

  test("should render all 3 stakeholders", async ({ page }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await expect(page.getByText("3 Locations").first()).toBeVisible();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeVisible();
  });

  test("stakeholder 1 detail page should show Open Now, Walk-Ins Allowed & social media accounts", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto(
      "/organizations?latitude=33.79178035&longitude=-118.3186286&org=stakeholder_1&id=1"
    );

    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(
      page.locator("span.MuiChip-label", { hasText: "Open Now" })
    ).toBeVisible();
    await expect(
      page.locator("span.MuiChip-label", { hasText: "Walk-Ins Allowed" })
    ).toBeVisible();

    await page.getByText("Social Media").scrollIntoViewIfNeeded();
    await expect(page.getByText("Social Media")).toBeVisible();
    await expect(page.getByTestId("facebook-button")).toBeVisible();
    await expect(page.getByTestId("linkedin-button")).toBeVisible();
    await expect(page.getByTestId("pinterest-button")).toBeVisible();
    await expect(page.getByTestId("twitter-button")).toBeVisible();
  });

  test("clicking the Open Now filter should show Stakeholder 1 and not show Stakeholder 2 and 3", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "Open Now" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeHidden();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });

  test("clicking the Pantry filter should show Stakeholder 1 and 2 and not show Stakeholder 3", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "Pantry" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeHidden();
    await expect(page.getByText("Stakeholder 3")).toBeVisible();
  });

  test("clicking the Meal filter should show Stakeholder 1 and 2 and not show Stakeholder 3", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "Meal" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });
  test("clicking Dry Goods filter should show Stakeholders 2 and 3 and not show Stakeholder 1", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "More Filters" }).click();
    await page.getByRole("button", { name: "Dry Goods" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeHidden();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeVisible();
  });

  test("clicking Dry Goods and Dairy filter should show Stakeholders 2 and not show Stakeholder 1 and 3", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "More Filters" }).click();
    await page.getByRole("button", { name: "Dry Goods" }).click();
    await page.getByRole("button", { name: "Dairy" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeHidden();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });

  test("searching by address should show only the matching stakeholder", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "More Filters" }).click();
    await page
      .getByPlaceholder("i.e. kosher, senior, First Baptist, 90015")
      .fill("222 Address");
    await expect(page.getByText("Stakeholder 1")).toBeHidden();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });

  test("searching by a multi-word term found in a non-name field (requirements) should show only the matching stakeholder", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "More Filters" }).click();
    // "kosher" and "seniors" only both appear in Stakeholder 2's requirements
    // text -- this exercises the "AND" multi-word, non-name-field search.
    await page
      .getByPlaceholder("i.e. kosher, senior, First Baptist, 90015")
      .fill("kosher seniors");
    await expect(page.getByText("Stakeholder 1")).toBeHidden();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });

  test("searching by words matched across two different fields (name + address) on the same stakeholder should AND across fields", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "More Filters" }).click();
    // "stakeholder" matches the `name` field of all three mock stakeholders,
    // but "222" only appears in Stakeholder 2's `address1` field. Only a
    // stakeholder satisfying both words -- one via name, one via a different
    // field -- should remain, proving the fields are searched as one
    // combined AND-across-fields blob rather than independently.
    await page
      .getByPlaceholder("i.e. kosher, senior, First Baptist, 90015")
      .fill("stakeholder 222");
    await expect(page.getByText("Stakeholder 1")).toBeHidden();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });

  test("filter panel close button has an accessible name and closes the panel", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/organizations");
    await page.getByRole("button", { name: "More Filters" }).click();

    const closeFilters = page.getByRole("button", { name: "Close filters" });
    await expect(closeFilters).toBeVisible();

    await closeFilters.click();
    await expect(closeFilters).toBeHidden();
  });
});

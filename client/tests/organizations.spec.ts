import { test, expect } from "@playwright/test";

test.describe("Organizations", () => {
  test("should render detail page on preview click", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("SearchIcon").click();

    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await page.getByText("Families Forward").scrollIntoViewIfNeeded;

    await page.getByText("Stakeholder 1").click();
    await expect(page.getByText("Phone")).toBeVisible();
    await expect(page.getByText("111 Address")).toBeVisible();
    await expect(page.url()).toBe(
      "http://localhost:3000/organizations?latitude=33.79178035&longitude=-118.3186286&org=stakeholder_1&id=1"
    );

    await expect(page.getByTestId("SubdirectoryArrowRightIcon")).toBeVisible();
  });

  test("should render all 3 stakeholders", async ({ page }) => {
    await page.goto("/organizations");
    await expect(page.getByText("3 Locations")).toBeVisible();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeVisible();
  });

  test("stakeholder 1 detail page should show Open Now, Walk-Ins Allowed & social media accounts", async ({
    page,
  }) => {
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
    await expect(page.getByTestId("FacebookIcon")).toBeVisible();
    await expect(page.getByTestId("LinkedInIcon")).toBeVisible();
    await expect(page.getByTestId("PinterestIcon")).toBeVisible();
    await expect(page.getByTestId("XIcon")).toBeVisible();
  });

  test("clicking the Open Now filter should show Stakeholder 1 and not show Stakeholder 2 and 3", async ({
    page,
  }) => {
    await page.goto("/organizations");
    await page.getByRole("button", { name: "Open Now" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeHidden();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });

  test("clicking the Pantry filter should show Stakeholder 1 and 2 and not show Stakeholder 3", async ({
    page,
  }) => {
    await page.goto("/organizations");
    await page.getByRole("button", { name: "Pantry" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeVisible();
    await expect(page.getByText("Stakeholder 3")).toBeHidden();
  });
  test("clicking the Meal filter should show Stakeholder 1 and 2 and not show Stakeholder 3", async ({
    page,
  }) => {
    await page.goto("/organizations");
    await page.getByRole("button", { name: "Meal" }).click();
    await expect(page.getByText("Stakeholder 1")).toBeVisible();
    await expect(page.getByText("Stakeholder 2")).toBeHidden();
    await expect(page.getByText("Stakeholder 3")).toBeVisible();
  });
});

import { expect } from "@playwright/test";
import test from "./helpers/test";

test.beforeEach(async ({ page, helpers }) => {
  await helpers.mockLogin();
});
test.describe("OrganizationEdit", () => {
  test("Should allow entering valid stakholder data", async ({ page }) => {
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Add New Organization" }).click();
    await page.getByRole("textbox", { name: "Latitude *" }).click();
    await page.getByRole("textbox", { name: "Latitude *" }).click();
    await page.getByRole("textbox", { name: "Latitude *" }).fill("34");
    await page.getByRole("textbox", { name: "Longitude *" }).click();
    await page.getByRole("textbox", { name: "Longitude *" }).fill("-118");

    await page.getByRole("tab", { name: "Business Hours" }).click();
    await page.getByRole("button", { name: "Add Hours" }).click();
    await page.getByRole("combobox", { name: "Repeat..." }).click();
    await page.getByRole("option", { name: "Every" }).click();
    await page.getByRole("combobox", { name: "Select day..." }).click();
    await page.getByRole("option", { name: "Sun" }).click();
    await page.getByRole("textbox", { name: "Enter opening time..." }).click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .fill("09:30 AM");
    await page.getByRole("textbox", { name: "Enter closing time..." }).click();
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .fill("01:15 PM");
    await page.getByRole("button", { name: "Add Hours" }).click();
    await page.getByText("Repeat...").click();
    await page.getByRole("option", { name: "Every" }).click();
    await page.getByText("Select day...").click();
    await page.getByRole("option", { name: "Mon" }).click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .nth(1)
      .click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .nth(1)
      .fill("12:00 PM");
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .nth(1)
      .click();
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .nth(1)
      .fill("12:30 PM");
  });

  test("Should show validation errors for out-of-range coordinates", async ({
    page,
  }) => {
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Add New Organization" }).click();

    await page.getByRole("textbox", { name: "Latitude *" }).fill("11");
    await page.keyboard.press("Tab");
    await expect(
      page.getByText("Latitude must be between 33.6988 and 34.8233", {
        exact: false,
      })
    ).toBeVisible();

    await page.getByRole("textbox", { name: "Latitude *" }).fill("110");
    await page.keyboard.press("Tab");
    await expect(
      page.getByText("Latitude must be between 33.6988 and 34.8233", {
        exact: false,
      })
    ).toBeVisible();

    await page
      .getByRole("textbox", { name: "Longitude *" })
      .fill("-12.2720047");
    await page.keyboard.press("Tab");
    await expect(
      page.getByText("Longitude must be between -118.9517 and -117.6462", {
        exact: false,
      })
    ).toBeVisible();

    await page
      .getByRole("textbox", { name: "Longitude *" })
      .fill("-120.2720047");
    await page.keyboard.press("Tab");
    await expect(
      page.getByText("Longitude must be between -118.9517 and -117.6462", {
        exact: false,
      })
    ).toBeVisible();
  });

  test("Should show required field errors when latitude and longitude are empty", async ({
    page,
  }) => {
    await page.locator(".MuiBackdrop-root").click({ force: true });
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Add New Organization" }).click();

    const latInput = page.getByRole("textbox", { name: "Latitude *" });
    await latInput.click();
    await page.keyboard.press("Tab");

    const lngInput = page.getByRole("textbox", { name: "Longitude *" });
    await lngInput.click();
    await page.keyboard.press("Tab");

    await expect(
      page.getByText("Latitude is required", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("Longitude is required", { exact: false })
    ).toBeVisible();
  });
  test("Should show error when closing time is before opening time", async ({
    page,
  }) => {
    await page.locator(".MuiBackdrop-root").click({ force: true });
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Add New Organization" }).click();
    await page.getByRole("tab", { name: "Business Hours" }).click();
    await page.getByRole("button", { name: "Add Hours" }).click();
    await page.getByRole("combobox", { name: "Repeat..." }).click();
    await page.getByRole("option", { name: "Every" }).click();
    await page.getByRole("combobox", { name: "Select day..." }).click();
    await page.getByRole("option", { name: "Sun" }).click();
    await page.getByRole("textbox", { name: "Enter opening time..." }).click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .fill("09:30 AM");
    await page.getByRole("textbox", { name: "Enter closing time..." }).click();
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .fill("08:15 AM");
    await expect(
      page.getByText("Closing time must be after opening time", {
        exact: false,
      })
    ).toBeVisible();
  });
  test("Should show error when duplicate business hours added", async ({
    page,
  }) => {
    await page.locator(".MuiBackdrop-root").click({ force: true });
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Add New Organization" }).click();
    await page.getByRole("tab", { name: "Business Hours" }).click();

    //1st row
    await page.getByRole("button", { name: "Add Hours" }).click();
    await page.getByRole("combobox", { name: "Repeat..." }).click();
    await page.getByRole("option", { name: "Every" }).click();
    await page.getByRole("combobox", { name: "Select day..." }).click();
    await page.getByRole("option", { name: "Sun" }).click();
    await page.getByRole("textbox", { name: "Enter opening time..." }).click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .fill("09:30 AM");
    await page.getByRole("textbox", { name: "Enter closing time..." }).click();
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .fill("01:15 PM");

    //2nd row
    await page.getByRole("button", { name: "Add Hours" }).click();
    await page.getByText("Repeat...").click();
    await page.getByRole("option", { name: "Every" }).click();
    await page.getByText("Select day...").click();
    await page.getByRole("option", { name: "Sun" }).click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .nth(1)
      .click();
    await page
      .getByRole("textbox", { name: "Enter opening time..." })
      .nth(1)
      .fill("09:30 AM");
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .nth(1)
      .click();
    await page
      .getByRole("textbox", { name: "Enter closing time..." })
      .nth(1)
      .fill("01:15 PM");

    await expect(
      page.getByText("Duplicate business hours are not allowed", {
        exact: false,
      })
    ).toBeVisible();
  });
});

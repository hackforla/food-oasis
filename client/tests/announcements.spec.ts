import mockRequests from "./helpers/mocks";
import test from "./helpers/test";
import { expect } from "@playwright/test";

test.describe("Announcements", () => {
  test("Should display announcements page with table", async ({
    page,
    helpers,
  }) => {
    await mockRequests(page, {
      announcements: [
        {
          id: 1,
          title: "Welcome to Food Oasis!",
          description: "This is a test announcement.",
          created_at: "2025-07-19T10:30:00.000Z",
          severity: "info",
          is_enabled: true,
        },
        {
          id: 2,
          title: "System Update",
          description: "We have updated our system.",
          created_at: "2025-07-18T15:45:00.000Z",
          severity: "warning",
          is_enabled: true,
        },
      ],
    });

    await helpers.mockLogin();
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Announcements" }).click();

    await expect(
      page.getByRole("heading", { name: "Announcements" })
    ).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByText("Welcome to Food Oasis!")).toBeVisible();
    await expect(page.getByText("System Update")).toBeVisible();
  });

  test("Should sort by severity", async ({ page, helpers }) => {
    await mockRequests(page, {
      announcements: [
        {
          id: 1,
          title: "Info announcement",
          description: "This is an info announcement.",
          created_at: "2025-07-19T10:30:00.000Z",
          severity: "info",
          is_enabled: true,
        },
        {
          id: 2,
          title: "Warning announcement",
          description: "This is a warning announcement.",
          created_at: "2025-07-18T15:45:00.000Z",
          severity: "warning",
          is_enabled: true,
        },
      ],
    });

    await helpers.mockLogin();
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Announcements" }).click();

    await page.getByTestId("sort-by-select").click();
    await page.getByRole("option", { name: "Severity" }).click();

    await expect(page.getByTestId("sort-by-select")).toContainText("Severity");
  });

  test("Should display severity values", async ({ page, helpers }) => {
    await mockRequests(page, {
      announcements: [
        {
          id: 1,
          title: "Info announcement",
          description: "This is an info announcement.",
          created_at: "2025-07-19T10:30:00.000Z",
          severity: "info",
          is_enabled: true,
        },
        {
          id: 2,
          title: "Warning announcement",
          description: "This is a warning announcement.",
          created_at: "2025-07-18T15:45:00.000Z",
          severity: "warning",
          is_enabled: true,
        },
      ],
    });

    await helpers.mockLogin();
    await page.getByTestId("menu-button").click();
    await page.getByRole("link", { name: "Announcements" }).click();

    await expect(page.getByText("info")).toBeVisible();
    await expect(page.getByText("warning")).toBeVisible();
  });
});

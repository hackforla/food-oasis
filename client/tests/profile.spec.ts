import mockRequests from "./helpers/mocks";
import test from "./helpers/test";
import { expect } from "@playwright/test";

test.describe("Profile", () => {
  test("Should display user profile and allow editing first name", async ({
    page,
    helpers,
  }) => {
    await helpers.mockLogin();
    await mockRequests(page);

    await page.getByText("Test User").click();
    await expect(page.url()).toBe("http://localhost:3000/admin/profile/108");
    await expect(page.getByText("First Name")).toBeVisible();
    await expect(page.getByText("Last Name")).toBeVisible();
    await expect(page.getByText("Email")).toBeVisible();
    const editButtons = await page.getByRole("button", { name: /edit/i });
    await editButtons.first().click();
    await expect(page.getByPlaceholder("First Name")).toHaveValue("Test");
    await page.getByPlaceholder("First Name").fill("Updated Name");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(
      page.getByText("User profile updated successfully!")
    ).toBeVisible();
    await editButtons.first().click();
    await expect(page.getByPlaceholder("First Name")).toHaveValue(
      "Updated Name"
    );
  });
});

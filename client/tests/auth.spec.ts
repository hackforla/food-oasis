import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test("Should be able to login successfully", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("MenuIcon").click();
    await page.getByText("Volunteer Login").click();

    await expect(page.url()).toBe("http://localhost:3000/admin/login");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.getByLabel("Email *").fill("testuser@test.com");
    await page.locator('input[type="password"]').fill("Brave1234!");
    await page.getByText("Sign In").click();

    await expect(page).toHaveURL(
      "http://localhost:3000/admin/verificationAdmin"
    );
    await expect(
      page.getByRole("heading", { name: "Verification Administration" })
    ).toBeVisible();
  });
});

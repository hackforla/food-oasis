import { Page, test as playwrightTest, expect } from "@playwright/test";

declare global {
  interface Window {
    __IS_TEST__?: boolean;
  }
}

export default playwrightTest.extend<{
  helpers: ReturnType<typeof authTest>;
}>({
  helpers: async ({ page }, use) => {
    use(authTest(page));
  },
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      window.__IS_TEST__ = true;
    });
    await use(page);
  },
});

function authTest(page: Page) {
  return {
    login: async () => {
      await page.goto("/");

      await page.getByTestId("menu-button").click();
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
    },
  };
}

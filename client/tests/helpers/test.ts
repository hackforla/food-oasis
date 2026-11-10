import { test as playwrightTest } from "@playwright/test";
import type { Page } from "@playwright/test";

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
    mockLogin: async () => {
      // The client no longer decodes a cookie, so role flags must be
      // seeded directly on the stored user.
      const user = {
        id: 108,
        firstName: "Test",
        lastName: "User",
        email: "test@dispostable.com",
        isAdmin: true,
        isCoordinator: false,
        isDataEntry: true,
        isGlobalAdmin: true,
        isSecurityAdmin: false,
        isGlobalReporting: false,
      };

      await page.addInitScript((userObj) => {
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem(
          "userExpiresAt",
          String(Date.now() + 24 * 60 * 60 * 1000)
        );
      }, user);
      await page.goto("/");
    },
  };
}

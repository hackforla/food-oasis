import { expect, test as playwrightTest } from "@playwright/test";
import type { Page } from "@playwright/test";
import mockRequests from "./mocks";

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
      const user = {
        id: 108,
        firstName: "Test",
        lastName: "User",
        email: "test@dispostable.com",
        isAdmin: true,
        isCoordinator: false,
        isDataEntry: true,
      };

      const header = Buffer.from(JSON.stringify({ alg: "none" })).toString(
        "base64"
      );
      const payload = Buffer.from(
        JSON.stringify({
          email: user.email,
          id: user.id,
          sub: "admin,data_entry,global_admin",
        })
      ).toString("base64");
      const fakeJwt = `${header}.${payload}.`;

      await page.context().addCookies([
        {
          name: "jwt",
          value: fakeJwt,
          domain: "localhost",
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        },
      ]);

      await page.addInitScript((userObj) => {
        localStorage.setItem("user", JSON.stringify(userObj));
      }, user);
    },
  };
}

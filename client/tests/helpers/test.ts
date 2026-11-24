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
      // Turn off CSS transitions and animations. Playwright waits for elements
      // to stop moving before clicking, which is slow on busy CI runners.
      document.addEventListener("DOMContentLoaded", () => {
        const style = document.createElement("style");
        style.textContent =
          "*, *::before, *::after { transition: none !important; animation: none !important; }";
        document.head.appendChild(style);
      });
    });
    // These routes go on the browser context so they also cover popups and
    // other pages. Page routes (mockRequests, per-test mocks) take priority.
    const context = page.context();
    // Answer API calls that no test mocks with the same empty 502 the Vite
    // proxy returns when no API server is running, without the proxy's error logs.
    await context.route("**/api/**", (route) => route.fulfill({ status: 502 }));
    // Block third-party map tiles and analytics. They add network traffic and
    // CPU-heavy WebGL rendering on CI without being part of what we test.
    for (const host of BLOCKED_HOSTS) {
      await context.route(`https://${host}/**`, (route) => route.abort());
    }
    // The address search does use Mapbox geocoding, so answer it with a fixed
    // result instead. Added last, so it takes priority over the block above.
    await context.route("https://api.mapbox.com/geocoding/v5/**", (route) =>
      route.fulfill({ json: GEOCODE_RESPONSE })
    );
    await use(page);
  },
});

const BLOCKED_HOSTS = [
  "*.mapbox.com",
  "www.googletagmanager.com",
  "*.google-analytics.com",
  "analytics.google.com",
  "stats.g.doubleclick.net",
];

const GEOCODE_RESPONSE = {
  type: "FeatureCollection",
  features: [
    {
      id: "postcode.90001",
      place_name: "Los Angeles, California 90001, United States",
      center: [-118.2479, 33.9731],
    },
  ],
};

interface MockUser {
  isAdmin: boolean;
  isCoordinator: boolean;
  isDataEntry: boolean;
  isGlobalAdmin: boolean;
  // Role string, e.g. "data_entry,coordinator". Determines the role flags.
  sub: string;
}

function authTest(page: Page) {
  return {
    mockLogin: async (overrides: Partial<MockUser> = {}) => {
      const { sub = "admin,data_entry,global_admin", ...userOverrides } =
        overrides;

      // The client no longer decodes a cookie, so role flags are seeded
      // directly on the stored user, derived from `sub` the way the old
      // JWT decoding did it.
      const roles = new Set(sub.split(","));
      const user = {
        id: 108,
        firstName: "Test",
        lastName: "User",
        email: "test@dispostable.com",
        ...userOverrides,
        isAdmin: roles.has("admin"),
        isSecurityAdmin: roles.has("security_admin"),
        isCoordinator: roles.has("coordinator"),
        isDataEntry: roles.has("data_entry"),
        isGlobalAdmin: roles.has("global_admin"),
        isGlobalReporting: roles.has("global_reporting"),
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

import { expect } from "@playwright/test";
import mockRequests from "./helpers/mocks";
import test from "./helpers/test";

const stakeholder = (overrides: Record<string, unknown> = {}) => ({
  id: 1,
  name: 'Pantry <img src=x onerror="window.__xss=1">',
  address1: "111 Address",
  city: "Los Angeles",
  state: "CA",
  zip: "90001",
  phone: "(555) 555-1234",
  email: "pantry@example.org",
  website: "",
  notes: "",
  requirements: "Bring ID",
  eligibilityNotes: "Residents only",
  covidNotes: "Closed Dec 25",
  hoursNotes: "Call ahead",
  categories: [],
  hours: [
    { weekOfMonth: 0, dayOfWeek: "Mon", open: "09:00:00", close: "13:00:00" },
  ],
  verificationStatusId: 1,
  ...overrides,
});

const template = {
  subject: 'Please review the listing for "{{ORG_NAME}}" at {{SITE_URL}}',
  intro: "Hello!\n\nWe help people in {{REGION_NAME}}.",
};

async function setup(
  page: import("@playwright/test").Page,
  org = stakeholder()
) {
  await mockRequests(page, {
    "stakeholders/1": org,
    "email-templates/verification": template,
  });
}

test.describe("Verification Email tab", () => {
  test("is visible to data entry users on an existing organization", async ({
    page,
    helpers,
  }) => {
    await setup(page);
    await helpers.mockLogin({
      isAdmin: false,
      isCoordinator: false,
      isDataEntry: true,
      sub: "data_entry",
    });
    await page.goto("/admin/organizationedit/1");
    await expect(
      page.getByRole("tab", { name: "Verification Email" })
    ).toBeVisible();
  });

  test("does not fetch the template until the tab is opened", async ({
    page,
    helpers,
  }) => {
    await setup(page);
    const templateRequests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/email-templates")) {
        templateRequests.push(req.url());
      }
    });
    await helpers.mockLogin();
    await page.goto("/admin/organizationedit/1");
    await expect(
      page.getByRole("tab", { name: "Verification Email" })
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "Identification" })
    ).toBeVisible();
    expect(templateRequests).toHaveLength(0);
    await page.getByRole("tab", { name: "Verification Email" }).click();
    await expect(page.getByTestId("verification-email-preview")).toBeVisible();
    expect(templateRequests.length).toBeGreaterThan(0);
  });

  test("is visible to coordinators", async ({ page, helpers }) => {
    await setup(page);
    await helpers.mockLogin({
      isAdmin: false,
      isCoordinator: true,
      isDataEntry: false,
      sub: "coordinator",
    });
    await page.goto("/admin/organizationedit/1");
    await expect(
      page.getByRole("tab", { name: "Verification Email" })
    ).toBeVisible();
  });

  test("is hidden when adding a new organization", async ({
    page,
    helpers,
  }) => {
    await setup(page);
    await helpers.mockLogin();
    await page.goto("/admin/organizationedit");
    await expect(
      page.getByRole("tab", { name: "Identification" })
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "Verification Email" })
    ).toHaveCount(0);
  });

  test("shows a mailto link and escapes organization data", async ({
    page,
    helpers,
  }) => {
    await setup(page);
    await helpers.mockLogin();
    await page.goto("/admin/organizationedit/1");
    await page.getByRole("tab", { name: "Verification Email" }).click();

    const link = page.getByRole("link", { name: "Send to my email program" });
    await expect(link).toHaveAttribute(
      "href",
      /^mailto:pantry@example\.org\?subject=Please%20review/
    );
    // {{SITE_URL}} resolves to the host (no protocol).
    await expect(page.getByTestId("verification-email-subject")).toContainText(
      "localhost:3000"
    );
    await expect(
      page.getByTestId("verification-email-subject")
    ).not.toContainText("http");
    const preview = page.getByTestId("verification-email-preview");
    await expect(page.getByText("Verification email generator")).toBeVisible();
    await expect(page.getByText("Copy and paste this to send")).toBeVisible();
    await expect(page.getByTestId("verification-email-to")).toHaveText(
      "To: pantry@example.org"
    );
    await expect(page.getByTestId("verification-email-subject")).toContainText(
      "Subject: Please review the listing"
    );
    await expect(preview).toContainText("Closure Notes");
    await expect(preview).toContainText("Website");
    await expect(preview).toContainText("Residents only");
    // Markup in org data must render as text, not as an element.
    await expect(preview.locator("img")).toHaveCount(0);
    await expect(preview).toContainText("<img src=x");
  });

  test("addresses the org email, not the org's verification contact", async ({
    page,
    helpers,
  }) => {
    await setup(
      page,
      stakeholder({
        adminContactName: "Pat Lee",
        adminContactEmail: "pat@example.org",
      })
    );
    await helpers.mockLogin();
    await page.goto("/admin/organizationedit/1");
    await page.getByRole("tab", { name: "Verification Email" }).click();
    await expect(page.getByTestId("verification-email-to")).toHaveText(
      "To: pantry@example.org"
    );
    const preview = page.getByTestId("verification-email-preview");
    await expect(preview).toContainText("Test User");
    await expect(preview).toContainText("test@dispostable.com");
    await expect(preview).not.toContainText("Pat Lee");
  });

  test("disables the mailto button when the org has no email", async ({
    page,
    helpers,
  }) => {
    await setup(page, stakeholder({ email: "" }));
    await helpers.mockLogin();
    await page.goto("/admin/organizationedit/1");
    await page.getByRole("tab", { name: "Verification Email" }).click();
    await expect(
      page.getByRole("button", { name: "Send to my email program" })
    ).toBeDisabled();
  });

  test("copies text/html and text/plain to the clipboard", async ({
    page,
    context,
    browserName,
    helpers,
  }) => {
    test.skip(browserName !== "chromium", "clipboard permissions: chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await setup(page);
    await helpers.mockLogin();
    await page.goto("/admin/organizationedit/1");
    await page.getByRole("tab", { name: "Verification Email" }).click();
    await page
      .getByRole("button", { name: "Copy email body to clipboard" })
      .click();
    await expect(
      page.getByText("Email body copied to clipboard.")
    ).toBeVisible();

    const clip = await page.evaluate(async () => {
      const [item] = await navigator.clipboard.read();
      const html = await (await item.getType("text/html")).text();
      const text = await (await item.getType("text/plain")).text();
      return { types: item.types, html, text };
    });
    expect(clip.types).toEqual(
      expect.arrayContaining(["text/html", "text/plain"])
    );
    expect(clip.html).toContain("&lt;img");
    expect(clip.html).not.toContain("<img");
    expect(clip.text).toContain("Verification Phone\n\n");
    expect(clip.text).toContain("Thank you!");
    expect(clip.text).toContain("Social Media\nFacebook: [no data]");
  });
});

test.describe("Email template admin page", () => {
  test("redirects data entry users", async ({ page, helpers }) => {
    await setup(page);
    await helpers.mockLogin({
      isAdmin: false,
      isCoordinator: false,
      isDataEntry: true,
      sub: "data_entry",
    });
    await page.goto("/admin/emailtemplate");
    await expect(page).not.toHaveURL(/emailtemplate/);
  });

  test("lets a coordinator open the page and save the intro", async ({
    page,
    helpers,
  }) => {
    await setup(page);
    let posted: unknown = null;
    await page.route("**/api/email-templates/verification", (route) => {
      if (route.request().method() === "POST") {
        posted = route.request().postDataJSON();
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ ...template, intro: "New intro" }),
        });
      }
      return route.fallback();
    });
    await helpers.mockLogin({
      isAdmin: false,
      isCoordinator: true,
      isDataEntry: false,
      sub: "coordinator",
    });
    await page.goto("/admin/emailtemplate");
    await page.getByLabel("Intro").fill("New intro");
    await page.getByRole("button", { name: "Save Intro" }).click();
    await expect(page.getByText("Template saved.")).toBeVisible();
    expect(posted).toEqual({ tenantId: 1, intro: "New intro" });
  });

  test("shows the menu link to coordinators", async ({ page, helpers }) => {
    await setup(page);
    await helpers.mockLogin({
      isAdmin: false,
      isCoordinator: true,
      isDataEntry: false,
      sub: "coordinator",
    });
    await page.getByTestId("menu-button").click();
    await expect(
      page.getByRole("link", { name: "Verification Email Template" })
    ).toBeVisible();
  });

  test("lets an admin edit and save the subject", async ({ page, helpers }) => {
    await setup(page);
    let posted: unknown = null;
    await page.route("**/api/email-templates/verification", (route) => {
      if (route.request().method() === "POST") {
        posted = route.request().postDataJSON();
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ ...template, subject: "New subject" }),
        });
      }
      return route.fallback();
    });
    await helpers.mockLogin({ sub: "admin" });
    await page.goto("/admin/emailtemplate");
    await page.getByLabel("Intro").fill("Unsaved intro edit");
    await page.getByLabel("Subject").fill("New subject");
    await page.getByRole("button", { name: "Save Subject" }).click();
    await expect(page.getByText("Template saved.")).toBeVisible();
    // Saving the subject must not discard the unsaved intro edit.
    await expect(page.getByLabel("Intro")).toHaveValue("Unsaved intro edit");
    expect(posted).toEqual({ tenantId: 1, subject: "New subject" });
  });
});

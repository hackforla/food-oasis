import { expect } from "@playwright/test";
import test from "./helpers/test";
import mockRequests from "./helpers/mocks";

test("SurveySnackbar shows on user routes and hides on admin routes", async ({
  page,
  helpers,
}) => {
  await mockRequests(page);
  await page.goto("/");
  await expect(page.getByText("Help us improve!")).toBeVisible();
  await helpers.mockLogin();

  const surveyAfterLogin = page
    .getByRole("alert")
    .filter({ hasText: /help us improve!/i });
  await page.goto("/admin/verificationadmin");
  await expect(surveyAfterLogin).toHaveCount(0);
  await expect(page).toHaveURL(/\/admin\//);
});

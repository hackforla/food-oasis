import { expect } from "@playwright/test";
import test from "./helpers/test";
import mockRequests from "./helpers/mocks";

// test("survey only shows on user facing routes and not within admin routes", async ({
//   page,
//   helpers,
// }) => {
//   await page.addInitScript(() => {
//     localStorage.setItem(
//       "featureFlags",
//       JSON.stringify({ userFeedbackSurvey: true })
//     );
//   });

//   await mockRequests(page);
//   await page.goto("/");

//   const survey = page
//     .getByRole("alert")
//     .filter({ hasText: /Help us improve!/i });
//   await expect(survey).toBeVisible();
//   await helpers.mockLogin();

//   await expect(survey).toHaveCount(0);
// });

test("SurveySnackbar shows on user routes and hides on admin routes", async ({
  page,
  helpers,
}) => {
  await mockRequests(page);
  await page.goto("/");
  await expect(page.getByText("Help us improve!")).toBeVisible();
  await helpers.mockLogin();
  await expect(page).toHaveURL(/\/admin\//);
  const surveyAfterLogin = page
    .getByRole("alert")
    .filter({ hasText: /help us improve!/i });
  await expect(surveyAfterLogin).toHaveCount(0);
});

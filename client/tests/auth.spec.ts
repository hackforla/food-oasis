import mockRequests from "./helpers/mocks";
import test from "./helpers/test";
import { expect } from "@playwright/test";

test.describe("Auth", () => {
  test.describe("Login", () => {
    test("Should be able to login successfully", async ({ helpers }) => {
      await helpers.mockLogin();
    });
  });

  test.describe("Confirm Register", () => {
    test("Should be able to confirm email successfully", async ({ page }) => {
      await mockRequests(page);
      await page.goto("/admin/confirm/token123");
      await expect(
        page.getByText("Your email has been confirmed. Please log in.")
      ).toBeVisible();
      await expect(page.getByText("Log In")).toBeVisible();
    });

    test("Should resend confirmation email successfully", async ({ page }) => {
      await mockRequests(page, {
        "accounts/confirmRegister": {
          code: "REG_CONFIRM_TOKEN_INVALID",
          isSuccess: false,
          message:
            "Email confirmation failed. Invalid security token. Re-send confirmation email.",
        },
      });
      await page.goto("/admin/confirm/token123");
      await expect(page.getByText("Confirm Email")).toBeVisible();
      await expect(
        page.getByText(
          "The confirmation request was not found, or has expired. Please enter your email here and press the button to re-send the registration confirmation email."
        )
      ).toBeVisible();
      await expect(
        page.getByText("Enter the email for your account")
      ).toBeVisible();
      page.getByText("Enter the email for your account").fill("test@email.com");
      await page.getByText("RE-SEND CONFIRMATION EMAIL").click();
      await expect(
        page.getByText(
          "A confirmation email has been sent to test@email.com. Please find this email and click on the link provided to complete your email confirmation."
        )
      ).toBeVisible();
    });
  });
});

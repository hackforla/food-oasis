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

  test.describe("Forgot Password", () => {
    test("Should display forgot password form and submit successfully", async ({
      page,
    }) => {
      await mockRequests(page, {
        "accounts/getByEmail": {
          isSuccess: true,
          user: {
            id: 108,
            email: "test@email.com",
            emailConfirmed: true,
          },
        },
      });

      await page.goto("/admin/forgotpassword");
      await expect(
        page.getByRole("heading", { name: "Forgot Password" })
      ).toBeVisible();

      await page.getByPlaceholder("Email").fill("test@email.com");
      await page
        .getByRole("button", { name: "Send Password Reset Link" })
        .click();
      await page.waitForURL("**/admin/resetpasswordemailsent/**");
      await expect(page.url()).toContain(
        "/admin/resetpasswordemailsent/test@email.com"
      );
    });

    test("Should show error when account not found", async ({ page }) => {
      await mockRequests(page, {
        "accounts/forgotPassword": {
          isSuccess: false,
          code: "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND",
          message:
            "Account not found. If you want to create a new account with this email, please register.",
        },
      });

      await page.goto("/admin/forgotpassword");
      await page.getByPlaceholder("Email").fill("nonexistent@email.com");
      await page
        .getByRole("button", { name: "Send Password Reset Link" })
        .click();

      await expect(
        page.getByText(
          "Account not found. If you want to create a new account with this email, please register."
        )
      ).toBeVisible();
    });

    test("Should show error when email sending fails", async ({ page }) => {
      await mockRequests(page, {
        "accounts/forgotPassword": {
          isSuccess: false,
          code: "FORGOT_PASSWORD_EMAIL_FAILED",
          message: "A problem occurred with sending an email to this address.",
        },
      });

      await page.goto("/admin/forgotpassword");
      await page.getByPlaceholder("Email").fill("valid@email.com");
      await page
        .getByRole("button", { name: "Send Password Reset Link" })
        .click();

      await expect(
        page.getByText(
          "A problem occurred with sending an email to this address."
        )
      ).toBeVisible();
    });
  });
});

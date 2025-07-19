import mockRequests from "./helpers/mocks";
import test from "./helpers/test";
import { expect } from "@playwright/test";

test.describe("Auth", () => {
  test.describe("Register", () => {
    test("Should register successfully", async ({ page }) => {
      await mockRequests(page, {
        "accounts/register": {
          isSuccess: true,
        },
      });
      await page.goto("/admin/register");
      await page.getByPlaceholder("First Name").fill("Test");
      await page.getByPlaceholder("Last Name").fill("User");
      await page.getByPlaceholder("Email").fill("testuser@email.com");
      await page.getByPlaceholder("Password").first().fill("Password123!");
      await page.getByPlaceholder("Confirm Password").fill("Password123!");
      await page.getByRole("button", { name: "Register" }).click();
      await expect(
        page.getByText(
          "Registration successful. Please check your email for a confirmation link."
        )
      ).toBeVisible();
    });

    test("Should show error if password confirmation does not match", async ({
      page,
    }) => {
      await mockRequests(page, {
        "accounts/register": {
          isSuccess: false,
        },
      });
      await page.goto("/admin/register");
      await page.getByPlaceholder("First Name").fill("Test");
      await page.getByPlaceholder("Last Name").fill("User");
      await page.getByPlaceholder("Email").fill("testuser@email.com");
      await page.getByPlaceholder("Password").first().fill("Password123!");
      await page
        .getByPlaceholder("Confirm Password")
        .fill("DifferentPassword!");
      await page.getByPlaceholder("Confirm Password").blur();
      await expect(page.getByText("Password does not match")).toBeVisible();
    });

    test("Should show error for duplicate email", async ({ page }) => {
      await mockRequests(page, {
        "accounts/register": {
          isSuccess: false,
          code: "REG_DUPLICATE_EMAIL",
        },
      });
      await page.goto("/admin/register");
      await page.getByPlaceholder("First Name").fill("Test");
      await page.getByPlaceholder("Last Name").fill("User");
      await page.getByPlaceholder("Email").fill("duplicate@email.com");
      await page.getByPlaceholder("Password").first().fill("Password123!");
      await page.getByPlaceholder("Confirm Password").fill("Password123!");
      await page.getByRole("button", { name: "Register" }).click();
      await expect(page.getByText(/already registered/i)).toBeVisible();
    });

    test("Should show error for registration failure", async ({ page }) => {
      await mockRequests(page, {
        "accounts/register": {
          isSuccess: false,
          code: "REG_UNKNOWN_ERROR",
        },
      });
      await page.goto("/admin/register");
      await page.getByPlaceholder("First Name").fill("Test");
      await page.getByPlaceholder("Last Name").fill("User");
      await page.getByPlaceholder("Email").fill("fail@email.com");
      await page.getByPlaceholder("Password").first().fill("Password123!");
      await page.getByPlaceholder("Confirm Password").fill("Password123!");
      await page.getByRole("button", { name: "Register" }).click();
      await expect(
        page.getByText(
          "An error occurred in sending the confirmation message to fail@email.com. Try to log in, and follow the instructions for re-sending the confirmation email."
        )
      ).toBeVisible();
    });
  });

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
      await mockRequests(page);

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

    test("Should show reset password email sent confirmation", async ({
      page,
    }) => {
      // Simulate user landing on the reset password email sent page
      await page.goto("/admin/resetpasswordemailsent/test@email.com");
      await expect(
        page.getByText("Password Reset Link was Sent").first()
      ).toBeVisible();
      await expect(
        page.getByText(
          "A password reset link was sent to test@email.com. If you don’t see it in your inbox, please check your junk/spam folder."
        )
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Back to login" })
      ).toBeVisible();
    });
  });

  test.describe("Reset Password", () => {
    test("Should reset password successfully", async ({ page }) => {
      await mockRequests(page, {
        "accounts/resetPassword": {
          isSuccess: true,
        },
      });
      await page.goto("/admin/resetpassword/token123");
      await page.getByPlaceholder("New Password").fill("NewPassword123!");
      await page.getByPlaceholder("Confirm Password").fill("NewPassword123!");
      await page.getByRole("button", { name: "Reset Password" }).click();
      await expect(
        page.getByText("Password has been successfully updated")
      ).toBeVisible();
    });

    test("Should show error if token is invalid", async ({ page }) => {
      await mockRequests(page, {
        "accounts/resetPassword": {
          isSuccess: false,
          code: "RESET_TOKEN_INVALID",
          message: "Password reset failed. Invalid or expired token.",
        },
      });
      await page.goto("/admin/resetpassword/invalidtoken");
      await page.getByPlaceholder("New Password").fill("NewPassword123!");
      await page.getByPlaceholder("Confirm Password").fill("NewPassword123!");
      await page.getByRole("button", { name: "Reset Password" }).click();
      await expect(page.getByText(/Invalid or expired token/i)).toBeVisible();
    });

    test("Should show error for reset failure", async ({ page }) => {
      await mockRequests(page, {
        "accounts/resetPassword": {
          isSuccess: false,
          code: "RESET_UNKNOWN_ERROR",
          message: "An error occurred while resetting your password.",
        },
      });
      await page.goto("/admin/resetpassword/token123");
      await page.getByPlaceholder("New Password").fill("NewPassword123!");
      await page.getByPlaceholder("Confirm Password").fill("NewPassword123!");
      await page.getByRole("button", { name: "Reset Password" }).click();
      await expect(
        page.getByText(/An error occurred while resetting your password/i)
      ).toBeVisible();
    });
  });
});

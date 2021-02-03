# Forgot Password

## Forgot Password Form

If a user forgets their password, the Forgot Password feature allows them to re-set it.

- The client needs to provide a form for the user to enter their login name and validate that the email is in a valid email format.
- Upon form submission, the client POSTs an AJAX request to the server at `/api/accounts/forgotpassword` with a body containing the email address.
- The server uses the provided email address to verify that there is an account for that email. If not, the Web API returns a response object of `{ isSuccess: false, code: "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND"}`.
- The server then creates a guid security token and records it in the database, and transmits an email to that email address with an HTML body containing a "Reset Password" button or link. The url for the link should be `<domain>/resetpassword/<token>`, where `<token>` is replaced with the guid of the generated security token. If a problem is encountered in transmitting the email, the Web API returns a response object `{isSuccess: false, code: "FORGOT_PASSWORD_EMAIL_FAILED"}`. The client should notify the user that the server encountered an error in sending an email. (This would most likely be a problem that a developer would need to fix, such as a failure of the email sending service.)
- If the email is successfully sent, the Web API should return a response object `{isSuccess: true, code "FORGOT_PASSWORD_SUCCESS"}`. The client should notify the user to check their email for an "Reset Password Confirmation" message with a link to use to reset their password. The client should probably re-direct to a sensible unsecured home page, while waiting for the user to confirm their email.
- If an internal or unexpected exception occurs on the server, the Web API should return an HttpStatus Code of 500. This would be a bug in the application.

## Reset Password Form

When the user clicks on the Reset Password link or button in the above email, they should be taken to the `\resetpassword\<token>` page, which allows them to enter:

- New Password
- New Password Confirmation (i.e., re-type the password)

The client should verify that the password and password confirmation match and meet the password complexity requirements before allowing the form to be submitted.

When the form is submitted, the form POSTs and AJAX call to `\api\accounts\resetpassword`, and the request body is `{token, password}`. The server then:

- Performs a query against the database to find the security token and verify that it was created less that 1 hour prior. If the token is found and was created less than 1 hour prior, then the account is updated to indicate that the email has been confirmed and the Web API returns a response body `{isSuccess: true}`. The client should notify the user that the email was confirmed, and redirect them to the login page.
- However, if the token is not found, then the Web API returns an object `{isSuccess: false, code: "RESET_PASSWORD_TOKEN_INVALID"}`. If the token is more than an hour old, the Web API returns an object `{isSuccess: false, code: "RESET_PASSWORD_TOKEN_EXPIRED"}`. In either case, the user should be directed to try the forgot password feature again.

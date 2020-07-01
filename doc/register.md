# Registration and Login

## Registration Form

User enters fields:

- First Name
- Last Name
- Email (Used as user name)
- Password
- Password Confirmation (i.e., re-type the password)

The client is responsible for verifying that all the fields are supplied, the email has a legitimate email format, and the Password and RE-typed password match, and satisfy the appropriate complexity requirements.

Upon submitting the form, a Web API request is POSTed to the server at `/api/accounts/register`, with a body containing {firstName, lastName, email, password} and the server processes the request:

- If an account already exists for the email, the
  Web API response has an HttpCode of 200, but the object returned is `{isSuccess: false, code: "REG_DUPLICATE_EMAIL"}`. The client should display a notification to the user that the email is already registered, and they should either login or use the forgot password feature to use the account.
- If an account does not already exist for the email, one is created, including the first name, last name, and email.
- The server then creates a guid security token and records it in the database, and transmits an email to that email address with an HTML body containing a "Confirm Password" button or link. The url for the link should be `<domain>/confirm/<token>`, where `<token>` is replaced with the guid of the generated security token. If a problem is encountered in transmitting the email, the Web API returns a response object `{isSuccess: false, code: "REG_EMAIL_FAILED"}`. The client should notify the user that the server encountered an error in sending an email. (This would most likely be a problem that a developer would need to fix, such as a failure of the email sending service.)
- If the email is successfully sent, the Web API should return a response object `{isSuccess: true, code "REG_SUCCESS"}`. The client should notify the user that he should check his email for an "Email Confirmation" message with a link to use to confirm that he owns the email address. The client should probably re-direct to a sensible unsecured home page, while waiting for the user to confirm their email.
- If an internal or unexpected exception occurs on the server, the Web API should return an HttpStatus Code of 500. This would be a bug in the application.

## Confirm Registration Email Form

- When the user clicks on the Confirm Registration button in the email, their default browser will load the `/confirm/<token>`. In the process of loading, the browser POSTs an AJAX request to `/api/accounts/confirmRegister`, passing the token in the request body.
- The server performs a query against the database to find the security token and verify that it was created less that 1 hour prior. If the token is found and was created less than 1 hour prior, then the account is updated to indicate that the email has been confirmed and the Web API returns a response body `{isSuccess: true}`. The client should notify the user that the email was confirmed, and redirect them to the login page.
- However, if the token is not found, then the Web API returns an object `{isSuccess: false, code: "REG_CONFIRM_TOKEN_INVALID"}`. If the token is more than an hour old, the Web API returns an object `{isSuccess: false, code: "REG_CONFIRM_TOKEN_EXPIRED"}`. In either case, the user should be directed to take some action, such as presssing a button to send (or re-send) a confirmation email. This should POST another Web API request to `/api/accounts/resendConfirmationEmail` with a body containing the email address, and the server should repeat the steps described for registration above, except for creating the account, since it should already exist.

## Login Form

The Login UI should require the user to enter:

- User Name (i.e., the account email)
- Password

When the user submits the form, a Web API request is POSTed to the server with url `/api/accounts/login` and the body of the request contains `{email, password}`. The server then:

- Uses the email to locate and retrieve the account information. If no account is found, the Web API returns an HttpStatus Code of 200 (since the request was completed successfully), but properties {isSuccess: false, code: "AUTH_NO_ACCOUNT"}, and the client should inform the user that the account does not exist.

* If the account exists, but the email has not been confirmed, the Web API return an object {isSuccess: false, code: "AUTH_NOT_CONFIRMED"}, and the client can automatically POST another Web API request to `/api/accounts/resendConfirmationEmail` as described above in the Confirm Email Registration section above.

* The server then hashes the provided password and compares it to the stored hashed password from the database, and if they do not match, then the Web API returns an object {isSuccess: false, code: "AUTH_INCORRECT_PASSWORD"}. The client should just notify the user that the password is incorrect, and ask them to try again or use the forgot password feature.
* If the password does match, the Web API should generate a JSON WEb Token (JWT) and return a response object with

```
{
    isSuccess: true,
    token: <JSON Web Token>,
    user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        emailConfirmed: user.emailConfirmed
    }
}
```

The response should also set a response cookie named "jwt", which also contains the JWT. A normal browser will keep the cookie and use it on subsequent requests to authenticate the request, essentially initiating a login "session". (The JWT is also included in the response body to allow for the possibility that a client - such as a mobile app - may not use cookies, and have to manage the auth token itself.)

The client will also read the user property from the successful login response and then store the user object for subsequent use by the client (using some sort of global state mechanism).
It is probably also advisable for the client to store the user information in local storage or some other non-volatile but secured place, so the client can be re-started without losing track of the user information.

## Logout

To "logout", the client simply deletes the JWT token from the cookies, and deletes the user object from its state. Subsequent requests to the server will not have the authentication cookie until the user logs in again.

(This is not the most secure design. If a bad actor intercepts the JWT token, it will still be valid on the server before its cookie expiration time.)

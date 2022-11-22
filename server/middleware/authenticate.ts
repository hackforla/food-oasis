import passport from "passport";
import { Strategy } from "passport-local";
import accountService from "../app/services/account-service";

passport.use(localStrategy());

// This module hooks up passport to our authentication service
const authenticate = passport.authenticate("local", {
  session: false,
  failureFlash: true,
});

function localStrategy() {
  return new Strategy(
    { usernameField: "email", passwordField: "password", tenantId: "tenantId" },
    async function (username, password, tenantId, done) {
      try {
        const response = await accountService.authenticate(
          username,
          password,
          tenantId
        );
        if (response.isSuccess) {
          done(null, response.user);
        } else {
          done(null, false, { message: response.message });
        }
      } catch (err) {
        done(err);
      }
    }
  );
}

export default authenticate;

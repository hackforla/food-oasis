const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const accountService = require("../app/services/account-service");

passport.use(localStrategy());

// This module hooks up passport to our authentication service
const authenticate = passport.authenticate("local", {
  session: false,
  failureFlash: true
});

module.exports = { authenticate };

function localStrategy() {
  return new Strategy(
    { usernameField: "email", passwordField: "password" },
    async function(username, password, done) {
      try {
        const response = await accountService.authenticate(username, password);
        if (response.isSuccess) {
          done(null, response.user);
        } else {
          done(null, false, { message: response.reason });
        }
      } catch (err) {
        done(err);
      }
    }
  );
}

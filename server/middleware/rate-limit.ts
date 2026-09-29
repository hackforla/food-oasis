import rateLimit from "express-rate-limit";

// Rate limiting for authentication and abuse-prone endpoints (login,
// password reset, registration, contact form) to slow down credential
// stuffing / brute force / mass account creation / mail-relay abuse.
//
// Keyed by client IP (express-rate-limit's default keyGenerator). This
// requires `app.set("trust proxy", ...)` to be configured correctly in
// server.ts so req.ip reflects the real client address behind Heroku's
// proxy rather than the proxy's own address.
//
// Uses the default in-memory store: counters are per-process and reset on
// dyno restart/deploy, and are not shared across multiple dynos. That's an
// acceptable first line of defense for this app's current single/low-dyno
// deployment; a shared store (e.g. Redis) would be needed to make limits
// hold across a horizontally-scaled deployment.
//
// These are factory functions, not shared instances: each rate-limited
// route must call create*Limiter() itself and get its own limiter/store, so
// that unrelated actions (e.g. login vs. forgotPassword) don't drain the
// same per-IP counter as a side effect of sharing one middleware instance.

// Login, forgotPassword, resetPassword: most sensitive, tightest limit.
export const createStrictAuthLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      isSuccess: false,
      code: "RATE_LIMITED",
      message: "Too many attempts. Please try again later.",
    },
  });

// register, resendConfirmationEmail, confirmRegister, contact form:
// less sensitive but still abuse-prone (mass account creation, mail relay).
export const createModerateAuthLimiter = () =>
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      isSuccess: false,
      code: "RATE_LIMITED",
      message: "Too many requests. Please try again later.",
    },
  });

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const accountService = require("../app/services/account-service");
// const autoCatch = require("./lib/auto-catch");

const jwtSecret = process.env.JWT_SECRET || "mark it zero";
const adminPassword = process.env.ADMIN_PASSWORD || "iamthewalrus";
const jwtOpts = { algorithm: "HS256", expiresIn: "30d" };

passport.use(loginStrategy());
const authenticate = passport.authenticate("local", { session: false });

module.exports = {
  authenticate,
  //login: autoCatch(login),
  login,
  //ensureUser: autoCatch(ensureUser),
  ensureUser
};

async function login(req, res, next) {
  const token = await sign({ email: req.user.email, id: req.user.id });
  res.cookie("jwt", token, { httpOnly: true });
  res.json({ success: true, token: token });
}

async function ensureUser(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt;
  const payload = await verify(jwtString);

  if (payload.email) {
    req.user = payload;

    return next();
  }

  const err = new Error("Unauthorized");
  err.statusCode = 401;
  next(err);
}

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

async function verify(jwtString = "") {
  jwtString = jwtString.replace(/^Bearer /i, "");

  try {
    const payload = await jwt.verify(jwtString, jwtSecret);
    return payload;
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
}

function loginStrategy() {
  return new Strategy(async function(email, password, cb) {
    try {
      const user = await accountService.getByEmail(email);
      if (!user) return cb(null, false);

      const isUser = await bcrypt.compare(password, user.passwordHash);
      if (isUser) return cb(null, { email: user.email, id: user.id });
    } catch (err) {}

    cb(null, false);
  });
}

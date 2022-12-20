import jwt from "jsonwebtoken";
import { CookieOptions, Request, Response } from "express";
import { Role } from "../types/account-types";

// const autoCatch = require("./lib/auto-catch");

const jwtSecret = process.env.JWT_SECRET || "mark it zero";
const jwtOpts: jwt.SignOptions = { algorithm: "HS256", expiresIn: "1d" };

interface JwtPayload {
  email: string;
  sub: string;
}

// This module manages the user's session using a JSON Web Token in the
// "authorization" cookie to manage the session.

// When a valid login request is
// received (as determined by authentication.authenticate middleware),
// we initiate a session by generating a token and returning it to
// the client. The token is returned as both an authorization cookie,
// as as a JSON response body (for clients that may not be able to
// work with cookies).
async function login(req: Request, res: Response) {
  const token = await sign({
    email: req?.user?.email,
    id: req?.user?.id,
    sub: `${req?.user?.role}` || "",
  });
  const cookieConfig: CookieOptions = {
    httpOnly: false,
    expires: new Date(Date.now() + 86400000), // 1 day
    sameSite: req.secure ? "none" : undefined,
    secure: req.secure ? true : false,
  };
  res.cookie("jwt", token, cookieConfig);
  const user = req.user;
  res.json({ isSuccess: true, token: token, user });
}

// When a request is received for a route that requires an
// authenticated user, this middleware function validates that
// the authorization cookie has a valid JWT.
async function validateUser(req: Request, res: Response, next: any) {
  const jwtString = req.headers.authorization || req.cookies.jwt;

  try {
    const payload = await verify(jwtString);

    if (payload.email) {
      req.user = payload;
      return next();
    }
  } catch (err: any) {
    // 401 Unauthorize, indicating that user is not
    // authenticated.
    res.status(401).send(err.message);
  }
}

/** validateUserHasRequiredRoles
 * @param permittedRoles: an array of strings naming role required to
 * validate on the JWT
 * @returns function: the route handler function called by express
 * example:
 *   // server.js
 *   app.post(
 *    "/accounts/protected",
 *    jwtSession.validateUserHasRequiredRoles(["admin", "security_admin"]),
 *    accountsController.performActionOnlyPermittedToAdminRole
 *   );
 */
function validateUserHasRequiredRoles(permittedRoles: Role[]) {
  if (!permittedRoles || permittedRoles.length < 1) {
    throw Error("Authenication error: insufficient permissions");
  }
  return async function validateUserJwt(
    req: Request,
    res: Response,
    next: any
  ) {
    const jwtString = req.headers.authorization || req.cookies.jwt;
    try {
      // the payload object encoded on the JWT
      const payload = await verify(jwtString);

      // check that JWT subject is encoded with at least one of the requiredRoles
      const isJWTRoleInAllowedRoles = permittedRoles.some((permittedRole) => {
        const regex = new RegExp(permittedRole);
        return regex.test(payload.sub);
      });
      if (!isJWTRoleInAllowedRoles) {
        throw Error("Authentication error: insufficient permissions");
      }

      if (payload.email) {
        req.user = payload;
        return next();
      }
    } catch (err: any) {
      // 401 Unauthorize, indicating that user is not
      // authenticated.
      res.status(401).send(err.message);
    }
  };
}
// Helper function to create JWT token
async function sign(payload: string | object | Buffer) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

// Helper function to validate the JWT token
async function verify(jwtString = "") {
  jwtString = jwtString.replace(/^Bearer /i, "");

  try {
    const payload = (await jwt.verify(jwtString, jwtSecret)) as JwtPayload;
    return payload;
  } catch (err: any) {
    err.statusCode = 401;
    throw err;
  }
}

export default {
  //login: autoCatch(login),
  login,
  //ensureUser: autoCatch(ensureUser),
  validateUser,
  validateUserHasRequiredRoles,
};

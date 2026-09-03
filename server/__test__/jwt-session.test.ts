import jwt from "jsonwebtoken";
import jwtSession from "../middleware/jwt-session";
import { mockNext, mockRequest, mockResponse } from "./utils";

// Issues a real token through the login handler so the tests never need to
// know the signing secret the module was loaded with.
async function issueToken(user: Record<string, unknown>, secure = false) {
  const req = mockRequest({ user, secure });
  const res = mockResponse({ cookie: jest.fn().mockName("cookie") });
  await jwtSession.login(req, res);
  const token: string = res.json.mock.calls[0][0].token;
  return { token, req, res };
}

const adminUser = {
  id: 1,
  email: "admin@test.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
  features: ["reports"],
  passwordHash: "should-never-be-returned",
};

afterEach(() => {
  jest.useRealTimers();
});

describe("jwtSession.login", () => {
  it("sets a jwt cookie and returns the token with a filtered user", async () => {
    const { token, res } = await issueToken(adminUser);

    expect(res.cookie).toHaveBeenCalledWith(
      "jwt",
      token,
      expect.objectContaining({ httpOnly: false, secure: false })
    );
    expect(res.json).toHaveBeenCalledWith({
      isSuccess: true,
      token,
      user: { firstName: "Admin", lastName: "User", features: ["reports"] },
    });

    const body = res.json.mock.calls[0][0];
    expect(body.user).not.toHaveProperty("email");
    expect(body.user).not.toHaveProperty("passwordHash");
    expect(body.user).not.toHaveProperty("role");
  });

  it("encodes the user's role as the token subject", async () => {
    const { token } = await issueToken({
      ...adminUser,
      role: "admin,data_entry",
    });
    const payload = jwt.decode(token) as jwt.JwtPayload;

    expect(payload.sub).toBe("admin,data_entry");
    expect(payload.email).toBe("admin@test.com");
    expect(payload.id).toBe(1);
    expect(payload.exp).toBeGreaterThan(payload.iat as number);
  });

  it("marks the cookie secure and cross-site on https requests", async () => {
    const { res } = await issueToken(adminUser, true);

    expect(res.cookie).toHaveBeenCalledWith(
      "jwt",
      expect.any(String),
      expect.objectContaining({ secure: true, sameSite: "none" })
    );
  });
});

describe("jwtSession.validateUser", () => {
  it("accepts a valid token from the authorization header", async () => {
    const { token } = await issueToken(adminUser);
    const req = mockRequest({ headers: { authorization: token }, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await jwtSession.validateUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toEqual(
      expect.objectContaining({ email: "admin@test.com", sub: "admin" })
    );
    expect(res.status).not.toHaveBeenCalled();
  });

  it("strips a Bearer prefix from the authorization header", async () => {
    const { token } = await issueToken(adminUser);
    const req = mockRequest({
      headers: { authorization: `Bearer ${token}` },
      cookies: {},
    });
    const res = mockResponse();
    const next = mockNext();

    await jwtSession.validateUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("falls back to the jwt cookie when no header is present", async () => {
    const { token } = await issueToken(adminUser);
    const req = mockRequest({ headers: {}, cookies: { jwt: token } });
    const res = mockResponse();
    const next = mockNext();

    await jwtSession.validateUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("returns 401 when no token is supplied", async () => {
    const req = mockRequest({ headers: {}, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await jwtSession.validateUser(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(expect.any(String));
  });

  it("returns 401 for a token signed with a different secret", async () => {
    const forged = jwt.sign(
      { email: "admin@test.com", sub: "admin" },
      "not-the-server-secret",
      { algorithm: "HS256", expiresIn: "1d" }
    );
    const req = mockRequest({
      headers: { authorization: forged },
      cookies: {},
    });
    const res = mockResponse();
    const next = mockNext();

    await jwtSession.validateUser(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(req.user).toBeUndefined();
  });

  it("returns 401 for an expired token", async () => {
    jest
      .useFakeTimers({ doNotFake: ["performance"] })
      .setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const { token } = await issueToken(adminUser);

    // Tokens are issued with a one day lifetime.
    jest.setSystemTime(new Date("2026-01-03T00:00:00Z"));
    const req = mockRequest({ headers: { authorization: token }, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await jwtSession.validateUser(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("jwt expired");
  });
});

describe("jwtSession.validateUserHasRequiredRoles", () => {
  it("throws at setup time when no roles are given", () => {
    expect(() => jwtSession.validateUserHasRequiredRoles([])).toThrow(
      /insufficient permissions/
    );
  });

  it("allows a user whose subject contains a permitted role", async () => {
    const { token } = await issueToken(adminUser);
    const middleware = jwtSession.validateUserHasRequiredRoles([
      "admin",
      "security_admin",
    ]);
    const req = mockRequest({ headers: { authorization: token }, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user.sub).toBe("admin");
  });

  it("matches any one role out of a comma separated subject", async () => {
    const { token } = await issueToken({
      ...adminUser,
      role: "coordinator,data_entry",
    });
    const middleware = jwtSession.validateUserHasRequiredRoles(["data_entry"]);
    const req = mockRequest({ headers: { authorization: token }, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("rejects a valid token whose subject lacks every permitted role", async () => {
    const { token } = await issueToken({ ...adminUser, role: "data_entry" });
    const middleware = jwtSession.validateUserHasRequiredRoles([
      "admin",
      "security_admin",
    ]);
    const req = mockRequest({ headers: { authorization: token }, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(
      "Authentication error: insufficient permissions"
    );
    expect(req.user).toBeUndefined();
  });

  it("rejects a missing token even when roles would otherwise match", async () => {
    const middleware = jwtSession.validateUserHasRequiredRoles(["admin"]);
    const req = mockRequest({ headers: {}, cookies: {} });
    const res = mockResponse();
    const next = mockNext();

    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("rejects a token signed with a different secret", async () => {
    const forged = jwt.sign(
      { email: "admin@test.com", sub: "admin" },
      "not-the-server-secret",
      { algorithm: "HS256" }
    );
    const middleware = jwtSession.validateUserHasRequiredRoles(["admin"]);
    const req = mockRequest({
      headers: { authorization: forged },
      cookies: {},
    });
    const res = mockResponse();
    const next = mockNext();

    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

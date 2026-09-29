import jwt from "jsonwebtoken";
import jwtSession from "../middleware/jwt-session";
import { mockRequest, mockResponse, mockNext } from "./utils";

describe("validateUserHasRequiredRoles", () => {
  const jwtSecret = process.env.JWT_SECRET || "mark it zero";

  const signToken = (payload: object) =>
    jwt.sign(payload, jwtSecret, { algorithm: "HS256" });

  // permittedRoles is deliberately just ["admin"] for these cases: a wider
  // list (like account.test.ts's four-role guard) would let a substring
  // match on any of the other roles hide the bug these tests are for.
  const guard = jwtSession.validateUserHasRequiredRoles(["admin"]);

  it("allows a multi-role subject that includes a permitted role", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {
        jwt: signToken({ email: "vol@test.com", sub: "admin,coordinator" }),
      },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("allows a multi-role subject where the permitted role isn't first", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {
        jwt: signToken({ email: "vol@test.com", sub: "coordinator,admin" }),
      },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('rejects a subject role that only contains "admin" as a substring', async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {
        jwt: signToken({ email: "vol@test.com", sub: "global_admin" }),
      },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("rejects a different substring-containing role", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {
        jwt: signToken({ email: "vol@test.com", sub: "security_admin" }),
      },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("rejects an empty subject", async () => {
    const res = mockResponse();
    const req = mockRequest({
      headers: {},
      cookies: {
        jwt: signToken({ email: "vol@test.com", sub: "" }),
      },
    });
    const next = mockNext();

    await guard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

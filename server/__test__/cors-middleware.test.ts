import { Request, Response } from "express";

const originalCorsOrigins = process.env.CORS_ALLOWED_ORIGINS;

afterEach(() => {
  if (originalCorsOrigins === undefined) {
    delete process.env.CORS_ALLOWED_ORIGINS;
  } else {
    process.env.CORS_ALLOWED_ORIGINS = originalCorsOrigins;
  }
  jest.resetModules();
});

// Helper to build a fresh mock req/res/next for each test
function mockReqRes(origin: string | undefined, method = "GET") {
  const req = {
    headers: { origin },
    method,
  } as unknown as Request;

  const res = {
    setHeader: jest.fn(),
    sendStatus: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  return { req, res, next };
}

describe("cors middleware", () => {
  it("reflects an allowed origin and enables credentials", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net,https://foodoasis.la";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://la.foodoasis.net");

      middleware.cors(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        "https://la.foodoasis.net"
      );
      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Credentials",
        "true"
      );
      expect(res.setHeader).toHaveBeenCalledWith("Vary", "Origin");
      expect(next).toHaveBeenCalled();
    });
  });

  it("does not reflect an origin that is not on the allowlist", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://evil.example");

      middleware.cors(req, res, next);

      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        expect.anything()
      );
      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Credentials",
        expect.anything()
      );
      expect(next).toHaveBeenCalled();
    });
  });

  it("does not reflect anything when the request has no Origin header", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes(undefined);

      middleware.cors(req, res, next);

      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        expect.anything()
      );
      expect(next).toHaveBeenCalled();
    });
  });

  it("never allowlists anything when CORS_ALLOWED_ORIGINS is unset", () => {
    delete process.env.CORS_ALLOWED_ORIGINS;

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://la.foodoasis.net");

      middleware.cors(req, res, next);

      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        expect.anything()
      );
      expect(next).toHaveBeenCalled();
    });
  });

  it("always sets Allow-Methods, Max-Age, and Allow-Headers regardless of origin", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://evil.example");

      middleware.cors(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
      );
      expect(res.setHeader).toHaveBeenCalledWith("Access-Control-Max-Age", "86400");
      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
      );
    });
  });

  it("responds 204 and does not call next() on OPTIONS requests", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://la.foodoasis.net", "OPTIONS");

      middleware.cors(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(next).not.toHaveBeenCalled();
    });
  });

  it("calls next() for non-OPTIONS methods", () => {
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://la.foodoasis.net", "POST");

      middleware.cors(req, res, next);

      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});

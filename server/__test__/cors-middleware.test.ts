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

describe("cors middleware - subdomain and domain-variant handling", () => {
  const PRODUCTION_ORIGINS =
    "https://la.foodoasis.net,https://foodoasis.la,https://hi.foodoasis.net,https://sb.foodoasis.net,https://mck.foodoasis.net";

  it.each([
    "https://la.foodoasis.net",
    "https://foodoasis.la",
    "https://hi.foodoasis.net",
    "https://sb.foodoasis.net",
    "https://mck.foodoasis.net",
  ])("allows the exact configured origin: %s", (allowedOrigin) => {
    process.env.CORS_ALLOWED_ORIGINS = PRODUCTION_ORIGINS;

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes(allowedOrigin);

      middleware.cors(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        allowedOrigin
      );
      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Credentials",
        "true"
      );
    });
  });

  it.each([
    "https://evil.foodoasis.net",           // unlisted subdomain of the real parent domain
    "https://la.foodoasis.net.evil.com",    // real subdomain used as a prefix trick
    "https://foodoasisnet.com",             // similar-looking, unrelated domain
    "http://la.foodoasis.net",              // right host, wrong scheme (http, not https)
    "https://la.foodoasis.net:8080",        // right host, wrong port
    "https://foodoasis.net",                // parent domain itself, not a listed subdomain
  ])("rejects a similar-looking but non-allowlisted origin: %s", (spoofedOrigin) => {
    process.env.CORS_ALLOWED_ORIGINS = PRODUCTION_ORIGINS;

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes(spoofedOrigin);

      middleware.cors(req, res, next);

      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        expect.anything()
      );
      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Credentials",
        expect.anything()
      );
    });
  });

  it("treats different subdomains of the same parent domain as fully distinct origins", () => {
    // Only la.foodoasis.net is allowlisted here — sb.foodoasis.net must NOT
    // be treated as implicitly trusted just because it shares a parent domain.
    process.env.CORS_ALLOWED_ORIGINS = "https://la.foodoasis.net";

    jest.isolateModules(() => {
      const middleware = require("../middleware/middleware").default;
      const { req, res, next } = mockReqRes("https://sb.foodoasis.net");

      middleware.cors(req, res, next);

      expect(res.setHeader).not.toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        expect.anything()
      );
    });
  });
});

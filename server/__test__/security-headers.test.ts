import express, { Express } from "express";
import type { Server } from "http";
import securityHeaders from "../middleware/security-headers";

describe("security headers", () => {
  let app: Express;
  let server: Server;
  let baseUrl: string;

  beforeAll((done) => {
    app = express();
    app.use(securityHeaders);
    app.get("*splat", (_req, res) => {
      res.status(200).send("ok");
    });
    server = app.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        done(new Error("Could not determine test server address."));
        return;
      }
      baseUrl = `http://127.0.0.1:${address.port}`;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  const cspDirective = (csp: string | null, name: string) =>
    (csp ?? "")
      .split(";")
      .map((directive) => directive.trim())
      .find((directive) => directive.startsWith(`${name} `));

  it("sets the standard security headers", async () => {
    const response = await fetch(`${baseUrl}/organizations`);

    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("strict-transport-security")).toBe(
      "max-age=31536000"
    );
    expect(response.headers.get("cross-origin-resource-policy")).toBe(
      "cross-origin"
    );
    expect(response.headers.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin"
    );
    expect(response.headers.get("x-powered-by")).toBeNull();
  });

  it("sets a CSP that blocks inline scripts and plugins", async () => {
    const response = await fetch(`${baseUrl}/organizations`);
    const csp = response.headers.get("content-security-policy");

    expect(cspDirective(csp, "default-src")).toBe("default-src 'self'");
    expect(cspDirective(csp, "object-src")).toBe("object-src 'none'");
    expect(cspDirective(csp, "script-src")).not.toContain("'unsafe-inline'");
    expect(cspDirective(csp, "script-src")).not.toContain("'unsafe-eval'");
  });

  it("only allows same-origin framing outside the widget", async () => {
    const response = await fetch(`${baseUrl}/admin/login`);
    const csp = response.headers.get("content-security-policy");

    expect(response.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(cspDirective(csp, "frame-ancestors")).toBe("frame-ancestors 'self'");
  });

  it.each(["/widget", "/widget/", "/search"])(
    "allows %s to be embedded by third-party sites",
    async (path) => {
      const response = await fetch(`${baseUrl}${path}`);
      const csp = response.headers.get("content-security-policy");

      expect(response.headers.get("x-frame-options")).toBeNull();
      expect(cspDirective(csp, "frame-ancestors")).toBe("frame-ancestors *");
      // The rest of the policy still applies to the widget
      expect(cspDirective(csp, "default-src")).toBe("default-src 'self'");
    }
  );

  it("does not let lookalike paths be framed by third parties", async () => {
    const response = await fetch(`${baseUrl}/widget.html`);
    const csp = response.headers.get("content-security-policy");

    expect(response.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(cspDirective(csp, "frame-ancestors")).toBe("frame-ancestors 'self'");
  });
});

import express, { Express } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import type { Server } from "http";

// Stub the controller so the route never touches the DB. The real
// jwt-session guard is NOT mocked — that's what these tests exercise.
jest.mock("../app/controllers/stakeholder-controller", () => ({
  __esModule: true,
  default: new Proxy(
    {},
    {
      get: () => (_req: unknown, res: any) => res.sendStatus(200),
    }
  ),
}));

import stakeholderRouter from "../app/routes/stakeholder-router";

// setup-env.ts guarantees JWT_SECRET is set before this file loads.
const jwtSecret = process.env.JWT_SECRET as string;
const signToken = (payload: object) =>
  jwt.sign(payload, jwtSecret, { algorithm: "HS256" });

describe("DELETE /stakeholders/:id authorization", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll((done) => {
    const app: Express = express();
    app.use(cookieParser()); // mirrors server.ts; the guard reads req.cookies
    app.use(stakeholderRouter);
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

  const deleteStakeholder = (token?: string) =>
    fetch(`${baseUrl}/42`, {
      method: "DELETE",
      headers: token ? { Cookie: `jwt=${token}` } : {},
    });

  it("rejects an unauthenticated request", async () => {
    const response = await deleteStakeholder();

    expect(response.status).toBe(401);
  });

  it("rejects an authenticated non-admin caller", async () => {
    const response = await deleteStakeholder(
      signToken({ email: "user@test.com", sub: "data_entry" })
    );

    expect(response.status).toBe(401);
  });

  it("allows an authenticated admin through to the handler", async () => {
    const response = await deleteStakeholder(
      signToken({ email: "admin@test.com", sub: "admin" })
    );

    expect(response.status).toBe(200);
  });
});
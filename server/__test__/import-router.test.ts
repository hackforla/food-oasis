import express, { Express } from "express";
import type { Server } from "http";

jest.mock("../middleware/jwt-session", () => ({
  __esModule: true,
  default: {
    validateUserHasRequiredRoles:
      () => (_req: unknown, _res: unknown, next: () => void) =>
        next(),
  },
}));

jest.mock("../app/controllers/import-controller", () => ({
  __esModule: true,
  default: {
    uploadStakeholderCsv: (_req: unknown, res: any) => res.sendStatus(200),
    importStakeholderCsv: jest.fn(),
  },
}));

import importRouter from "../app/routes/import-router";

describe("stakeholder CSV upload", () => {
  let app: Express;
  let server: Server;
  let baseUrl: string;

  beforeAll((done) => {
    app = express();
    app.use(importRouter);
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

  const upload = (contents: Blob, filename: string) => {
    const formData = new FormData();
    formData.set("file", contents, filename);
    return fetch(`${baseUrl}/stakeholders-csv`, {
      method: "POST",
      body: formData,
    });
  };

  it("accepts a CSV file within the size limit", async () => {
    const response = await upload(
      new Blob(["name,address\nTest,123 Main St"], { type: "text/csv" }),
      "stakeholders.csv"
    );

    expect(response.status).toBe(200);
  });

  it("accepts a CSV file with a generic binary MIME type", async () => {
    const response = await upload(
      new Blob(["name,address\nTest,123 Main St"], {
        type: "application/octet-stream",
      }),
      "stakeholders.csv"
    );

    expect(response.status).toBe(200);
  });

  it("accepts a CSV file when the browser does not identify its MIME type", async () => {
    const response = await upload(
      new Blob(["name,address\nTest,123 Main St"]),
      "stakeholders.csv"
    );

    expect(response.status).toBe(200);
  });

  it("rejects a CSV file larger than 5 MB", async () => {
    const response = await upload(
      new Blob([new Uint8Array(5 * 1024 * 1024 + 1)], { type: "text/csv" }),
      "stakeholders.csv"
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({
      error: "CSV file must be 5 MB or smaller.",
    });
  });

  it("rejects a file without a CSV extension", async () => {
    const response = await upload(
      new Blob(["name,address"], { type: "text/csv" }),
      "stakeholders.txt"
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Only CSV files are allowed.",
    });
  });

  it("rejects a CSV extension with a disallowed MIME type", async () => {
    const response = await upload(
      new Blob(["not really a CSV"], { type: "application/pdf" }),
      "stakeholders.csv"
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Only CSV files are allowed.",
    });
  });
});

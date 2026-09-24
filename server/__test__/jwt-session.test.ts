describe("JWT secret configuration", () => {
  const originalJwtSecret = process.env.JWT_SECRET;

  afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
    jest.resetModules();
  });

  it("fails when JWT_SECRET is missing", () => {
    delete process.env.JWT_SECRET;

    expect(() => {
      jest.isolateModules(() => {
        require("../middleware/jwt-session");
      });
    }).toThrow("JWT_SECRET environment variable is required");
  });

  it("loads when JWT_SECRET is configured", () => {
    process.env.JWT_SECRET = "test-secret";

    expect(() => {
      jest.isolateModules(() => {
        require("../middleware/jwt-session");
      });
    }).not.toThrow();
  });
});

// jwt-session requires JWT_SECRET at import time, so give tests a default
// instead of depending on a local .env file.
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";

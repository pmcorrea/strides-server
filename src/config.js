// Respect env variables and establish defaults
module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  TEST_DB_URL: process.env.TEST_DB_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "secret123"
}
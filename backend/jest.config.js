module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  testMatch: ["**/tests/**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts"
  ],

  coverageDirectory: "coverage",

  clearMocks: true
};
module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/controllers/UserController.ts**"],
  coverageDirectory: "test/coverage",
  coveragePathIgnorePatterns: [
    "ormconfig.js",
    "/test/",
    "/node_modules/",
    "/src/middlewares",
    "/src/models",
    "/src/helpers",
    "/src/migrations",
    "/src/helpers/",
    "/build/",
    "/routes",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  modulePaths: ["<rootDir>/src/"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts?(x)"],
};

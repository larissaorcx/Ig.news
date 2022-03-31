module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
      "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(scss|css|sass)$": "identity-obj-proxy"
    },
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.tsx",
      "!src/**/*.spec.tsx", //exclui cobertura
      "!src/**/_app.tsx", //exclui cobertura
      "!src/**/_document.tsx", //exclui cobertura
    ],
    coverageReporters: ["lcov", "json"] //feedback de cobertura
  };
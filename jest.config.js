module.exports = {
    testIgnorePatterns : ["/node_modules", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTestes.ts"
    ],
    transform: {
        "^.+\\.(js|ts|jsx|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    testeEnvironment: 'jsdom' //ambiente para a aplicação
}
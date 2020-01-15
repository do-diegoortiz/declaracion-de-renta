module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  verbose: true,
  moduleNameMapper: {
    "\\.(css|scss|svg)$": "<rootDir>/__mocks__/styleMock.js"
  }
}
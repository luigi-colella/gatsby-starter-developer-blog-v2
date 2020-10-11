module.exports = {
  transform: {
    "^.+\\.(j|t)sx?$": "<rootDir>/jest-preprocess.js",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [".cache", "content", "node_modules", "public", "repository"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  setupFiles: [`<rootDir>/tests/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  globals: {
    __PATH_PREFIX__: ``,
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  collectCoverageFrom: [
    "**/src/**/*.(t|j)s?(x)",
  ]
}
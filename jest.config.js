const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
  "transform": {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  "testRegex": `.test.(js?|jsx?|tsx?)$`,
  "moduleFileExtensions": [
    `js`,
    `ts`,
    `tsx`,
    `jsx`,
    `json`,
    `node`
  ],
  moduleNameMapper,
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "enableTsDiagnostics": true
    }
  },
};

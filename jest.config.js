/* eslint-disable prettier/prettier */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.spec.ts$',
  collectCoverage: true,
  coverageDirectory: '../coverage',
};

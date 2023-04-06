module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  coverageReporters: ['cobertura', 'html', 'text', 'text-summary'],
  transform: { '\\.ts$': ['ts-jest'] },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true
      }
    }
  }
};

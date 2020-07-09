module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    rootDir: '../../',
    testURL: 'http://localhost/',
    coverageDirectory: '<rootDir>/build/test-results/',
    testMatch: ['<rootDir>/src/test/spec/**/@(*.)@(spec.ts?(width))'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/test'
    ],
    moduleNameMapper: {
        'components/(.*)': '<rootDir>/src/main/components/$1',
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    reporters: [
        'default',
        ['jest-junit', {output: './build/test-results/TESTS-results-jest.xml'}]
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    setupFiles: [],
    snapshotSerializers: [],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
            diagnostics: false
        }
    }
};

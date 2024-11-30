//All the test cases for winter supplement engine
const { processRules } = require('../helpers/rulesEngine');

describe('Winter Supplement Rules Engine', () => {
    // Basic Test Cases
    test('Client is eligible with no child (single)', () => {
        const input = {
            id: "test1",
            numberOfChildren: 0,
            familyComposition: "single",
            familyUnitInPayForDecember: true
        };

        const expected = {
            id: "test1",
            isEligible: true,
            baseAmount: 60.0,
            childrenAmount: 0.0,
            supplementAmount: 60.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });

    test('Client is eligible with 2 children (couple)', () => {
        const input = {
            id: "test2",
            numberOfChildren: 2,
            familyComposition: "couple",
            familyUnitInPayForDecember: true
        };

        const expected = {
            id: "test2",
            isEligible: true,
            baseAmount: 120.0,
            childrenAmount: 40.0,
            supplementAmount: 160.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });

    test('Client is ineligible, not in pay for december', () => {
        const input = {
            id: "test3",
            numberOfChildren: 1,
            familyComposition: "single",
            familyUnitInPayForDecember: false
        };

        const expected = {
            id: "test3",
            isEligible: false,
            baseAmount: 0.0,
            childrenAmount: 0.0,
            supplementAmount: 0.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });

    test('Client is eligible with 0 children (couple)', () => {
        const input = {
            id: "test4",
            numberOfChildren: 0,
            familyComposition: "couple",
            familyUnitInPayForDecember: true
        };

        const expected = {
            id: "test4",
            isEligible: true,
            baseAmount: 120.0,
            childrenAmount: 0.0,
            supplementAmount: 120.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });

    test('Client is eligible with 3 children (single)', () => {
        const input = {
            id: "test5",
            numberOfChildren: 3,
            familyComposition: "single",
            familyUnitInPayForDecember: true
        };

        const expected = {
            id: "test5",
            isEligible: true,
            baseAmount: 60.0,
            childrenAmount: 60.0,
            supplementAmount: 120.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });

    // Edge Cases
    test('Invalid input: Negative numberOfChildren', () => {
        const input = {
            id: "test6",
            numberOfChildren: -1,
            familyComposition: "single",
            familyUnitInPayForDecember: true
        };

        expect(() => processRules(input)).toThrow("Invalid input: numberOfChildren cannot be negative");
    });

    test('Client is eligible with a large number of children (couple)', () => {
        const input = {
            id: "test7",
            numberOfChildren: 10,
            familyComposition: "couple",
            familyUnitInPayForDecember: true
        };

        const expected = {
            id: "test7",
            isEligible: true,
            baseAmount: 120.0,
            childrenAmount: 200.0,
            supplementAmount: 320.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });

    test('Invalid input: Missing familyComposition', () => {
        const input = {
            id: "test8",
            numberOfChildren: 2,
            familyUnitInPayForDecember: true
        };

        expect(() => processRules(input)).toThrow("Invalid input: Missing familyComposition");
    });

    test('Invalid input: Unsupported familyComposition value', () => {
        const input = {
            id: "test9",
            numberOfChildren: 1,
            familyComposition: "invalid_type",
            familyUnitInPayForDecember: true
        };

        expect(() => processRules(input)).toThrow("Invalid input: Unsupported familyComposition value");
    });

    test('Invalid input: Missing familyUnitInPayForDecember', () => {
        const input = {
            id: "test10",
            numberOfChildren: 1,
            familyComposition: "single"
        };

        expect(() => processRules(input)).toThrow("Invalid input: Missing familyUnitInPayForDecember");
    });

    test('Invalid input: Empty input', () => {
        const input = {};

        expect(() => processRules(input)).toThrow("Invalid input: Missing id");
    });

    test('Invalid input: Null input', () => {
        const input = null;

        expect(() => processRules(input)).toThrow("Invalid input: Input cannot be null");
    });

    test('Client is ineligible when familyUnitInPayForDecember is false (couple)', () => {
        const input = {
            id: "test11",
            numberOfChildren: 2,
            familyComposition: "couple",
            familyUnitInPayForDecember: false
        };

        const expected = {
            id: "test11",
            isEligible: false,
            baseAmount: 0.0,
            childrenAmount: 0.0,
            supplementAmount: 0.0
        };

        const result = processRules(input);
        expect(result).toEqual(expected);
    });
});

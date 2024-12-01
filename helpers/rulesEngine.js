function processRules(input) {
    // Validate the input object
    if (!input || typeof input !== 'object') {
        throw new Error("Invalid input: Input cannot be null or empty");
    }

    const { id, numberOfChildren, familyComposition, familyUnitInPayForDecember } = input;

    // Validating id
    if (!id) throw new Error("Invalid input: Missing id");

    // Validating Family unit in pay for december
    if (typeof familyUnitInPayForDecember !== 'boolean') {
        throw new Error("Invalid input: Missing familyUnitInPayForDecember");
    }

    // Validating the Number of children
    if (typeof numberOfChildren !== 'number') {
        throw new Error("Invalid input: numberOfChildren must be a number");
    }
    if (numberOfChildren < 0) {
        throw new Error("Invalid input: numberOfChildren cannot be negative");
    }
    if (numberOfChildren > 40) {
        throw new Error("Invalid input: numberOfChildren cannot be more than 40");
    }

    // Validating family Composition
    if (!familyComposition) throw new Error("Invalid input: Missing familyComposition");
    if (familyComposition !== 'single' && familyComposition !== 'couple') {
        throw new Error("Invalid input: Unsupported familyComposition value");
    }

    // Calculating
    // Check eligibility
    if (!familyUnitInPayForDecember) {
        return {
            id,
            isEligible: false,
            baseAmount: 0.0,
            childrenAmount: 0.0,
            supplementAmount: 0.0,
        };
    }

    // Initialize baseAmount
    let baseAmount = 0.0;
    if (familyComposition === 'single') baseAmount = 60.0;
    if (familyComposition === 'couple') baseAmount = 120.0;

    const childrenAmount = 20.0 * numberOfChildren;
    // Total supplement amount
    const supplementAmount = baseAmount + childrenAmount;

    return {
        id,
        isEligible: true,
        baseAmount,
        childrenAmount,
        supplementAmount,
    };
}

module.exports = { processRules };



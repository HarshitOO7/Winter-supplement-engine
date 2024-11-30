function processRules(input) {
    // Validate the input object
    if (!input || typeof input !== 'object') {
        throw new Error("Invalid input: Input cannot be null or empty");
    }

    const { id, numberOfChildren, familyComposition, familyUnitInPayForDecember } = input;

    // Validate required fields
    if (!id) throw new Error("Invalid input: Missing id");
    if (typeof numberOfChildren !== 'number') {
        throw new Error("Invalid input: numberOfChildren must be a number");
    }

    if (!familyComposition) throw new Error("Invalid input: Missing familyComposition");
    if (typeof familyUnitInPayForDecember !== 'boolean') {
        throw new Error("Invalid input: Missing familyUnitInPayForDecember");
    }

    // Validate numberOfChildren
    if (numberOfChildren < 0) {
        throw new Error("Invalid input: numberOfChildren cannot be negative");
    }

    // Validate familyComposition
    if (familyComposition !== 'single' && familyComposition !== 'couple') {
        throw new Error("Invalid input: Unsupported familyComposition value");
    }

    //Calculating
    if (!familyUnitInPayForDecember) {
        return {
            id,
            isEligible: false,
            baseAmount: 0.0,
            childrenAmount: 0.0,
            supplementAmount: 0.0,
        };
    }

    let baseAmount = 0.0;
    if (familyComposition === 'single') baseAmount = 60;
    if (familyComposition === 'couple') baseAmount = 120;

    const childrenAmount = 20 * numberOfChildren;
    const supplementAmount = baseAmount + childrenAmount;
    console.log(supplementAmount);
    
    return {
        id,
        isEligible: true,
        baseAmount,
        childrenAmount,
        supplementAmount,
    };
}

module.exports = { processRules };



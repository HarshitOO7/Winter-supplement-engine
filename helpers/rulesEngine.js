function processRules(input) {
    const { id, numberOfChildren, familyComposition, familyUnitInPayForDecember } = input;

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



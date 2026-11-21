
/*
 * Name: Joseph Ramos Molina Jr.
 * Section: IV-BSIT B
 * Activity: N2 - Modular Calculator
 * Date: November 21, 2026
 */

// Function to format a calculation result
function formatResult(operation, numbers, result) {
    return `Operation: ${operation}
Numbers: ${numbers.join(", ")}
Result: ${result}`;
}

// Export the formatter function
module.exports = {
    formatResult
};

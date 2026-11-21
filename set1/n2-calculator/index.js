
/*
 * Name: Joseph Ramos Molina Jr.
 * Section: IV-BSIT B
 * Activity: N2 - Modular Calculator
 * Date: November 21, 2026
 */

// Import the calculator modules
const operations = require("./operations.js");
const formatter = require("./formatter.js");

// Import a built-in Node.js module
const path = require("path");


const operation = process.argv[2];
const rawNumbers = process.argv.slice(3);
const numbers = rawNumbers.map(Number);

// List of supported operations
const validOperations = [
    "add",
    "subtract",
    "multiply",
    "divide",
    "average"
];

// Check if the operation is supported
if (!validOperations.includes(operation)) {
    console.error("Error: Unknown operation.");
    console.log(`Usage: node ${path.basename(__filename)} add 12 8`);
    process.exit(1);
}

// Check the required number of inputs
if (operation === "average") {
    if (numbers.length === 0) {
        console.error("Error: Average requires at least one number.");
        process.exit(1);
    }
} else if (numbers.length !== 2) {
    console.error("Error: This operation requires exactly two numbers.");
    process.exit(1);
}

// Check for invalid numeric inputs
if (
    rawNumbers.some(value => value.trim() === "") ||
    numbers.some(number => !Number.isFinite(number))
) {
    console.error("Error: Please enter valid numbers.");
    process.exit(1);
}


try {
    let result;

    // Choose the mathematical operation
    switch (operation) {
        case "add":
            result = operations.add(numbers[0], numbers[1]);
            break;

        case "subtract":
            result = operations.subtract(numbers[0], numbers[1]);
            break;

        case "multiply":
            result = operations.multiply(numbers[0], numbers[1]);
            break;

        case "divide":
            result = operations.divide(numbers[0], numbers[1]);
            break;

        case "average":
            result = operations.average(...numbers);
            break;
    }

    // Display the formatted calculation result
    console.log(formatter.formatResult(operation, numbers, result));

} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
}

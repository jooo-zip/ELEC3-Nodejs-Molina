
/*
 * Name: Joseph Ramos Molina Jr.
 * Section: IV-BSIT B
 * Activity: N2 - Modular Calculator
 * Date: November 21, 2026
 */

// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Function to divide two numbers
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }

    return a / b;
}

// Function to calculate the average of numbers
function average(...numbers) {
    if (numbers.length === 0) {
        throw new Error("At least one number is required.");
    }

    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total / numbers.length;
}

// Export all mathematical functions
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    average
};

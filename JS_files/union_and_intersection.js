"use strict";
// Combining Types (Unions & Intersections)
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript lets us combine types using logical operators, just like mixing ingredients.
// 1. Union Types (The "OR" Operator)
// A Union allows a variable to be one of multiple different types. We use the pipe symbol (|) to separate them.
// The Analogy: Think of a vending machine that accepts payment. It will accept Cash OR a Card. Either one is
// perfectly valid.
let paymentMethod;
paymentMethod = "Credit Card"; // Valid!
paymentMethod = 12345; // Valid (e.g., transaction ID)!
// paymentMethod = true;          // ❌ ERROR! Must be a string or a number.
console.log(paymentMethod);
// Issue with Union
function printStatusCode(status) {
    // console.log(`My status code is ${status.toUpperCase()}.`)
}
let lead = {
    employeeId: 589,
    teamSize: 12 // You MUST provide both properties!
};
// let lead1:TeamLead = {
//     employeeId: 600
// } // Will throw error as teamSize is missing
console.log(lead);

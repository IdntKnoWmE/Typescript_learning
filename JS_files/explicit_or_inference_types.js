"use strict";
// TS offers 2 ways of working with types:
Object.defineProperty(exports, "__esModule", { value: true });
// 1) Explicit Type
// Explicit typing simple means that you tell TS exactly what type a variable should be:
// Example:
var greeting = "Hello World";
var userCount = 10;
let isLoading = false;
// explicit types are used for function parameters and return types to make your code more
// maintainable and self-documenting.
// Function with explicit types
function greet(name) {
    return `Hello ${name} !`;
}
console.log(greet("Shalini"));
// console.log(greet(12)); will give error
//-------------------------------------------------------------------------------------------------------
// 2) Type Inference
// Here, TS does the work automatically, TS determines the type of a variable based on its initial value.
// Example:
let username = "Shalini";
let score = 100;
let countries = ["India", "Germany"];
console.log(typeof username, typeof score, typeof countries); // will return (string number object)
function add(a, b) {
    return a + b;
}
add(1, 2); // will work
// add("ad", "dff") will throw error
console.log(typeof add, typeof add(1, 5)); // will return (function number)
// Type inference works best when variables are initialized at declaration.
// Assigning null or undefined values to variable with dtypes not null
// var randomVariable :number = undefined;
// var randomVariable2 :number = null;
// Above both will give error if strict:true or strictNullChecks:true in tsconfig otherwise it will work
// and that will be a major security issue. so, always used Union for such cases
var randomVariable = null;
console.log(typeof randomVariable); // returns object
randomVariable = 5;
console.log(typeof randomVariable); // returns Number
// same for undefined
var randomVariable2 = undefined;
console.log(typeof randomVariable2); // returns undefined
randomVariable2 = "hello";
console.log(typeof randomVariable2); // returns string

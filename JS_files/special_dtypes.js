"use strict";
// TypeScript includes several special types that have specific behaviors in the type system.
Object.defineProperty(exports, "__esModule", { value: true });
// These special types are used when you don't know the types in advance or you need to bypass type checking
// of TS.
// These special types are part of TypeScript's type system and help make your code more type-safe and
// self-documenting.
// 1) Type: any
// - The any is the most flexible one.
// - It actually tells the TS compiler that bro skips type checking for my nigga.
// - Well it is actually useful in some use cases but since it is bypassing type check, it should be
//   used carefully.
// - For reference you should use any:
//   a) When migrating code from JS to TS.
//   b) When working with dynamic content where the type is unknown
//   c) When you need to opt out of type checking for a specific case
// Example:
// Without any
let b = true;
// b = "something new";
// Math.round(b);
// With any
let a = 1;
a = "something else";
a = true;
//-------------------------------------------------------------------------------------------------------
// 2) unknown
// - The unknown type is a type-safe counterpart of any.
// - It's the type-safe way to say "this could be anything, so you must perform some type of
//   checking before you use it".
// - "unknown" you can say is a mystery box, there can be anything inside it but you don't know exactly what
//   it is. TS will blocks you from using it until you open the box.
// - And how you open the box, simple you just do a type check like "typeof variable === string", yes that's
//   it, this is the beauty of TS.
// - The rules of unknown is simple:
// a) You can assign anything to it, TS will make a mystery box for you.
// b) you can't use any property or method with the variable, because it's an mystery box and it is
//      protected, you can't attach some property to a box, inside the box whatever there is, will have the
//      property or methods but not box.
// c) you must know the exact dtype to open the box. so, here dtype is the lock on the box and you just have
//      to pass the right dtype as your key. Everytime you do typeof mystery_box === your_key_dtype, a check
//      is done on the lock and if they match the box opened.
// Let's see this with example
// The Dangerous Way (any)
let mysteryItem = "Hello World";
mysteryItem.toUpperCase(); // It works
// mysteryItem.map() // this doesn't works and will throw: mysteryItem.map is not a function
// In both cases a person is guessing the type by calling properties of dtypes which is not safe
// The safe way (unknown)
let mysteryItem2 = "Hello World";
// TypeScript blocks this immediately to protect you:
mysteryItem.toUpperCase(); // Error: 'mysteryItem' is of type 'unknown'.
// Box is locked currently, you can't use any properties even if you know visually that it holds an string.
// how to use it: using type check very simple
if (typeof mysteryItem2 === "string") {
    console.log(mysteryItem2.toUpperCase()); // Now it will work as box is opened now
}
if (typeof mysteryItem2 === "number") {
    console.log(mysteryItem2.toString()); // will not work as key is string not number so box is locked.
}
// Important use case of unknown
// Imagine you fetch data from a server, and you aren't 100% sure what the server sent back.
function processData(data) {
    if (typeof data === "number") {
        console.log(data * 2); //  Allowed: TS knows it is a number
    }
    else if (typeof data === "string") {
        console.log(data.trim()); //  Allowed: TS knows it is a string
    }
    else {
        console.log("Unknown format, cannot process.");
    }
}
processData("game");
processData({ name: "game" });
// - Key difference b/w unknown and any is:
//   a) unknown must be type checked before use
//   b) you can't access properties on an unknown type without type assertion
//   c) You can't call or construct values of type unknown
//-------------------------------------------------------------------------------------------------------
// 3) Never
// - It is the type of datatype which represents values that never exist.
// - It is used to indicate that something never happens or should never happens.
// Common use cases with examples:
// a) Function that never returns
// if a function throws an error or runs an infinite loop, then it never finishes executing which means it
// never reaches the end of function so it's return type we say is "never".
// This function never reaches the end
function throwsError(err) {
    throw new Error(err);
}
// This function runs forever
function runForever() {
    while (true) {
        console.log("Hello!");
    }
}
// b) In Exhaustive Type Checking
// You can use never to ensure you have handled every possible case in a switch statement. If you add a new type later
// but forget to handle it, TypeScript will show an error.
// It is simply is the case when you have user defined datatype using class and you wat to check whether the asked
// user defined dtype exists or not.
// Suppose you are calc area. Right now, you only handle circle and square.
class Circle {
    constructor() {
        this.kind = "circle";
        this.side = 5;
    }
}
class Square {
    constructor() {
        this.kind = "square";
        this.side = 5;
    }
}
function getArea(shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.side ** 2;
        case 'square':
            return shape.side ** 2;
        default:
            // TypeScript knows this should never happen
            // @ts-ignore (Remove it)
            const fallback = shape;
            return fallback;
    }
}
// When to use never:
//
// For functions that will never return a value
// In type guards that should never match
// For exhaustive type checking in switch statements
// In generic types to indicate certain cases are impossible
//-------------------------------------------------------------------------------------------------------
// 4) Void
// In TypeScript, the void data type denotes the complete absence of a return value, making it primarily
// useful as the return type for functions that do not return any data.
// Code Example: Standard Void Function
// When a function only executes a side effect—such as logging data or modifying an external state—you
// should annotate its return type as void
// 1. Defining a function with a void return type
function greeting(name) {
    console.log(name);
}
// 2. Calling the function
greeting("Alice");
// 3. Trying to assign its result will cause a design-time warning
let result = greeting("Bob");
console.log(typeof result); // return undefined
// As Under the Hood: In JavaScript, a function that doesn't explicitly return anything will automatically return
// undefined. TypeScript's void acknowledges this but tells the compiler to treat the output as unassignable.
// so you can't do this in TS
// let result2: undefined = greeting("Shairly"); // throw error: Type 'void' is not assignable to type 'undefined'.
// Key characteristics of void
// -  Declaring a variable as type void is not useful because it can only accept the value undefined
//    (or null if your tsconfig.json has strictNullChecks turned off)
let game;
console.log(game); // Will return undefined only
game = undefined; // It is allowed because as discuss for variable void are undefined only.
// game = null // We can assign null also but strictNullChecks or strict is set true in tsconfig.json
// - Void vs Never: Use void if the function finishes executing but yields no value. Use never if the function never
//   finishes executing normally (e.g., it throws an error or runs an infinite loop)

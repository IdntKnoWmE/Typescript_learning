"use strict";
// TypeScript enhances JavaScript by adding static types.
// The most basic types in TypeScript are called primitives
// They are the building blocks of more complex types in your app.
// TS include al JS primitive type plus some additional type features also.
// The five basic primitive types are:
Object.defineProperty(exports, "__esModule", { value: true });
// 1) Boolean
// Use true/false values only.
let isActive = true;
let isDisabled = false;
//-------------------------------------------------------------------------------------------------------
// 2) Number
// Represents both integers and floating-point numbers.
// TypeScript uses the same number type for all numeric values meaning no seperate dtypes for float, hexadecimal,
// or binary etc.
let decimal = 10;
let hexadecimal = 0xf00d;
let binary = 0b1010;
let octal = 0o774;
let float = 3.12;
//-------------------------------------------------------------------------------------------------------
// 3) String
// Same as JS use single quotes, double quote or backticks template.
let fullName = "John Smith";
let color = "#000000";
let sentence = `His name is ${fullName} and his favourite color is ${color}`;
//-------------------------------------------------------------------------------------------------------
// 4) BigInt
// - Storing Number greater than 2^53 - 1.
// - Used for ultra-large integers, like scientific data or massive cryptocurrency transactions.
// - The condition to declare bigint number is that the last value would be 'n' always.
// - Also if you need to do arithmetic operation with bigint variable with other variable then, the other
//   variable should also be a bigint type variable.
let bigNumber = 9007199254740991n;
// let n: bigint = 10; // Not work
let n = 10n;
console.log(bigNumber);
let ab = 10;
// console.log(bigNumber + ab); // will throw Cannot mix BigInt and other types, use explicit conversions
console.log(bigNumber + n); // this will work
let cd = "I am a bignumber: ";
console.log(cd + bigNumber); // This can work as here we are concatenating not doing arithmetic ops.
//-------------------------------------------------------------------------------------------------------
// 5) null
// This represents an intentional absence of any object value.
// You are explicitly stating: "This box is completely empty on purpose."
let nullName = null;
//-------------------------------------------------------------------------------------------------------
// 6) undefined
// This means a variable has been created, but absolutely nothing has been put inside it yet.
// It’s empty by accident or by default.
let undefinedName = undefined;
//-------------------------------------------------------------------------------------------------------
// 7) Symbol(The Unique key)
// They are the unique and immutable primitive dtypes that are used to create hidden and completely unique object
// properties that can never clash with other.
// Some of the use cases and properties of symbol dtypes:
// a) Every symbol is entirely unique
const key1 = Symbol("id");
const key2 = Symbol("id");
console.log(key1 === key2); // return false why because they have separate and unique memory space.
// b) Using Symbols as Object Keys
// The most common use case for Symbols is to add properties to an object without risking naming collisions.
const idSymbol = Symbol("id");
const user = {
    name: "John Smith",
    [idSymbol]: 123 // ou must use square brackets
};
console.log(user, user[idSymbol], user["name"]); // Even calling is different for them
// c)  They are Hidden from Regular Loops
// Symbols provide a form of data encapsulation. When you put a Symbol key inside an object, it is automatically
// skipped by regular loops and serialization tools:
//  - It does not show up in for...in loops.
//  - It does not show up in Object.keys(user).
//  - It is ignored by JSON.stringify().
const mySym = Symbol("secret");
const obj = { name: "Bob", [mySym]: "hidden data" };
console.log(Object.keys(obj)); // ["name"] (Symbol is missing)
console.log(JSON.stringify(obj)); // '{"name":"Bob"}' (Symbol is missing)
// If you specifically want to see an object's Symbol properties, you must use a dedicated method:
console.log(Object.getOwnPropertySymbols(obj));
// d) Global Symbol Registry
// If you actually want to share a Symbol across different files or parts of your application, you can use
// the global registry via Symbol.for(). This checks if a Symbol with that key already exists; if it does,
// it returns it, otherwise it creates a new one.
// const globalSym1 = Symbol.for("app.config");
//
// // File 2 (returns the exact same symbol)
// const globalSym2 = Symbol.for("app.config");
//
// console.log(globalSym1 === globalSym2); // true
// Why do we need them?
// Third-Party Code Saftey:
//    If you are adding properties to an object that belongs to an external library, using a string key like user.id
//    might overwrite a library property. A Symbol guarantees you won't break anything.
// Built-in JS Hooks (Well-Known Symbols):
//    JavaScript uses internal symbols to let you customize core language behaviors. For example, implementing
//    Symbol.iterator on an object allows you to make it loopable with for...of.

"use strict";
// Array
// - An Array is a flexible list of items that share the same data type
// - Use an array when you do not know how many items you will have, but you want all items to be of
//   the same type. You can freely add or remove items.
Object.defineProperty(exports, "__esModule", { value: true });
// Example:
const names = [];
names.push("Dylan"); // no error
// names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
console.log(names);
// The readonly keyword can prevent arrays from being changed.
const names2 = ["Dylan"];
// names2.push("Raj"); //Error: Property 'push' does not exist on type 'readonly string[]'.
console.log(names2);
// TypeScript can infer the type of an array if it has values.
const numbers = [1, 2, 3]; // inferred to type number[]
numbers.push(4); // no error
// comment line below out to see the successful assignment
//numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
let head = numbers[0]; // no error
console.log(numbers, head);
// You can also define array using Array<type>
let numberArr = [1, 2, 3];
console.log(numberArr);
// similar you can make it readonly also
let numberArr2 = [11, 12, 13];
console.log(numberArr2);

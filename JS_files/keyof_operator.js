"use strict";
// Intro
// The keyof operator in TypeScript takes an object type and produces a string or numeric literal union of its keys.
// When you use keyof, TypeScript extracts the property names of a type to create a new union type.
Object.defineProperty(exports, "__esModule", { value: true });
function example1() {
    // If you used UserKeys
    let userKey = "name"; // This works as values is the key of User
    // let userKey2: UserKeys = "Alice" // This will throw error as "Alice" is not a key of User.
}
console.log("-----------------Example 1-----------------");
example1();
console.log("\n");
//-------------------------------------------------------------------------------------------------------
// Advanced Use Cases
// 1. Constraining Function Arguments (Lookups)
// The most common real-world use case for keyof is ensuring a function only accesses properties that actually exist
// on an object. By combining keyof with generics, you create type-safe property getters.
function example2() {
    function getProperty(obj, key) {
        return obj[key];
    }
    const laptop = {
        brand: "Apple",
        model: "M4",
        RAM: "16gb"
    };
    // let's access known property value from laptop
    console.log(getProperty(laptop, "brand")); // Works fine
    // let's access unknown property from laptop
    // console.log(getProperty(laptop, "price"));
    // Will throw: Argument of type '"price"' is not assignable to parameter of type '"brand" | "model" | "RAM"'.
}
console.log("-----------------Example 2-----------------");
example2();
console.log("\n");
//-----------------------------------------
// 2. Index Signatures (Mapped Types)
// If a type has a string or number index signature, keyof will return those broader types instead of literal strings.
function example3() {
    // Result: string | number (JS objects allow numeric keys as numerics keys are converted into string at the end.)
    let key = "string value"; // This also works
    let key1 = 2; // This will also works
    // String keys are allowed numbers values but numbers only allows numbers
    let key2 = 24; // Works
    // let key3: NumericKeys = "number value"; // Will throw: Type 'string' is not assignable to type 'number'.
}
console.log("-----------------Example 3-----------------");
example3();
console.log("\n");
//-----------------------------------------
// 3. Working with typeof
// If you are working with a real JavaScript object variable rather than a TypeScript type or interface, you
//  must combine keyof with typeof.
function example4() {
    // Let's define a JS object user
    const user = {
        id: 1,
        name: "John",
        age: 24
    };
    let userKey = "name"; // Works perfect as "name" is a key of user obj.
    // let userKey3: userKeyType2 = "name";
    // above will throw error: Type 'string' is not assignable to type '{ id: number; name: string; age: number; }'.
    // why, you can see in error that type userKeyType2 is not a string type that holds only key of user object but
    // now it holds the whole object type { id: number; name: string; age: number; }.
    let user2 = {
        id: 2,
        name: "Johnny",
        age: 24
    }; // This will work fine as typeof user object and user2 object is same.
}
console.log("-----------------Example 4-----------------");
example4();
console.log("\n");
//-------------------------------------------------------------------------------------------------------------
// Difference Between keyof and typeof
// typeof: Converts a JavaScript value/variable into a TypeScript type.
// keyof: Operates on a TypeScript type to extract its keys as a union.



// Intro
// The keyof operator in TypeScript takes an object type and produces a string or numeric literal union of its keys.
// When you use keyof, TypeScript extracts the property names of a type to create a new union type.

function example1() {
    type User = {
        id: number;
        name: string;
        email: string;
    }
    type UserKeys = keyof User // Result: "id" | "name" | "email"

    // If you used UserKeys
    let userKey: UserKeys = "name" // This works as values is the key of User
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
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    const laptop = {
        brand: "Apple",
        model: "M4",
        RAM: "16gb"
    }
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
    type StringMap = {
        [key: string]: boolean;
    }
    type MapKeys = keyof StringMap;
    // Result: string | number (JS objects allow numeric keys as numerics keys are converted into string at the end.)

    let key : MapKeys = "string value"; // This also works
    let key1: MapKeys = 2; // This will also works

    type NumberMap = { [key: number]: string };
    type NumericKeys = keyof NumberMap; // Result: number
    // String keys are allowed numbers values but numbers only allows numbers

    let key2: NumericKeys = 24; // Works
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
    }
    // Now if I want to have a variable which only takes values that are key of object user than obviously
    // I have to write if and else statement for it and may be use some helper function also but to do it with
    // Types we just need combination of keyof and typeof.
    // Let's see how

    // Before, if i have used only keyof which is only used for Types not JS obj like:
    // type userKeyType = keyof user;
    // The above line will throw: 'user' refers to a value, but is being used as a type here.

    // So, for JS object we have to use typeof
    type userKeyType = keyof typeof user;

    let userKey: userKeyType = "name"; // Works perfect as "name" is a key of user obj.
    // let userKey2: userKeyType = "email"; // will throw error as "email" is not a ket of user obj.

    // What happen if we use typeof only(JS question mainly)
    type userKeyType2 = typeof user;

    // let userKey3: userKeyType2 = "name";
    // above will throw error: Type 'string' is not assignable to type '{ id: number; name: string; age: number; }'.

    // why, you can see in error that type userKeyType2 is not a string type that holds only key of user object but
    // now it holds the whole object type { id: number; name: string; age: number; }.

    let user2: userKeyType2 = {
        id: 2,
        name: "Johnny",
        age: 24
    } // This will work fine as typeof user object and user2 object is same.
}
console.log("-----------------Example 4-----------------");
example4();
console.log("\n");

//-------------------------------------------------------------------------------------------------------------

// Difference Between keyof and typeof
// typeof: Converts a JavaScript value/variable into a TypeScript type.
// keyof: Operates on a TypeScript type to extract its keys as a union.








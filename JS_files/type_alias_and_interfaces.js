"use strict";
// Type Aliases (The Nickname)
// - A Type Alias in TypeScript is a custom name (an alias) given to an existing type. You define them using
//   the 'type' keyword, and they help eliminate code repetition while making complex types clean and highly
//   readable.
Object.defineProperty(exports, "__esModule", { value: true });
// - Basic Syntax
//   To create a type alias, write the keyword type, follow it with a capitalized name (by convention),
//   use an equals sign =, and define the shape. Example:
//        type CustomName = TypeDefinition;
// Common Use Cases and Examples
// 1. Primitives (Giving context)
// Aliasing primitive types does not create a new type, but it provides semantic meaning to your data.
function Example1() {
    const userId = "usr_9812";
    const modelYear = 2026; //
}
Example1();
//----------------------------
// 2. Objects
// Instead of repeating inline object structures for variables or function parameters, you can extract them
// into an alias.
function Example2() {
    // Usage
    const admin = {
        id: "01",
        name: "Sarah",
        email: "sarah@example.com"
    };
    function greet(user) {
        console.log(`Hello, ${user.name}`); //
    }
    greet(admin);
}
Example2();
//----------------------------
// 3. Unions (Multiple Allowed Values)
// Type aliases excel at wrapping Union Types (|). This is incredibly useful for capturing exact literal values.
function Example3() {
    let currentStatus = "pending"; // Works fine!
    // currentStatus = "failed"; //  Error: "failed" is not assignable to type Status
}
Example3();
//----------------------------
// 4. Intersections (Combining Types)
// You can use the intersection operator (&) to merge multiple existing type aliases together to create a
// new one.
function Example4() {
    const dev = {
        empId: 123,
        name: "Alex"
    }; // Works fine!
    // const dev2: Employee = { empId: 123 }
    // Will throw error: Property 'name' is missing in type '{ empId: number; }' but required in type 'Person'.
}
Example4();
//----------------------------
// 5. Functions
// You can also alias structural blueprints for function signatures to keep code unified.
function Example5() {
    const add = (x, y) => x + y;
    const multiply = (x, y) => x * y;
    console.log(add(2, 3));
    console.log(multiply(4, 5));
}
let myCar = {
    brand: "Tesla",
    name: "CV4",
    wheels: 5,
    isElectric: true,
}; // It will work
// const User: user = {
//     id:1,
//     name:"jshf",
// } // It will throw error : Type '{ id: number; name: string; }' is missing the following properties from
// type 'user': email, role
// so for no error our User should look like
let User = {
    id: 1,
    name: "jshfj",
    email: "hello@h.com",
    role: "admin"
}; // Now this will work
console.log(User);
const coloredRectangle = {
    height: 20,
    width: 10,
    color: "red"
};
console.log(coloredRectangle);
//-------------------------------------------------------------------------------------------------------
// Compare both
// Type Aliases are More Flexible
// While Interfaces only describe objects, Type Aliases can describe anything.
// You can use a Type Alias for primitives, unions, tuples, or raw values.
// Use interface when you are defining objects, building public APIs, or plan to use object inheritance.
// Use type when you need unions, tuples, or need to alias primitive data types.

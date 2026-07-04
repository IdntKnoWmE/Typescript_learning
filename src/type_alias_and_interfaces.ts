

// Type Aliases (The Nickname)
// - A Type Alias in TypeScript is a custom name (an alias) given to an existing type. You define them using
//   the 'type' keyword, and they help eliminate code repetition while making complex types clean and highly
//   readable.

// - Basic Syntax
//   To create a type alias, write the keyword type, follow it with a capitalized name (by convention),
//   use an equals sign =, and define the shape. Example:
//        type CustomName = TypeDefinition;

// Common Use Cases and Examples
// 1. Primitives (Giving context)
// Aliasing primitive types does not create a new type, but it provides semantic meaning to your data.

function Example1(){
    type ID = string; //
    type Year = number; //

    const userId: ID = "usr_9812";
    const modelYear: Year = 2026; //
}
Example1();

//----------------------------

// 2. Objects
// Instead of repeating inline object structures for variables or function parameters, you can extract them
// into an alias.

function Example2(){
    type User = {
        id: string;
        name: string;
        email: string;
        isAdmin?: boolean; // The '?' means this property is optional
    };

    // Usage
    const admin: User = {
        id: "01",
        name: "Sarah",
        email: "sarah@example.com"
    };

    function greet(user: User) {
        console.log(`Hello, ${user.name}`); //
    }
    greet(admin);
}
Example2();

//----------------------------

// 3. Unions (Multiple Allowed Values)
// Type aliases excel at wrapping Union Types (|). This is incredibly useful for capturing exact literal values.

function Example3(){
    type Status = "pending" | "approved" | "rejected"; //
    type PaymentAmount = string | number;

    let currentStatus: Status = "pending"; // Works fine!
    // currentStatus = "failed"; //  Error: "failed" is not assignable to type Status
}
Example3();

//----------------------------

// 4. Intersections (Combining Types)
// You can use the intersection operator (&) to merge multiple existing type aliases together to create a
// new one.

function Example4(){

    type Person = { name: string };
    type Employee = Person & { empId: number };

    const dev: Employee = {
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
function Example5(){
    type MathOperation = (a: number, b: number) => number; //

    const add: MathOperation = (x,y) => x+y;
    const multiply: MathOperation = (x, y) => x * y;

    console.log(add(2,3));
    console.log(multiply(4,5));
}


//-------------------------------------------------------------------------------------------------------

// Interfaces
// An Interface is specifically used to shape Objects.
// Think of an Interface like a strict architectural blueprint for a house. It says: "Any house built using this
// blueprint must have a door and windows. You can't skip them."
// It is similar to ABC class of python and Interface class of Java

// Example
interface Car{
    brand: string;
    name: string;
    wheels: number;
    isElectric: boolean;
}
let myCar: Car = {
    brand: "Tesla",
    name: "CV4",
    wheels: 5,
    isElectric: true,
}// It will work

// let myCar2: Car = { brand: "Tesla"}
// It will throw Type '{ brand: string; }' is missing the following properties from type 'Car': name,
// wheels, isElectric

// If you forget to add any field to myCar that is mention in Car interface, TypeScript will immediately
// complain that you broke the blueprint's contract.

//-------------------------------------------------------------------------------------------------------

//  Interface Merging
// It is a TS unique feature where compiler automatically combines 2 or more interfaces declared separately
// with the same name into a single and unified Interface.

interface user {
    id: string|number;
    name: string;
}
interface user {
    email: string;
    role: "admin"|"viewer"|"editor"
}

// const User: user = {
//     id:1,
//     name:"jshf",
// } // It will throw error : Type '{ id: number; name: string; }' is missing the following properties from
// type 'user': email, role

// so for no error our User should look like
let User: user = {
    id:1,
    name:"jshfj",
    email:"hello@h.com",
    role:"admin"
} // Now this will work
console.log(User);

// You can also define function in the interface also
interface Employee {
    id:number;
    name: string;
    getTax(salary: number): number; // function getTax with argument salary
}


// You can't do this with Type alias
// type emp = {
//     id:number;
//     name:string;
// }
// type emp = {
//     salary:number;
// } //They both will throw Duplicate identifier 'emp'. error

// Important Rules of Interface Merging
// 1> You cannot change the type of property in a separate declaration of interface.
interface Product { price: number; }
// interface Product { price: string|number; }
// Above line if uncommented will throw error: Subsequent property declarations must have the same type.
// Property 'price' must be of type 'number', but here has type 'string'

// This error indicate that once a filled defined in an interface can only be defined in other interface with
// same name only if the datatype declared for that field is same in both interface. You can't even use union also
// with the type like old_type| new_type, it should always be only old_type.

// 2> For function avoid using different types as it complicates implementation logic.

//-------------------------------------------------------------------------------------------------------

// Interfaces Extending
// Interfaces can extend each other's definition.
// Extending an interface means you are creating a new interface with the same properties as the original,
// plus something new.

interface Rectangle {
    height: number,
    width: number
}

interface ColoredRectangle extends Rectangle {
    color: string
}

const coloredRectangle: ColoredRectangle = {
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


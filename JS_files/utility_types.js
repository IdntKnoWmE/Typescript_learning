"use strict";
// Intro
// - TypeScript comes with a built-in set of global tools called Utility Types.
// - The Analogy: Think of Utility Types like a set of photo filters or editing tools. You already have a
//   great base picture (an existing Type or Interface), but you want to apply a quick filter to change
//   it—like making it black-and-white, cropping a piece out, or making it blur-proof.
// - Instead of writing a brand new type from scratch, utility types let you transform your existing blueprints
//   instantly. Let's look at the most powerful ones you will use every single day.
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Partial<Type>  (The "Everything is Optional" filter)
// Partial takes an existing interface and turns all of its properties into optional properties (adding
// that '?' automatically).
function Example1() {
    // Here if you want to create a object with type UserDetails then:
    // 1. Without partial, you are FORCED to provide all 3 properties
    const user1 = { id: 123, name: "john", email: "abcd@gmail.com", };
    // If you do:
    // const user2: UserDetails = {id: 124}
    // you will get Type '{ id: number; }' is missing the following properties from type 'UserDetails': name, email
    // 2. With partial, every single property becomes optional! so you can provide any number of fields
    const user2 = { id: 124 };
}
console.log("-------------------Example 1-------------------");
Example1();
console.log("\n");
//-------------------------------------------------------------------------------------------------------
// 2. Required<Type> (The "No Exceptions" Filter)
// This does the exact opposite of Partial. It takes an interface that has optional properties (?) and strips
//  those question marks away, making every single property strictly mandatory.
function Example2() {
    // Here if you want to create a object with type UserDetails then:
    // 1. Without Required, only 'id' property is required, rest of the properties are optional
    const user1 = { id: 123 }; // This Works absolutely fine!
    const user2 = { id: 124, name: "Johnny" }; // This also works fine!
    // 2. With Required, every single property of UserDetails is required now.
    const user3 = { id: 124, name: "Johnny", email: "johnny@abc.com" }; // Works fine!
    // const user4: Required<UserDetails> = {id: 124};
    // Above, will throw missing the following properties from type 'Required<UserDetails>': name, email
}
console.log("-------------------Example 2-------------------");
Example2();
console.log("\n");
//-------------------------------------------------------------------------------------------------------
// 3. Readonly<Type> (The "Laminated Paper" Filter)
// Readonly makes all properties of Type unchangeable. Once you create an bject with this utility type, you
//  can read the data, but trying to modify it will throw a TS error.
function Example3() {
    // Without readonly, you can change the value of any field
    const user1 = { id: 123, name: "Jayant", email: "jj@gmail.com" };
    user1.name = "Jayant The Best of the Best"; // Works absolutely fine!
    console.log(user1);
    // With readonly, you cannot change the value of any field now.
    const user2 = { id: 123, name: "Jayant The Billionaire", email: "jj@gmail.com" };
    // user2.email = "abcd@gmail.com" // will throw:  Cannot assign to 'email' because it is a read-only property.
}
console.log("-------------------Example 3-------------------");
Example3();
console.log("\n");
//-------------------------------------------------------------------------------------------------------
// 4. Pick<Type, Keys> (The Cookie Cutter)
// Sometimes you have a massive interface, but you only want to extract a few specific properties from it to
//  make a smaller, slimmer type.
function Example4() {
    // We required only name and price for the customer's receipt checkout page
    // 1. Without Pick, we have to define all the properties or keys of Product either we required them or not.
    const checkout1 = {
        id: 1,
        name: "Condom",
        price: 14,
        description: "",
        units: 10,
    };
    // We can't do
    // const checkout2: Product = { name: "Condom", price: 10 };
    // Will throw error: Missing the following properties from type 'Product': id, description, units.
    // 2. With Pick, we can get the only properties which we mention in Pick utility tag, ignoring rest.
    const checkout2 = {
        name: "Condom",
        price: 14,
    }; // This now works absolutely fine!
}
console.log("-----------------Example 4-----------------");
Example4();
console.log("\n");
//-------------------------------------------------------------------------------------------------------
// 5. Omit<Type, Keys> (The Eraser)
// - Omit is the mirror image of Pick. Instead of choosing what to keep, you choose what to throw away. It copies
//   the entire type except for the keys you explicitly tell it to delete.
// - It doesn't actually deletes the key but it just ignore it from the required keys ;like it makes the key
//   optional in simple term so, if we don't include it TS will not throw error.
function Example5() {
    // Let's for the Product we don't want or say want to strip out the internal description info
    // 1. Without Omit, we have to define the property description with all properties in Product.
    const checkout1 = {
        id: 1,
        name: "Condom",
        price: 14,
        description: "",
        units: 10,
    };
    // 2. With omit,  property description will be ignored
    const checkout2 = {
        id: 1,
        name: "Condom",
        price: 14,
        units: 10,
    };
    // if you try to include 'description' even it is omitted
    // const checkout3: Omit<Product, "description"> = {id:1, name:"Condom", price: 14, description:"", units: 10};
    // It will throw error: Object literal may only specify known properties, and 'description' does not exist in
    //  type 'Omit<Product, "description">'.
    // You can also omit more than 1 field
    const checkout3 = {
        name: "Condom",
        price: 14,
    }; // Works perfectly!
}
console.log("-----------------Example 5-----------------");
Example5();
console.log("\n");
//-------------------------------------------------------------------------------------------------------
// - The ones we covered till now (Partial, Omit, etc.) work specifically on Objects.
// - The next set of highly powerful utility types are used to manipulate Unions, Functions, or to build
//   Key-Value Maps. Let's look at them!
// 1. Record<Keys, Type> (The Grid Maker)
// - Record is used to build an object where you explicitly state what the Keys should be and what Type of values
//   they should hold.
// - You are actually creating a rule that if key is string in an object then it's value should be of string or
//   anytype we want.
function Example6() {
    const nameAgeMap = {
        "John": 23,
        "Jay": 24
    }; // Works perfect as each key is string and their values is number
    // If we assign string value then,
    // const nameAgeMap2: Record<string, number> = { "John": "twenty-four" }
    // then it will throw error: Type 'string' is not assignable to type 'number'.
}
console.log("-----------------Example 6-----------------");
Example6();
console.log("\n");
//-------------------------------------
// 2. Exclude<UnionType, ExcludedMembers> (The Sieve)
// Exclude works on Union types (not objects). It looks through a list of choices and filters out the ones you
// don't want.
// In simple term, imagine a bucket of primary colored balls: Red, Blue, and Yellow. You pass it through a sieve
// that blocks Yellow. You are left with only Red and Blue.
function Example7() {
    // Now ActiveStatuses is exactly: "success" | "error"
    let currStatus = "success"; // Works fine
    // let currentStatus: ActiveStatuses = "pending";
    // Will throw error: Type '"pending"' is not assignable to type '"success" | "error"'.
}
console.log("-----------------Example 7-----------------");
Example7();
console.log("\n");
//-------------------------------------
// 3. Extract<UnionType, MatchType> (The Magnet)
// Extract is the exact opposite of Exclude. Instead of throwing things away, it looks at a Union and pulls out only
//  the choices that match what you're looking for.
function Example8() {
    let currStatus = "success"; // Works fine
    // let currentStatus: ActiveStatuses = "pending";
    // Will throw error: Type '"pending"' is not assignable to type '"success" | "error"'.
}
console.log("-----------------Example 8-----------------");
Example8();
console.log("\n");
//-------------------------------------
// 4. ReturnType<FunctionType> (The Output Extractor)
// - Sometimes you are working with an external library or a complex function written by someone else, and you
//   want to know exactly what data type that function spits out so you can create a variable to hold it.
// - ReturnType extracts the return type of a function for you.
function Example9() {
    function userDetails() {
        return {
            id: 1,
            name: "John",
            email: "John@abc.com"
        };
    }
    // Now you could do anything with this detail like create a new user with type same as return type of
    // userDetails function.
    const user = {
        id: 10,
        name: "Johnny",
        email: "Johnny@abc.com"
    }; // Works fine, no TS error!
    // What if didn't add email
    // const user2: UserDetailReturnType = { id: 123, name: "Johnny" };
    // Will throw error: Property 'email' is missing in type '{ id: number; name: string; }' but required in type
    // '{ id: number; name: string; email: string; }'.
}
console.log("-----------------Example 9-----------------");
Example9();
console.log("\n");
//-------------------------------------------------------------------------------------------------------------

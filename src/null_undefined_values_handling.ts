

// Intro
// - In TypeScript, null and undefined both represent the absence of a value, but they are used in different
//   contexts.
// - The Core difference:
// ~ undefined: Means a variable has been declared, but it has not yet been assigned any value. It is JavaScript's
//   default blank state.
// ~ null: Means a variable is interntionally empty. It is a value you actively assign to a variable to show
//   it currently holds nothing.

// Code Examples
// 1. Default vs. Intentional Empty State

function Example1(){
    // Default empty state
    let tempStorage:string;
    // console.log(tempStorage); // TS will throw error here, Variable 'tempStorage' is used before being assigned.
    // The above error indirectly saying that this variable holds undefined value as it is not been assigned
    // anything.

    // Intentional empty state
    let tempNumber:number | null = null; // Here, intentionally temp number is marked empty so, TS throw no error.
}
console.log("-------------------Example 1-------------------");
Example1();
console.log("\n");

// 2.  Functions and Missing Values
// If a function does not return anything, it returns undefined. If a function argument is optional, its default
// value is undefined.

function Example2(){
    function sayHello(name?:string): void{
        console.log(`Hello ${name}`);
    }
    sayHello(); // It will make function print Hello undefined
    console.log(sayHello()); // Since function is returning nothing, undefined will be printed here.
}
console.log("-------------------Example 2-------------------");
Example2();
console.log("\n");

//---------------------------------------------------------------------------------------------

// Strict Null Checks
// - By default, TypeScript allows you to assign null and undefined to any variable type (like string or number).
//   However, modern TypeScript uses a setting called strictNullChecks: true in the config file.
// - When this is turned on, null and undefined become their own distinct types. You must explicitly tell TypeScript
//   if a variable can hold them using Union Types.

function Example3(){
    // This will throw an error under strict rules
    // let age: number = null; // error: Type 'null' is not assignable to type 'number'.

    // This is correct: it can be a number OR null
    let budget: number | null = null;
    budget = 250; // Valid later
}
console.log("-------------------Example 3-------------------");
Example3();
console.log("\n");

//---------------------------------------------------------------------------------------------

// How to Handle Them Safely
// TypeScript provides built-in tools to prevent your code from crashing when encountering null or undefined.

// 1. Optional Chaining (?.)
// This stops execution if the value before ?. is null or undefined, returning undefined.

function Example4(){
    type User = {
        profile?: {bio: string} | null;
    }
    let user: User = {};

    // 1. Let's call user.profile.bio without '?.'
    // console.log(user.profile.bio);
    // For above code line TS will throw: 'user.profile' is possibly 'null' or 'undefined' and obviously user.profile
    // is undefined so, undefined.bio will give error.

    // 2. Let's call user.profile.bio with '?.'
    console.log(user.profile?.bio); // This works perfectly fine.

    // We can try it for null also
    let user2: User = {profile: null};
    // console.log(user2.profile.bio); Same will throw: 'user2.profile' is possibly 'null' or 'undefined'.
    console.log(user2.profile?.bio); // Works perfectly
}
console.log("-------------------Example 4-------------------");
Example4();
console.log("\n");

//----------------------------------

// 2. Nullish Coalescing (??)
// This operator provides a fallback default value if the expression on the left is either null or undefined.
// It is like a life saver in sensitive codes.

function Example5(){
    let serverResponse: string | null = null;

    let finalResponse = serverResponse ?? "Something went wrong";
    console.log(finalResponse);
    // Since server response is null, '??' triggers the fallback string i.e., "something went wrong"
}
console.log("-----------------Example 5-----------------");
Example5();
console.log("\n");

//----------------------------------

// 3. Null Assertion (!)
// - The Non-Null Assertion Operator is a exclamation mark (!) placed after a variable or property.
// - It tells TypeScript's compiler: "Trust me, this value is definitely not null or undefined right now, so
//   stop showing an error."
// - It does not change runtime behavior. It only silences compile-time warnings.
// - It's like a dangerous way to silence the TS because if the variable or property is null JS will stop the
//   execution.
// - Why it is needed then if it's dangerous?
//   Let's see with example
function Example6(){

    // Suppose we have a function returning either a string or may be null like
    function winLottery(lotteryNumber: number): string | undefined | null{
        const number = Math.floor(Math.random() * 10);
        if (number === lotteryNumber) {return "Hooray! You won"}
        if (number+1 === lotteryNumber) {return null}
    }
    // Since strict mode is enabled in our case or strictNullChecks is enabled, TypeScript stops us from
    // accessing properties on variables that might be empty.
    let win : string | undefined | null = winLottery(5);
    // console.log(win.length); // TS will throw:  'win' is possibly 'null' or 'undefined'.

    try {
        // But if we are certain that we will get a string or we want to bypass TS checks here, we can use
        // not-null assertion:
        console.log(win!.length); // No TS error here now.
    }
    catch (e) {

        console.log((e as Error).message);
    }

    // But still if you run the code there is 90 percent chance you might loose the lottery which will return
    // null and JS will throw the error. That's why Non-null assertion ('!') is always used where you are 100%
    // certain that the value will be not null or undefined.
}
console.log("-----------------Example 6-----------------");
Example6();
console.log("\n");

//---------------------------------------------------------------------------------------------

// Type Compatibility and typeof
// - The JavaScript engine and the TypeScript compiler see these two values differently at runtime.
// - "typeof undefined" returns "undefined". It is a built-in primitive type.
// - "typeof null" returns "object". This is a famous, historical bug in JavaScript that was never fixed to
//    avoid breaking old websites.

function Example7(){
    console.log(typeof undefined); // Output: "undefined"
    console.log(typeof null);      // Output: "object"
}
console.log("-----------------Example 7-----------------");
Example7();
console.log("\n");

//---------------------------------------------------------------------------------------------

// Loose vs. Strict Comparison
// - When comparing the two values, the type of operator you use changes the result.
// - Loose Equality (==): Treats them as equal because they both represent "falsiness" or nothingness.
// - Strict Equality (===): Treats them as different because their underlying types do not match.

function Example8(){
    console.log(null == undefined); // Returns True
    console.log(undefined === null); // returns Fas
}
console.log("-----------------Example 8-----------------");
Example8();
console.log("\n");

//---------------------------------------------------------------------------------------------

// JSON Serialization Behavior
// When you convert a JavaScript object into a JSON string using JSON.stringify(), null and undefined are
// handled completely differently.
// ~ undefined keys are completely deleted from the object.
// ~ null keys are preserved as explicit null values in the JSON.

function Example9(){
    const userSettings = {
        theme: null,        // Explicitly chosen to have no theme
        fontSize: undefined // Forgot to set or omitted
    };
    console.log(JSON.stringify(userSettings));
}
console.log("-----------------Example 9-----------------");
Example9();
console.log("\n");

//---------------------------------------------------------------------------------------------

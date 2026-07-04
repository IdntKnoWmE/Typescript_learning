"use strict";
// In JavaScript, a function is a bit like a mystery box. You can pass it anything, and it might return a number,
// a string, or completely crash your program. TypeScript makes functions predictable.
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Typing Parameters and Return Values
//  When writing a function in TypeScript, you explicitly state:
//  What types of inputs the function accepts.
//  What type of output the function will give back.
function greetUser(name) {
    return `Hello ${name}`;
}
// here, :string inside the parenthesis tells typescripts that name must be string.
// and :string after the parenthesis tells TS that this function promises to return the string only.
// greetUser(42) TS will block you here as 42 is a int not a string
// If no parameter type is defined, TypeScript will default to using any, unless additional type information
// is available.
// function abc(name){console.log(name)}
// Above function will throw warning: Parameter 'name' implicitly has an 'any' type. Since we are using strict mode
// and noEmitOnError the js file will not get generated also.
//-------------------------------------------------------------------------------------------------------
// 2. What if a Function Returns Nothing? (void)
//  Some functions just perform an action but don't return a value (like saving data to a database or
//  printing a message to the console). In TypeScript, a function that returns nothing has a return type of void.
//  The Analogy: Think of a paper shredder. You feed it documents (inputs), it shreds them, but it doesn't give
//  you a new product back. It just does its job and finishes.
function logMessage(msg) {
    console.log(`Log: ${msg}`);
    // No return statement
}
// let log: string = logMessage("Hello") //It will throw error: Type 'void' is not assignable to type 'string'.
//-------------------------------------------------------------------------------------------------------
// 3. Optional and Default Parameters
//  Sometimes, an input is completely optional. We can mark a parameter as optional by adding a question mark (?)
//  right before the colon.
function welcomeMessage(name, title) {
    if (title) {
        return `Welcome ${title} ${name}`;
    }
    else {
        return `Welcome ${name}`;
    }
}
let welcome_mess = welcomeMessage("Sukhinder", "jaat"); // This is valid
console.log(welcome_mess);
welcome_mess = welcomeMessage("Sukhinder"); // Even title is missing still this is valid!
console.log(welcome_mess);
// Also you can give default values to the parameter.
function printSomething(something = "Nothing is here, bitch!") {
    return something;
}
console.log(printSomething("Abra ka daabra")); // This is valid
console.log(printSomething()); // This is also valid since we have assigned default value to param
//-------------------------------------------------------------------------------------------------------
// 4. If no return type is defined
//  If no return type is defined, TypeScript will attempt to infer it through the types of the variables or
//  expressions returned.
function getTime() {
    return new Date().getTime();
}
console.log(getTime());
//-------------------------------------------------------------------------------------------------------
// 5. Named Parameters
// - In TypeScript, true "native" named parameters(keyword argument) do not exist like they do in languages like
//   Python or Dart.
// - Instead, TypeScript implements named parameters by passing a single object as an argument and using object
//   destructuring in the function signature.
// - This approach allows you to call functions with labeled arguments, bypass strict positioning rules, and safely
//   enforce type definitions.
// - The Problem with Positional Parameters:
//   In regular positional functions, you must pass arguments in the exact order they are defined. As your function grows,
//   this becomes dangerous and hard to read:
function createUserBoy(username, age, isAdmin, isActive) { }
createUserBoy("JohnDoe", 30, true, false);
// Implement the function using object destructuring and the type
function CreateUserBabe({ username, age, isActive = true, role = "user" }) {
    console.log(`User: ${username}, Age: ${age}, Is Active: ${isActive}, Role: ${role}`);
}
// Call the function by passing an object (order does not matter)
CreateUserBabe({ age: 42, username: "My bitch", role: "Sex doll" }); // Always a objects will be passed
// - Core Patterns & Variations
// 1) Inline Type Definitions
//    For simple functions where you do not want to declare a separate interface, you can type the destructured
//    object directly inline:
function printCord({ x, y }) {
    console.log(`X: ${x}, Y: ${y}`);
}
printCord({ x: 1, y: 1 }); // Always a objects will be passed as parameter with all parameters inside
function setTheme({ theme = "light", fontStyle = "normal" }) {
    console.log(`Set Browser theme: ${theme} and font style as ${fontStyle}`);
}
// setTheme();
// - Why calling -setTheme() gives error?
//  - The solution is simple when you are passing nothing in the function call even your all parameters are optional
//    the value that reaches the function is undefined but your function ask for object so, when function tries to
//    destructure the undefined values the outcome will be an error simple.
//  - Now what's the solution: The solution is simple if you don't want to pass any argument just pass an empty obj
//    in the func like "setTheme({})" or the best solution is to add = {} to the parameter, means you are telling
//    TS: "if the caller forgets to pass the argument entirely then automatically swap an empty object as the
//    default argument. so, our above function will looks like:
function setTheme2({ theme = "light", fontStyle = "normal" } = {}) {
    console.log(`Set Browser theme: ${theme} and font style as ${fontStyle}`);
}
setTheme2(); // Now you call the function like this without error.
function startTimeout({ url, sec: durationInSeconds }) {
    // You now use 'durationInSeconds' instead of 'sec' inside the body
    console.log(`Redirecting to ${url} in ${durationInSeconds} seconds.`);
}
// Key Advantages:
// 1) Skipping Optional Arguments:
//    With positional parameters, if you want to pass argument #4, you have to pass undefined for
//    arguments #2 and #3. Named parameters allow you to cleanly omit any optional fields.
// 2) Self-Documenting Code:
//    When reviewing pull requests or legacy code, reading sendEmail({ to: "a@b.com", urgent: true }) is
//    substantially easier to understand than sendEmail("a@b.com", true).
// 3) Seamless React Integration: This pattern is identical to how React handles component Props, making it a
//    natural fit for TypeScript developers working in modern web frameworks.
//-------------------------------------------------------------------------------------------------------
// 6) Rest Parameters
//  Rest parameters allow a function to accept an indefinite number of arguments as an array. They are the modern,
//  typesafe successor to JavaScript's old arguments object.
// The Basic SyntaxTo declare a rest parameter, prefix the final argument name with three dots .... In TypeScript,
// you must type this parameter as an array (e.g., type[] or Array<type>).
// The 'numbers' parameter collects all remaining arguments into a real array
function findSum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(findSum(1, 2)); // Returns 3
console.log(findSum(10, 20, 30)); // Returns 60
console.log(findSum()); // Returns 0 (perfectly valid)
// Three Strict Rules for Rest Parameters:
// 1) Must Be Last: A rest parameter must be the absolute last parameter in the function signature.
// 2) Only One Allowed: You cannot have multiple rest parameters in a single function.
// 3) Always an Array Type: The type annotation must explicitly be an array type (string[], any[], etc.) or a tuple.
// function wrong1(...args: string[], finalArg: number){}
// Will throw error:  rest parameter must be last in a parameter list.
// function wrong2(...args1: number[], ...args2: string[]) {}
// Will throw error: A rest parameter must be last in a parameter list so, we can we Cannot have more than
// one rest parameter.
// function wrong3(...args: string){}
// Will throw error: A rest parameter must be of an array type.
//  VALID: Fixed positional arguments can come BEFORE the rest parameter
function greetUsers(greeting, ...names) {
    names.forEach(name => console.log(`${greeting}, ${name}!`));
}
greetUsers("Hello", "Alice", "Bob", "Charlie");
// Advanced TypeScript Patterns with Rest Parameters
// 1) Rest Parameters with Tuples (Strict Arguments)
//  If you want to allow multiple arguments but enforce a strict structure on them, you can type the rest parameter
//  as a Tuple. This is incredibly useful for enforcing specific lengths and mixed types.
// This expects exactly two rest arguments: a string followed by a number
function myFunc(...args) {
    console.log(args);
}
myFunc("abcd", 23); // Works fine
function doExercise(...args) {
    let [plan, time, ...exercise] = args;
    console.log(`For plan: ${plan} time: ${time || 60} days do exercises: ${exercise.join(", ") || "pushup, situps"}`);
}
doExercise("Muscle Lean"); // This will work
doExercise("Muscle Gain", 200); // This will also work
doExercise("Weight loss", 200, "Cardio", "Skipping"); // This will also work!
// In this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`.
const negateFunc = (value) => value * -1;
console.log(negateFunc(3434));



// Intro

// - Sometimes in programming, you run into a situation where you know more about the data type than TypeScript
//   does.

// - The Analogy: Imagine you receive a wrapped gift box. TypeScript looks at it and says, "That is just a
//   generic box. I don't know what's inside, so I won't let you open it or play with it." But you know for a
//   fact that your friend wrapped a Drone inside that box. Casting is you telling TypeScript: "Trust me, I
//   know exactly what this is. Treat this box as a Drone."

// - Casting allows you to override TypeScript's inferred type and explicitly force it to treat a variable as a
//   different type.

// - There are two ways to perform casting in TypeScript:

// 1) Using the as Keyword (Most Common)
// - The most popular and readable way to cast is by using the as keyword right after the variable.

// Imagine we get data from a network API that returns a type of 'unknown'
let randomData: unknown = "Hello world";

// Now, TypeScript won't let us use string methods like .length on 'unknown' data.
// let size = randomData.length; //  It will throw error: 'randomData' is of type 'unknown'.

// If we cast it 'as string' because we are 100% sure it's text then we can use any string method on it and TS
// will not throw or show error.
let size = (randomData as string).length; // It will work!

// 2) Using the Angle-Bracket Syntax < >
// This does the exact same thing under the hood, but uses angle brackets before the variable.

let randomData2: unknown = "Hello world";
let size2 = (<string>randomData2).length;

// The as syntax is generally preferred because < > casting can get confused with JSX/TSX syntax when you build web
// applications using frameworks like React.

// 3) Force casting
// To override type errors that TypeScript may throw when casting, first cast to unknown, then to the target type.

let x = "hello";
// let y = x as number; // Will throw error: Conversion of type 'string' to type 'number' may be a mistake because
// neither type sufficiently overlaps with the other.

let y = (x as unknown) as number; // This will work.
console.log(++y); // y is not actually a number so this will return NaN

// A Crucial Warning: Casting Doesn't Change the Reality (main concept)
// Casting is purely a compile-time trick. It tells the TypeScript compiler to stop complaining, but it does not
// alter the actual data at runtime.
// If you lie to TypeScript:

let myNumber = 32;
let myText = (myNumber as unknown) as string;
console.log(myText, myText.length); // myText is not actually a string so myText.length will return undefined.
// Through forced casting or casting you can make Typescript believes you but when the code actually runs in
// the browser, it is still a regular number 42. If you try to call string operations on it like (myText.length),
// your program will crash. Use casting only when you are absolutely certain of the true data type!
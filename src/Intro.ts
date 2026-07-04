
// TypeScript is JavaScript with added syntax for types.
// It's just a superset of JavaScript.

// What is it?
// -> TypeScript is a syntactic superset of JavaScript which adds static typing.
// -> It adds syntax on top of JavaScript so, devs can add types on their variables.


// The Problem: JavaScript is a wild canvas
// - JavaScript is a loosely typed language.
// - It can be very diff to understand what types of data are being passed around in JS.
// - As You can pass the string as a return for a func that calc the area of the shape and JS will allow it.
// - Due to this Devs has to look at documentation or guess what will be type based on the implementation.


// The Solution: Hail TypeScript
// - TS is just putting a smart, automated assistant over JS.
// - It's like sorter which tells you : "hey you can't put that thing in here!", so if you are returning string
//   from a function which calc area of shape, TS will not allow it.

// The Catch: Browser doesn't know TS
// - Yes, you heard it right browser doesn't know TS, it only understands JS.
// - So, TS has to go through a process called Compilation or transpilation where,
//   1) You write a TS (.ts files).
//   2) you run it through a TS compiler or a translator.
//   3) It strips away all the type-checking rules and hands you clean, standard JS that browser can run.

// Installation and Running
// - Install TS locally using: "npm install typescript --save-dev" (It will all dependency in node modules folder
//   in your current folder).
// - Install TS globally using: "npm install -g typescript"
// - To compile your TS code use: "npx tsc TS_filename", here "tsc" is typescript compiler.
// - The compile command will generate a hello.js file in the same directory, and then you can run the generated
//   JS file using: "node JS_filename".
// - Now everytime you write anything in typescript you have to run "npx tsc TS_filename" to convert the file into JS
//   file, and then you can run your JS to check the output. Instead what you can do is open a separate terminal and
//   run "npx tsc TS_filename --watch", now this command will continuously convert the TS file content into JS file
//   content so, you just have to run "node JS_filename" in another terminal bypassing the while TS to JS command running.







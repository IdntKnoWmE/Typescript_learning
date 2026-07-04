

// A tuple is a typed array with a pre-defined length and types for each index.
// Tuples are great because they allow each element in the array to be a known type of value.

// To define a tuple, specify the type of each element in the array:
let tuple : [number, string, boolean];

tuple = [5, "loda", false];
console.log(tuple);

// As you can see we have a number, boolean and a string.
//
// But what happens if we try to set them in the wrong order:
// tuple = ["loda", 5, false] // throws error as order of value is important for tuples
// console.log(tuple);

// Add more elements in tuple
tuple.push("gandu");
console.log(tuple);

// console.log(tuple[3]); // throw Tuple type '[number, string, boolean]' of length '3' has no element at index '3'.
// We see If you use .push() on a TypeScript tuple, TypeScript will allow it at runtime,
// but it restricts how you can access those extra elements.

// If you want to absolutely block .push() and make your tuple completely unchangeable, use the readonly keyword:
let strictTuple: readonly [number, string, boolean];

strictTuple = [5, "loda", false];
console.log(strictTuple);

// strictTuple.push("gandu"); // Will throw: Property 'push' does not exist on type 'readonly [number, string, boolean]'.


//  Named Tuples
// Named tuples allow us to provide context for our values at each index.
const graph: [x: number, y: number] = [55, 27.5]

// Unpack or destructures the values into variables named x and y
const [x_cord, y_cord] = graph;
console.log( `x_cord: ${x_cord}, y_cord: ${y_cord}`);
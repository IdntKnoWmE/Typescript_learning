

// Combining Types (Unions & Intersections)

// TypeScript lets us combine types using logical operators, just like mixing ingredients.


// 1. Union Types (The "OR" Operator)

// A Union allows a variable to be one of multiple different types. We use the pipe symbol (|) to separate them.

// The Analogy: Think of a vending machine that accepts payment. It will accept Cash OR a Card. Either one is
// perfectly valid.

let paymentMethod: string | number;

paymentMethod = "Credit Card"; // Valid!
paymentMethod = 12345;         // Valid (e.g., transaction ID)!
// paymentMethod = true;          // ❌ ERROR! Must be a string or a number.
console.log(paymentMethod);


// Issue with Union
function printStatusCode(status: number|number) {
    // console.log(`My status code is ${status.toUpperCase()}.`)
}
// here even though our status is a type string but still we have error "Property 'toUpperCase' does not exist on
// type 'number'", Because the status might be a number also so, that's why TS avoid use of methods for strings and
// number both initially. But after value assigning you can use them as then TS knows what is in the variable.


//-------------------------------------------------------------------------------------------------------

// 2. Intersection Types (The "AND" Operator)

// An Intersection combines multiple types into one super type.
// It forces an object to satisfy all the conditions. We use the ampersand symbol (&).

// The Analogy: Imagine an Employee identity. To be a "Manager," you must have the qualities of a Staff Member
// AND the qualities of a Leader. You can't just be one; you must be both at the same time.

// Example:

interface Worker {
    employeeId: number;
}

interface Manager {
    teamSize: number;
}

// Combining them into an Intersection
type TeamLead = Worker & Manager;

let lead: TeamLead = {
    employeeId: 589,
    teamSize: 12 // You MUST provide both properties!
};

// let lead1:TeamLead = {
//     employeeId: 600
// } // Will throw error as teamSize is missing

console.log(lead);
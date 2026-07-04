
// TypeScript has a specific syntax for typing objects.

const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};

console.log(car);

// here assigning other dtype value to object key will throw error
// car.type = 23; // Will throw: Type 'number' is not assignable to type 'string'.

// But if we don't change the dtype the values get updated
car.type = "Cruise";
console.log(car);

// TypeScript can aslo infer the types of properties based on their initial values.

const carCompany = {
    name: "Toyota",
    networth: 1000000000
};
console.log(carCompany);

// If we reassign the values
carCompany.name = "Ford"; // Works! no error
// carCompany.name = 2; // Error: Type 'number' is not assignable to type 'string'.

console.log(carCompany);

// Now there can be a seen where we might missed some properties that are defined in types like:

let bike: { name: string; type: string; cost: number }

// bike = {
//     name: "harley",
//     type: "Cruiser" }
// Here it will throw Property 'cost' is missing in type '{ name: string; type: string; }' but required in
// type '{ name: string; type: string; cost: number; }'.

// If we add '?' before the property that is optional we can avoid this error

let bike2: { name: string; type?: string; cost?: number }

bike2 = {
    name: "harley"
} // This will work fine
console.log(bike2);

bike2 = {
    name: "Harley",
    type: "Cruize",
} // This also works
console.log(bike2);

bike2 = {
    name: "Harley",
    type: "Cruize",
    cost: 1500000
} // This also works
console.log(bike2);


// If in future suppose new key|properties are added to object then obviously it will throw error since in dtypes
// declaration we don't have that key|properties like:

let userData: {name:string} = {
    name: "Harley",
}
// Adding new property|key
// userData.email = "harley@email.com" // It will throw: Property 'email' does not exist on type '{ name: string; }'

// To handle such scenarios where we are not sure about the keys and their types we use this trick.

type addressType = {[key: string]: string|number|undefined} // You can define your own types also using "type".

let userData2: {[key: string]: string|number|addressType|string[]|undefined} = {}

// Now here we can add any property with type string to userData2 but with with values be string or number or
// object or array of string or undefined.

// lets test it
userData2.name = "Harley";
userData2.gender = "male";
userData2.age = 5;
userData2.address = {
    house_number: 12212,
    city: "Delhi",
    state: "Delhi",
    //country: ["Canada","India"] // will throw error as it doesn't follow addressType
}
userData2.citizenships = ["India", "Canada"]
userData2.wife = undefined;

//userData2.kidsAge = [5, 10, 15]; // This will throw error: Type 'number[]' is not assignable to type
// 'string | number | address | string[] | undefined'.

console.log(userData2); // Everything works
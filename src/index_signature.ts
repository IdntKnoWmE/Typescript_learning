

// Intro
// - Up until now, whenever we created an object or an interface, we knew the exact names of the keys ahead of time
//   (like name, age, or brand).
// - But what happens when we don't know the names of the keys in advance what type they are, how many they are etc.
// - Here, index signature allows us to define the type of keys an object can have and the type of values those
//   keys must return, without knowing the specific key names beforehand.

// Syntax:
// To create an index signature, we use a special syntax inside square brackets [key: type] to represent the
//  dynamic property name.

function Example1() {
    interface CompensationData {
        [empName: string]: number;
        // Index Signature: The key name can be anything (as a string), but the value must be number.
    }
    let data: CompensationData = {
        "Hari": 5000000,
        "Alice": 120000,
        "Bobby": 120000,
    }
    // You can dynamically add new entries smoothly:
    data["Charlie"] = 105000; // Valid!
    // data["Ram"] = "One million dollars"; // Will throw error: Type 'string' is not assignable to type 'number'.

    // Note: The word employeeName inside the bracket is just a placeholder name for readability. You can name
    // it key, id, or anything you like.

    interface CompensationData1 {
      [key: string]: number; // You can give any name just its type should be string and value should be number
    }
    let salaryData: CompensationData1 = {}
    salaryData["Hari"] = 10000; // Works Well!
}
console.log("-------------------Example 1-------------------");
Example1();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Mixing Fixed Keys with Index Signatures
// You can mix explicit, mandatory keys with an index signature, but there is one strict rule: all the dynamic
//  properties must match the type of the index signature.

function Example2() {

    // Case 1: if we mix mandatory key(companyName) with value type 'string' with explicit index signature key
    // empName with value tye number.
    // interface CompensationData { companyName: string, [empName: string]: number;}
    // The above will throw error: Property 'companyName' of type 'string' is not assignable to 'string' index
    // type 'number'. In simple words when you define [empName: string]: number, you tell TS that every single
    // property in this interface that has a string key must have a number value but your mandatory key companyName
    // has a string value which conflicts with index signature.

    // Any key you will mention with value not number will give error.

    // Case 2: the solution to mix keys:

    // Option 1: Use a Union Type for the Index Signature
    interface CompensationData {
        companyName: string;
        [empName: string]: number | string; // Accepts both types
    }

    // OR

    // Option 2: Separate the Metadata from Employee Data (Recommended)
    interface CompensationData2 {
        companyName: string;
        empCount: number;
        employees:{
            [key: string]: number;  // Clean, isolated index signature
        }
    }
}
console.log("-----------------Example 2-----------------");
Example2();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Readonly Index Signatures
// If you want to prevent people from dynamically adding or changing keys in your object after it's created,
//  you can slap the 'readonly' keyword right in front of the index signature.

function Example3() {
    interface CompensationData {
        readonly [empName: string]: number;
    }
    let salaryData: CompensationData = {
        "Hari": 1000000,
    }
    console.log(salaryData["Hari"]); // Works well!
    // salaryData["Hari"] = 10000; // Will throw error: Index signature in type 'CompensationData' only permits reading.
}
console.log("-----------------Example 3-----------------");
Example3();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Best Practices
// Do:
//      Use index signatures for collections with dynamic keys
//      Combine with explicit properties for known fields
//      Keep value types specific (avoid any)
//      Use readonly when mutation isn't needed
// Don't:
//      Prefer fixed interfaces when keys are known
//      Forget that all properties must conform to the index signature type
//      Reinvent mapped types-use the dedicated page for transformations

//-------------------------------------------------------------------------------------------------------

// Index Signatures vs. Record<K, T>
// - On the surface, an Index Signature and a Record<Keys, Type> do the exact same job: they both define an object
//   with dynamic keys and a fixed value type.
// - However, under the hood, there is a massive architectural difference between them. It all comes down to open
//   lists versus closed lists.

// - The Core Difference: Open vs. Closed

// 1) Index Signatures are "Open-Ended"
// - When you write an Index Signature, you are saying the keys can be absolutely any string in existence. There
//   is no limit. It is completely open.
// - In simple language you can name key to any string(ab,snfh,ebfj anything) and TS will not throw error.

// 2) Record<Keys, Type> can be "Closed and Specific"
// - While Record can also behave like Index signature and can take any string as its key but it's real power
//   is that you can lock down the keys to a very specific set of custom types.
// - But Index Signature will throw you if you try to assign a custom types to keys type but you can assign
//   values to specific custom types also.

function Example4() {
    // let's define a custom type
    type AllowedPlatforms = "ios" | "android" | "web";

    // let's use this in our index signature
    interface CompensationData {
        // [key: AllowedPlatforms]: AllowedPlatforms;
        // will throw: ure parameter type cannot be a literal type or generic type. Consider using a mapped object
        // type instead.
        [key: string]: AllowedPlatforms;
        // This confirms Keys cannot be custom types in index signatures but values can be.

    }
    let salaryData: CompensationData = {
        // "Hari": 1000000, // will throw: Type 'number' is not assignable to type 'AllowedPlatforms'.
        "Hari": "ios",
        12: "android", // This also works as value is in AllowedPlatforms and 12 will be converted to string
    }
    console.log(salaryData);

    // let's test custom types with Record keys and value
    const randomRecord: Record<AllowedPlatforms, AllowedPlatforms> = {
        ios: "android",
        android: "web",
        web: "android",
    }
    // If you change the value of any key to value that is not available in custom type AllowedPlatforms
    // randomRecord["ios"] = "abcd" // will throw: Type '"abcd"' is not assignable to type 'AllowedPlatforms'.

    // If you try add the key that is not available in custom type AllowedPlatforms
    // randomRecord["abcd"] = "ios" // Will throw: Property 'abcd' does not exist on type 'Record<AllowedPlatforms,
    // AllowedPlatforms>'.

    // let's test Record open-Ended behavior
    const randomRecord1: Record<string, number> = {}

    // Now you assign any key to randomRecord1 only value should be number
    randomRecord1["Hari"] = 10000; // Works!
    randomRecord1["Alice"] = 10000; // Works!

    randomRecord1[12] = 120000 // This also works as value is number and 12 will be converted to string
    // randomRecord1["Bobby"] = true; // This will fail: Type 'boolean' is not assignable to type 'number'.
    console.log(randomRecord1);
}
// As a conclusion we can say Record is similar to index signature but with some special powers.
console.log("-----------------Example 4-----------------");
Example4();
console.log("\n");


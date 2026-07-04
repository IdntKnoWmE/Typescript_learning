
// Intro
// - Generics are a tool in TS that let you create reusable code.
// - They helps us to write a func, interface, or class that works with different data types like string, number
//   etc., while keeping strict type safety.
// - In normal cases in TS when we describe a func, class or interface we have to write the type
//   name also like: "function do_something(arg : numbers): string", here, we are mentioning numbers type for
//   argument and string for return of function, we are actually assigning a strict rule here of type number or
//   string.
//   If we have to gave them other types then we have to define the new function or we have redefine the
//   function with new types or we have to use "|" pipe operator.
// - And if we want our function to accept ant data types, then we might have to use 'any'. However using 'any'
//   completely disables TypeScript's type checking.
//   Example:

function Example1() {
    function print(arg: any): any {
        return arg;
    }
    // TypeScript does not know 'result' is a string.
    // It treats it as 'any', so you lose auto-complete and safety.
    const result = print("Hello");
}
console.log("-------------------Example 1-------------------");
Example1();
console.log("\n");

// - Then, what's the best solution for it, yes I know that is Generics.
// - How Generics works is simple you just create a variable for Type also, yes it's correct you just have to
//   create a variable for Types using an angle bracket syntax (<T>). In simple words this syntax introduce
//   a parameter for our Type.
// - In this angle bracket syntax (<T>) you must be thinking what is 'T' here, this T is actually our Type variable.
// Example:
function Example2() {
    function print<T>(arg: T): T{
        return arg;
    }
}
console.log("-------------------Example 2-------------------");
Example2();
console.log("\n");

// - Here, how it works:
//   - <T> captures the Type user provides like number, string etc.
//   - (arg: T) ensures the input argument is of exact Type that user provides.
//   - : T ensures the function returns that exact Type user provides.
// - Since T is a Type variable, we can use it anywhere we want in function definition or func body.

// - Let's see how to Call a Generic Function:
// - There are two ways either you explicitly pass the Type or let TS figure it out automatically.
// Example:

function Example3() {

    function print<T>(arg: T): T{
        console.log(typeof arg);
        return arg;
    }
    // Approach 1: Explicitly defining the type
    const op1 = print<string>("Hello");

    // Approach 2: Type Inference (TypeScript detects it is a number)
    const op2 = print(123);
}
console.log("-------------------Example 3-------------------");
Example3();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Multi-Type Generics
// - You are not limited to just one type parameter. You can use multiple parameters separated by commas,
//   often named T, U, or V or any character you like (I would use J or S).
// Example:
function Example4() {
    function makePair<J,S>(first: J, second: S): [J, S]{
        return [first, second];
    }
    console.log(makePair<string, string>("Jayant", "Sharma")); // see it's simple as fck
}
console.log("-------------------Example 4-------------------");
Example4();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Generic Interfaces
// You can apply generics to interfaces to make your data structures flexible.
// Example:
function Example5() {

    interface Box<T>{
        content: T;
    }
    // A box containing a string
    const stringBox: Box<string> = { content: "Safe" };

    // A box containing a number
    const numberBox: Box<number> = { content: 42 };
}
console.log("-------------------Example 5-------------------");
Example5();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Generic Classes
// Classes can also use generics to handle dynamic property and method types.
// Example:
function Example6() {
    class Array<T>{
        private _contents: T[] = [];
        public _length: number = this._contents.length;

        add(value: T): void { this._contents.push(value) }
        get length(): number { return this._contents.length }
        get contents(): T[] { return this._contents }
    }
    // Now you can create the array of any Type
    const number_arr = new Array<number>();
    number_arr.add(12);
    console.log(number_arr.length, number_arr.contents);

    const string_arr = new Array<string>();
    string_arr.add("BKL");
    console.log(string_arr.length, string_arr.contents);

    // Now, if you do:
    // string_arr.add(123);
    // TS will throw: Argument of type 'number' is not assignable to parameter of type 'string'.
}
console.log("-------------------Example 6-------------------");
Example6();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Generic Constraints (extends)
// - Generic constraints allow you to limit the types that a generic parameter can accept. By default, a generic
//   parameter like <T> can be absolutely anything: a number, a string, an object, or even null.
// - By using the extends keyword, you force the generic type to meet specific conditions, ensuring safety when
//   accessing properties inside your function.

// 1. Constraining to an Object Structure
// - If you want to access a specific property on an argument, TypeScript will throw an error unless you guarantee
//   that property exists. You do this by making the generic extend an interface or type.

function Example7() {

    interface User{
        id: number;
    }
    // T MUST be an object that has at least an 'id' property
    function userUpdate<T extends User>(obj: T): string{
        return `User updated successfully for user ${obj.id}`;
    }

    // userUpdate({name: "John"}); this will throw error as property 'id' in not in the object
    userUpdate({id:123, name: "John"});
}
console.log("-------------------Example 7-------------------");
Example7();
// From the above example we can say this Generic Constraints also helps in validations.
console.log("\n");

//--------------------------------

// 2. Using multiple properties in a constraint
// Your constraint can enforce multiple properties or types at the same time.

function Example8() {
    interface dimension{
        vertical: number;
        horizontal: number;
    }
    function calcArea<T extends dimension>(shape: T): number{
        return shape["vertical"] * shape["horizontal"];
    }
    const table = {vertical: 24, horizontal: 4, color: "blue"};
    console.log(calcArea(table)); // Works: 'table' has both vertical and horizontal properties

    // but if we used the onj with one or no property that is in dimension we will get error
    const bed = {vertical: 4, color: "red"};
    // console.log(calcArea(bed)); // Will throw error
}
console.log("-------------------Example 8-------------------");
Example8();
console.log("\n");

//--------------------------------

// 3. Constraining to Primitive Types
// You can restrict a generic to only accept specific primitive types, like a string or a number, by using
// a union type in the constraint.

function Example9() {

    // T can only be a string or a number
    function formatInput<T extends string | number>(input: T) : string{
        return `Value: ${input.toString()}`;
    }

    formatInput("Hello"); // Works! as it's an string
    formatInput("24"); // Works! as it's an number
    // formatInput([123, 23]);
    // Throw error: Argument of type 'number[]' is not assignable to parameter of type 'string | number'.

    // formatInput(true);
    // Same error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
}
console.log("-------------------Example 9-------------------");
Example9();
console.log("\n");

//--------------------------------

// 4. The keyof Constraint (Advanced)
// - A powerful use case for generic constraints is ensuring that one argument is a valid key of another object.
// - This uses extends keyof.

function Example10() {
    interface User{
        id: number;
        name: string;
    }
    function getProperty<T extends User, S extends keyof T>(user: T, key: S){
        return user[key];
    }

    const user1 = {id: 123, name: "John", age: 44};
    console.log(getProperty(user1, "name")); // Works! as name is in user1 object
    //getProperty(user1, "address"); // Will throw error as address is not available in user1 obj.
}
console.log("-------------------Example 10-------------------");
Example10();
// As you can see how much useful this concept is in the above examples.
console.log("\n");


//--------------------------------

// 5. Classes with constraints
// You can also apply constraints to generic classes to restrict what data types the class can manage.

function Example11() {
    interface Identifiable {
        id: number;
    }
    class Registry<J extends Identifiable>{
        private _ids: J[] = [];
        add(item: J){ this._ids.push(item); }
        get ids(): J[] { return this._ids }
        find(id: number): J | undefined{
            return this._ids.find(item => item.id === id);
        }
    }

    const registry = new Registry();
    registry.add({id: 123}); // Works! well

    const obj = {id: 123, name: "John"};

    // Let me show you something crazy
    registry.add(obj); // This Works!
    // registry.add({id: 124, name: "Johnny"}); // But this doesn't works 😂

    // Why?
    // - This is not a failure of the generic constraint. This is a special safety feature in TypeScript called
    //   "Excess Property Checking".
    // - So, when you are directly passing an object literal into a function call, TS assumes that you might be
    //   making a typo or passing data that will be immediately lost (since the Registry only guarantees it
    //   cares about 'id'). To prevent bugs, it blocks object literals from having extra properties.
    // - It's like totally crazy TS acts as a father and telling first count the money before directly giving
    //   to someone even you know that how much you have 😂
}
console.log("-------------------Example 11-------------------");
Example11();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Default Values in Generics
// Just like function arguments, you can provide a default type for a generic if no type is explicitly passed
// or inferred.

function Example12() {

    interface Response<T = String>{
        status: number;
        data: T;
    }
    const response: Response = { status: 200, data: "Success"}; // This works as T by default is string
    // const response2: Response = {status: 201, data: 123} // this will not as data here is number but our
    // default is string, we can make it work by:
    const response2: Response<number> = { status: 124, data: 233 } // Just add Type variable value in Response Type.

}
console.log("-------------------Example 12-------------------");
Example12();
console.log("\n");
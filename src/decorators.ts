

// Intro
// - A decorator is just a plain JavaScript function that acts like a wrapper or a modifier.
// - Think of it like a phone case. The phone still functions, but the case adds a kickstand or a card holder.
// - In TypeScript, you apply a decorator using the @ symbol right above a class, method, property, or accessor.

//-------------------------------------------------------------------------------------------------------

// Enabling Decorators
// Because Decorators are an advanced, experimental feature in JavaScript/TypeScript, you have to tell TypeScript
// it's okay to use them. In your project's configuration file (tsconfig.json), you must ensure this setting
// is enabled:

//     {
//         "compilerOptions": {
//              "experimentalDecorators": true
//          }
//     }

// But if you have TS 5.0+ and if you are writing new code using standard JavaScript decorators, you don't need
// the above configuration.
// TypeScript 5.0 introduced out-of-the-box support for the official Stage 3 ECMAScript decorator standard,
// which is enabled by default without any compiler flags.


//-------------------------------------------------------------------------------------------------------

// Types of Decorators
// TypeScript supports several types of decorators that can be applied to different declarations:

// 1. Class Decorator
// - A TypeScript class decorator is a specific function that intercepts the class declaration, allowing you to modify,
//   augment, or replace a class definition at runtime.
// - In TypeScript, decorators execute only once when the class is defined, not when you create new instances.

// - A class decorator function receives exactly one parameter:
//      constructor: The constructor function (the class itself) being decorated.

// Examples

function basic_class_decorator_example(){
    // This simple decorator logs when a class is defined:
    // A simple class decorator that logs class definition

    function logClass(constructor:Function){
        console.log(`Class ${constructor.name} was defined at ${new Date().toISOString()}`);
    }

    // Applying the decorator
    @logClass
    class UserService{
        getUsers(): string[]{
            return ['Alice', 'Bob', 'Charlie'];
        }
    }

    const userService = new UserService();
    console.log(userService.getUsers());
}
console.log("-------------------Example 1-------------------");
basic_class_decorator_example();
console.log("\n");

//---------------------------

function freeze_class_decorator_example(){

    // Define the decorator function
    function Freeze(constructor:Function){
        // Let's freezes the static side of the class.
        // It blocks changes to class-level methods and properties (e.g., UserSession.config).
        Object.freeze(constructor);

        // Now, Let's freezes the instance side of the class.
        // It blocks changes to shared instance methods (e.g., userInstance.logout()).
        Object.freeze(constructor.prototype);
    }

    // Apply the decorator using the @ symbol
    @Freeze
    class UserSession{
        constructor(public name: string,) {}
    }

    // Testing the decorator behavior
    const session = new UserSession("Jazz");

    try{
        // This will throw a runtime error because the prototype is frozen
        (UserSession.prototype as any).logout = function() { console.log("Logout"); };
    } catch (error) {
        console.log("Error: Class is frozen and cannot be modified.");
    }

    // Here, above if you have used:
    // UserSession.prototype.logout = function() {};
    // TS will throw: Property 'logout' does not exist on type 'UserSession'.
    // This is because TS looks at your class definition, and sees that logout was never declared inside the class,
    // and prevents you from randomly adding properties to the prototype. It assumes this is a typo or a bug.
    // By casting the prototype to any, you temporarily turn off type checking for that specific operation.
}
console.log("-------------------Example 2-------------------");
freeze_class_decorator_example();
console.log("\n");

//---------------------------

function class_modification_decorator_example(){
    // This example shows how to modify a class by adding properties and methods:
    // Define the factory that accepts arguments
    function AddMetadata(metadata: { version: string, env: string }) {
        // Return the actual class decorator
        return function(constructor:Function){
            constructor.prototype.version = metadata.version;
            constructor.prototype.env = metadata.env;
        }
    }
    // Apply the decorator factory with custom options
    @AddMetadata({version: "1.0", env: "dev"})
    class ApiService {}

    const apiService = new ApiService();
    console.log((apiService as any).version); // This works only if we bypass TS check using any.
    console.log(((apiService as any).env));
}
console.log("-------------------Example 3-------------------");
class_modification_decorator_example();
console.log("\n");

//---------------------------

function multiple_decorator_on_class_example(){

    // First Decorator Factory
    function logClass(message:string){
        console.log(`Evaluating logClass with: ${message}`);
        return function(constructor:Function){}
    }

    // Second Decorator Factory
    // This sealed decorator prevents new properties from being added to a class and marks all existing properties as
    // non-configurable.
    function sealed(constructor:Function){
        console.log(`Sealing ${constructor.name}...`);
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }

    // Applying multiple decorators
    @logClass("User Managed")
    @sealed
    class User{
        constructor(public name: string) {}
    }

    const user = new User("Ronny"); // Works Well!
    try{
        (User as any).logout = function (){ console.log("Logout");}
        // Above will throw error: Cannot add property newMethod
    }
    catch(error: any){
        console.log(error.message);
    }
}
console.log("-------------------Example 4-------------------");
multiple_decorator_on_class_example();
console.log("\n");

// Key Points About Class Decorators
// Class decorators are called when the class is declared, not when instances are created
// They receive the class constructor as their only parameter
// They can return a new constructor function to replace the original class
// They are executed bottom-up (the innermost decorator runs first)
// They can be used for logging, sealing, freezing, or adding metadata

//-------------------------------------------------------------------------------------------------------


// 2. Method Decorators
// - Method decorators are applied to method definitions and can be used to observe, modify, or replace
//   method definitions.
// - They receive three parameters:
//   ~ target: The prototype of the class (for instance methods) or the constructor function (for static methods)
//   ~ propertyKey: The name of the method
//   ~ descriptor: The property descriptor for the method
// - Syntax:

function method_decorator_syntax(){
    // syntax
    function DecoratorName(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        return descriptor;
    }

    class Something {
        @DecoratorName
        print(val:string){
            console.log(`Hello World!`);
        }
    }
}
console.log("-----------------Example 5-------------------");
method_decorator_syntax();
console.log("\n");

// Examples:

function method_timing_decorator(){

    // Method decorator to measure execution time
    function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const end = performance.now();

            console.log(`${propertyKey} executed in ${(end - start).toFixed(2)}ms`);
            return result;
        };
        return descriptor;
    }

    class DataProcessing{

        @measureTime
        processData(data: number[]): number[] {
            // Simulate processing time
            for (let i = 0; i < 100000000; i++) { /* processing */ }
            return data.map(x => x * 2);
        }
    }

    const dataProcessing = new DataProcessing();
    console.log(dataProcessing.processData([2,2,5,7,6]));
}
console.log("-----------------Example 6-----------------");
method_timing_decorator();
console.log("\n");

//---------------------------

function read_only_decorator(){
    // You can alter the configuration of the method itself.
    // This example sets writable to false, preventing the method from being overwritten at runtime.

    function ReadOnly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.writable = false;
    }

    class Car{
        @ReadOnly
        startEngine(): void { console.log("Start Engine!"); }
    }

    const car = new Car();
    // car.startEngine = () => { console.log("Start Engine Again!"); };
    // Above line will throw: Cannot assign to read only property 'startEngine' of object '#<Car>' at compile time.
}
console.log("-----------------Example 7-----------------");
read_only_decorator();
console.log("\n");

//---------------------------

function passing_arguments_in_method_decorator() {

    type Role = "read" | "write" | "admin";

    // Factory function accepting a configuration string
    function AccessLevel(role: Role){
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

            const originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                // const currentUser = this.currentUser; /
                // Above will throw: Property currentUser does not exist on type PropertyDescriptor as TS doesn't
                // trust that PropertyDescriptor has any property currentUser so, we use any to bypass TS.

                const currentUser = (this as any).user; // any bypass TS
                const currentUserRole = (this as any).role; // bypassing TS here also

                if(!currentUser){
                    console.error("No user available, can't access anything! ")
                    return;
                }

                if( !currentUserRole || currentUserRole !== role){
                    console.error(`Unauthorized: ${currentUser} Requires ${role} role but got ${currentUserRole} role.`);
                    return;
                }
                return originalMethod.apply(this, args);
            }

        }
    }

    class Database{

        private user: string;
        private role: Role;

        constructor(user: string, role: Role = "read") {
            this.user = user;
            this.role = role;
        }

        @AccessLevel("read")
        retrieveData():string{
            return "Here all the data!"
        }

        @AccessLevel("admin")
        deleteData(): string{
            return "Data is deleted!"
        }
    }

    const user1 = new Database("Raju", "read");
    // let's access the database retrieveData with read role
    console.log(user1.retrieveData()); // Works well! print: Here all the data!

    // let's delete the database using deleteData with read role
    console.log(user1.deleteData()); // throws: Unauthorized: Raju Requires admin role but got admin role.
}
console.log("-----------------Example 8-----------------");
passing_arguments_in_method_decorator();
console.log("\n");


//---------------------------

function depreciate_warning_method_decorator() {

    function depreciate(message: string) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.warn(`Warning: ${propertyKey} is Deprecated. ${message}`);
            return descriptor
        }
    }

    class PaymentService {
        @depreciate("Please use processPaymentV2.")
        processPayment(amount: number){
            console.log(`Processing payment of ${amount}`);
        }
        processPaymentV2(amount: number){
            console.log(`Processing payment V2 of ${amount}`);
        }
    }
    const paymentService = new PaymentService();
    paymentService.processPayment(4000); // will show depreciation warning
    paymentService.processPaymentV2(10000); // No warning
}
console.log("-----------------Example 9-----------------");
depreciate_warning_method_decorator();
console.log("\n");


// Key Points About Method Decorators
// Method decorators are called when the method is defined, not when it's called
// They can modify the method's behavior by wrapping it with additional logic
// They can be used for cross-cutting concerns like logging, validation, and authorization
// They receive the method's property descriptor which allows modifying the method's behavior
// They must return a property descriptor or undefined (if not modifying the descriptor)

//-------------------------------------------------------------------------------------------------------

// 3. Property Decorators
// - Property decorators are applied to property declarations and can be used to observe, modify, or replace
//   property definitions.
// - They receive two parameters:
//   ~ target: The prototype of the class (for instance properties) or the constructor function (for
//     static properties).
//   ~ propertyKey: The name of the property.
// - Execution Time: They run once when the class is defined, not when instances are created.
// - Return Value: The return value is ignored by TypeScript.

// Examples

function logging_property_decorator() {
    function LogProperty(target: any, propertyKey:string){
        console.log(`Property registered: ${propertyKey}`);
    }

    class UserProfile {

        @LogProperty
        name: string;

        @LogProperty
        email: string;

        constructor(name: string, email: string) {
            this.name = name;
            this.email = email;
        }
    }
    // Console Output during compilation/load evn the instance has not been yet created
    // "Property registered: username"
    // "Property registered: email"
}
console.log("-----------------Example 11-----------------");
logging_property_decorator();
console.log("\n");

//---------------------------

function formatted_property_decorator() {
    // In this the decorator automatically formats a property when it's set
    // Here, we will format string value of any property to our custom format
    function format(formatString: string) {
        return function (target: any, propertyKey: string){
            let value: string;
            const setter = (newVal: string): void => {
                value = formatString.replace('{}', newVal);
            };
            const getter= (): string | undefined => value;

            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        };
    }

    class Greet{
        @format("You What's up {} my bitch!")
        name: string;

        constructor(name: string) {this.name = name;}
    }

    const greet = new Greet("Ronny");
    console.log(greet.name);
}
console.log("-----------------Example 10-----------------");
formatted_property_decorator();
console.log("\n");

//---------------------------

function conditional_property_decorator() {

    // Here in this example we will make two decorator one that put a Min length check on property.
    // Second, required decorator which makes the field or property required.

    function required(target: any, propertyKey: string) {

            let value: any;
            const getter= (): string | undefined => {
                return value;
            };
            const setter = (newVal: string): void => {
                if(newVal === undefined){
                    throw new Error(`Property ${propertyKey} is required`);
                }
                value = newVal;
            }

            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
    }

    function Minlength(length: number){
        return function (target: any, propertyKey: string) {

            let value: string;
            const setter = (newVal: string): void => {
                if (newVal.length >= length){
                    value = newVal;
                }
                else{
                    throw new Error(`Property ${propertyKey} is must be at least ${length} characters long.`);
                }
            }
            const getter = () => {
                return value;
            }
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        };
    }

    class Account{
        @required
        public name: string;

        @Minlength(8)
        private password: string;

        constructor(name: any, password: string) {
            this.name = name;
            this.password = password;
        }
    }
    const account = new Account("Ronny", "secure123"); // Works well!

    try {
        const account1 = new Account(undefined, "secure123");
        // Throws error: Property name is required
    }
    catch (error) {
        if (error instanceof Error) console.error(String(error.message));
    }

    try {
        const account2 = new Account("Ronny", "123");
        // Throws Error: Property password must be at least 8 characters long.
    }
    catch (error) {
        if (error instanceof Error) console.error(String(error.message));
    }
}
console.log("-----------------Example 13-----------------");
conditional_property_decorator();
console.log("\n");

// Key Points About Property Decorators
// Property decorators are called when the property is defined, not when it's accessed
// They don't receive a property descriptor like method decorators do
// To modify property behavior, you need to use Object.defineProperty
// They're often used for metadata reflection or to modify property access
// They can be combined with other decorators for more complex behaviors


//-------------------------------------------------------------------------------------------------------

// 4. Parameter Decorators
// - A Parameter Decorator in TypeScript is a special function applied to a formal parameter declaration of a
//   class method or constructor.
// - It allows you to inspect, log, or store metadata about a specific parameter before the method executes.

// - Execution Rules
//   ~ Timing: They execute at runtime when the class is defined (not when an instance is created).
//   ~ Return Value: The return value is ignored by TypeScript. You cannot directly change or overwrite the
//     parameter value using the decorator itself.
//   ~ Execution Order: They execute from right to left (last parameter to first parameter) within a method
//     signature.

// - Parameters Passed to the Decorator
//   A parameter decorator function receives exactly three arguments:
//    ~ target: The prototype of the class for an instance method, or the constructor function itself for a
//      static method.
//    ~ propertyKey: The name of the method (or undefined if used on a constructor parameter).
//    ~ parameterIndex: The ordinal index of the parameter in the function’s argument list (0-indexed).

// - Basic Syntax Example
//   To use decorators in TypeScript, you must enable "experimentalDecorators": true in your tsconfig.json.

function syntax_parameter_decorator() {
    function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
        console.log(`Method registered: ${propertyKey}`);
        console.log(`Parameter Index: ${parameterIndex}`);
    }

    class USerService {
        greet (prefix: string, @LogParameter name: string){
            return `${prefix} ${name}`;
        }
    }
    // Console output during class initialization:
    // Method: greet
    // Parameter Index: 1
}
console.log("-----------------Example 21-----------------");
syntax_parameter_decorator();
console.log("\n");

//-------------------------------


// Decorator Best Practices
// Follow these best practices when working with decorators:
// - Keep decorators focused: Each decorator should have a single responsibility.
// - Document behavior: Clearly document what your decorators do and any side effects they might have.
// - Use decorator factories: Make decorators configurable using factories for better reusability.
// - Consider performance: Be mindful of performance implications, especially with decorators that add runtime overhead.
// - Type safety: Use TypeScript's type system to make decorators type-safe when possible.
// - Error handling: Implement proper error handling within decorators.
// - Testing: Write unit tests for your decorators to ensure they work as expected.
// - Metadata: Use reflect-metadata for more advanced scenarios requiring runtime type information.





// Intro
// Classes in TypeScript (TS) are templates for creating objects. They combine data (properties) and behavior
// (methods) into a single blueprint. TypeScript adds type safety, access modifiers, and type annotations
// to standard JavaScript classes.

// Basic Class Structure
// A basic class contains a constructor, properties, and methods.

function Example1(){
    class User {
        // Properties with type annotations
        name: string;
        age: number;

        // Constructor to initialize properties
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        // Method
        getProfile():string{
            return `${this.name} is ${this.age} years old.`
        }
    }
    // Creating an instance (object)
    const user1 = new User("Lund", 29);
    console.log(user1.getProfile());
}
console.log("-------------------Example 1-------------------");
Example1();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Access Modifiers
// TypeScript provides three keywords to control the visibility of class members.
// 1) public: Accessible from anywhere (default behavior).
// 2) private: Accessible only within the class itself.
// 3) protected: Accessible within the class and its subclasses.

function Example2(){
    class Pornstar {

        public name: string;
        private salary: number;
        protected penis_size: number;

        constructor(name: string, salary: number, penis_size: number) {
            this.name = name;
            this.salary = salary;
            this.penis_size = penis_size;
        }
    }
    const star_1 = new Pornstar("Jizz", 42000, 8);
    console.log(star_1.name);
    // console.log(star_1.salary); // Will throw: Property 'salary' is private
    // console.log(star_1.penis_size); // Will throw: Property 'penis_size' is protected
}
console.log("-------------------Example 2-------------------");
Example2();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Parameter Properties
// TypeScript offers a shorthand to declare and initialize properties directly in the constructor.

function Example3(){
    class Product{
        // Automatically creates and assigns this.name and this.price
        constructor(public name: string, public price: number, private units: number) {}

        getUnits(): number{
            return this.units;
        }
    }
    const product = new Product("Condom", 10, 50);
    console.log(product.getUnits());
}
console.log("-------------------Example 3-------------------");
Example3();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Readonly
// Similar to arrays, the readonly keyword can prevent class members from being changed.

function Example4(){
    class Person {
        private readonly name: string;
        constructor(name: string) {
            // name cannot be changed after this initial definition, which has to be either at its declaration
            // or in the constructor.
            this.name = name;
        }
        public getName(){
            return this.name;
        }
    }
    const person = new Person("Jenny");
    console.log(person.getName());
}
console.log("-------------------Example 4-------------------");
Example4();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Inheritance
// Classes can inherit properties and methods from other classes using the extends keyword. You must call super()
// in the child constructor to execute the parent constructor.

function Example5(){

    class Animal{
        public sound(): void{
            console.log("Sound");
        }
    }

    class Dog extends Animal{
       sound(): void{
           console.log("Bark!");
       }
    }

    class Cat extends Animal{
        sound(): void{
            console.log("Meow!");
        }
    }

    const dog = new Dog();
    dog.sound();
    const cat = new Cat();
    cat.sound();
}
console.log("-------------------Example 5-------------------");
Example5();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Getters and Setters
// Getters and setters allow you to control how a property is accessed or modified.

function Example6(){
    class Account {
        public name: string;
        private _balance: number;

        constructor(name: string) {
            this.name = name;
            this._balance = 0;
        }

        get balance(): number {
            return this._balance;
        }

        set balance(amount: number) {
            if (amount < 0) {
                console.log("Balance cannot be negative.");
                return;
            }
            this._balance = amount;
        }
    }
    const myAccount = new Account("Jenny");
    myAccount.balance = 1000000;
    console.log(myAccount.balance);
}
console.log("-------------------Example 6-------------------");
Example6();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Static Members
// Static properties and methods belong to the class itself, not to instances of the class.
function Example7(){
    class Circle {
        static PI: number = 3.14;

        calulateArea(radius: number) : number{
            return radius * radius * Circle.PI;
        }
    }
    const circle = new Circle();
    console.log(circle.calulateArea(10));
}
console.log("-----------------Example 7-----------------");
Example7();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Abstract Classes
// Abstract classes serve as base classes that cannot be instantiated directly.
// They can contain abstract methods that must be implemented by child classes.

function Example8(){
    abstract class Pussy{
        abstract getColor(): string;
        abstract getSize(): number;
        printDescription(): void{
            console.log(`${this.constructor.name} got the ${this.getColor()} pussy of size ${this.getSize()} inches.`);
        }
    }

    class African extends Pussy{
        getColor(): string {
            return "Black";
        }
        getSize(): number{
            return 3;
        }
    }

    class Russian implements Pussy{
        getColor(): string{
            return "Pink";
        }
        getSize(): number{
            return 1.5;
        }
        printDescription(): void{
            console.log(`${this.constructor.name} got the ${this.getColor()} pussy of size ${this.getSize()} inches.`);
        }
    }

    const african = new African();
    african.printDescription();

    const russian = new Russian();
    russian.printDescription();
}
// Above I have used extends for African class and implements for Russian class why?
// - The answer is simple, if you some code inside the abstract class like we have "printDescription" function
//   inside it then, if we need that the function code then we have to go with extend as for extend the condition
//   is simple: "if you want to share and reuse the actual code inside the parent class you use me".

// - Now for Russian, we use implements which is only used if we only care about the names and types of the methods,
//   and want to write all the logic ourselves. And if you see if did implemented "printDescription" inside our
//   Russian class proofing that we write or logic you just gave us the methods and names.
// - We will learn about implements more in interfaces as im them you can't write code logics.

console.log("-----------------Example 8-----------------");
Example8();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

//  Working with Interfaces
// An interface defines a contract for what a class must have, but it contains no actual code.
// A single class can implement multiple interfaces separated by commas.

function Example9(){
    interface Engine{
        horsePower: number;
        numberOfStrokes: number;
        start(): void;
    }

    interface Cargo{
        capacity: number;
        load(): void;
    }

    class Truck implements Engine, Cargo{
        constructor(public horsePower: number, public numberOfStrokes: number, public capacity: number) {
        }
        start(): void{
            console.log("Engine roaring!");
        }
        load(): void{
            console.log("Loading cargo...");
        }
    }

    const truck = new Truck(500,14,1000);
    truck.start();
    truck.load();
}

console.log("-----------------Example 9-----------------");
Example9();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// Advanced Type Relationships
// In TypeScript, you can check types at runtime using standard JavaScript operators, or use instances
// as types themselves.

// 1. Checking Types with instanceof
// The instanceof operator checks if an object belongs to a specific class at runtime.
function Example10(){
    class PetrolCar{
        Mileage(): void { console.log("Typical petrol car average ranges typically fall between 15 to 25 kmpl ") }
    }
    class BatteryCar{
        Capacity(): void { console.log("Typical Battery car capacities ranges from 17 kWh to over 100 kWh") }
    }

    function checkVehicle(vehicle: PetrolCar | BatteryCar){

        // vehicle.Mileage() // Here TS will throw error: Property 'Mileage' does not exist on type
        // 'PetrolCar | BatteryCar' because here TS doesn't what vehicle is.

        if (vehicle instanceof PetrolCar){
            vehicle.Mileage(); // Here, TypeScript now knows vehicle is a PetrolCar so, TS will not throw error
            console.log("It is a car");
        } else {
            vehicle.Capacity(); // Here, TypeScript now knows vehicle is a BatteryCar so, TS will not throw error
            console.log("It is a bike");
        }
    }
    const vehicle = new PetrolCar();
    checkVehicle(vehicle);
}
console.log("-----------------Example 10-----------------");
Example10();
console.log("\n");

//-------------------------------------------------------------------------------------------------------

// 2. Structural Typing with Classes
// TypeScript checks types based on their shape (properties and methods), not just their names.
// If two classes look identical, TypeScript treats them as compatible.

function Example11(){
    class Point2D {
        x: number = 0;
        y: number = 0;
    }

    class Vector2D {
        x: number = 0;
        y: number = 0;
    }

    // This works because Point2D and Vector2D have the exact same shape
    const myPoint: Point2D = new Vector2D();
}

console.log("-----------------Example 11-----------------");
Example11();
console.log("\n");

//-------------------------------------------------------------------------------------------------------


// At the end for summary base in whole these examples and description what was the use of typescript here as all
// looks similar to JS classes?

// For answering it Here are the concrete, factual differences showing exactly what TypeScript did in the
// previous examples that JavaScript cannot do.

// 1. Catching Errors Before Running the Code
// In standard JavaScript, if you forget to implement a method from a contract or misspell a property, the code
// will fail only when a user triggers it at runtime. TypeScript catches this instantly in your code editor.

// 2. True Access Control (private and protected)
// JavaScript classes only recently added private fields using a hashtag syntax (like #salary).
// TypeScript provides clean keyword modifiers (private, protected) that prevent other developers from
// accidentally accessing internal data while writing code.

// 3. Automatic Constructor Assignment (Shorthand)
// TypeScript allows you to skip tedious boilerplate code using Parameter Properties.
/*
    class Product {
        constructor(public name: string, private price: number) {}
    }
    What you would have to write in JavaScript to do the same thing:javascriptclass Product {

    class Product {
        constructor(name, price) {
                this.name = name;
                this.price = price; // More typing, higher chance of bugs
        }
    }
*/

// 4. Code Autocomplete (IntelliSense)
// Because TypeScript knows the exact "shape" of your classes and interfaces, your code editor can
// predict exactly what methods and properties are available. When you type myTruck., your editor will
// instantly pop up a menu showing horsepower, capacity, start(), and load(). In JavaScript, the editor
// has to guess.


// In summary:
// - JavaScript only finds out something is broken when the browser executes the line of code.
// - TypeScript reads your design blueprint (interfaces) and forces you to write correct code before
//   it converts it into JavaScript.
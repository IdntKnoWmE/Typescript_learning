

// Intro
// - In TypeScript, static is a keyword used inside classes.
// - It assigns properties or methods directly to the class itself, rather than to instances (objects) created
//   from the class.
// - Key Concepts:
//  ~ Class Ownership: Static members belong to the class blueprint, not the individual objects.
//  ~ No 'this' Access: Static methods cannot access instance properties using this.
//  ~ Memory Efficient: Static members exist in only one place in memory, no matter how many class instance are
//    created.
//  ~ Utility Use Case: Ideal for helper functions, global configurations, or cache stores.

// - Code Examples:
// 1. Static Properties

function Example1(){
    class AppConfig{
        static readonly url: string = "https://api.openweathermap.org/data/2.5/weather?q=";
        static maxRetries: number = 5;

        printURL(): string{
            // return this.url; // Will throw: Property 'url' does not exist on type 'AppConfig'.
            return AppConfig.url; // Works!
        }
    }
    // Accessing the static member using class name only
    console.log(AppConfig.maxRetries, AppConfig.url); // No need to do: const config = new AppConfig();

    const appConfig = new AppConfig();
    console.log(appConfig.printURL()); // Works fine!

    // console.log(appConfig.url)
    // Above will throw error: Property 'url' does not exist on type 'AppConfig', since url is the part of class
    //  not class instance.
}
console.log("-------------------Example 1-------------------");
Example1();
console.log("\n");

//-------------------------------------

// 2. Static Methods
// Static methods act as utility functions grouped under a relevant class namespace.
// You can combine static with public, private, or protected to control access visibility also.

function Example2(){

    class User{
        // Private static property (Tracks global counts) (cannot access with User._totalUsers)
        private static _totalUsers: number = 0; // can be access in class only.

        // Instance properties (Unique to each instances)
        protected id: number; // Can be access in class and child classes only.
        public name: string; // Can be access in class, instances, and child classes.

        constructor(name:string) {
            User._totalUsers ++; // Increase global user counts
            this.id = User._totalUsers;
            this.name = name;
        }

        // Public static property that can be called with class name(User.totalUsers)
        public static get totalUsers(): number{
            return User._totalUsers;
        }
    }

    const user1 = new User("Santosh");
    const user2 = new User("Baby bash");

    console.log(user2.name); // "Baby bash" user2 property name
    console.log(User.totalUsers); // Works and print 2 (since 2 user were created).
}
console.log("-----------------Example 2-------------------------");
Example2();
console.log("\n");

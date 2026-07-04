"use strict";
// Intro
// - TypeScript async programming allows execution of non-blocking operations like API requests, file handling,
//   or database operations while maintaining a fluid user experience on a single thread.
// - TypeScript enhances standard JavaScript asynchronous patterns by applying strict compile-time type safety
//   via generic signatures.
Object.defineProperty(exports, "__esModule", { value: true });
//-------------------------------------------------------------------------------------------------------
// Type Safe Promises
// - A Promise represents the eventual completion (or failure) of an asynchronous operation.
// - In TypeScript, you explicitly type a Promise using the generic syntax Promise<T>, where T is the type of
//   data returned upon a successful operation.
// - Promise<T>: Resolves with a value of type
// - T.Promise<void>: Resolves successfully but returns no value.
// - any | unknown error typing: By default, the error caught in a .catch() block or rejection value is untyped.
// Key Points:
// - Promise<T> - Generic type where T is the type of the resolved value
// - Promise<void> - For Promises that don't return a value
// - Promise<never> - For Promises that never resolve (rare)
// - Basic Promise Example
function basic_promise_example() {
    // Typing a function that returns a Promise containing a UserProfile
    function fetchUserProfile() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: "John Doe"
                });
            }, 500);
        });
    }
    // Consuming the promise with strict type inference
    fetchUserProfile().then((user) => { console.log("basic_promise_example output: ", user, "\n"); })
        .catch((error) => {
        if (error instanceof Error) {
            console.error("basic_promise_example output: ", error.message, "\n");
        }
        else {
            console.error("basic_promise_example output: ", String(error), "\n");
        }
    });
    // In this whole program if keys are not satisfying the UserProfile interface then TS will throw error.
}
basic_promise_example();
//-----------------------------------
function fetch_greeting_example() {
    function greet(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`Hello ${name}, How are you?`);
            }, 500);
        });
    }
    greet("Rahul").then((greeting) => {
        console.log("fetch_greeting_example output: ", greeting.toLowerCase(), "\n");
        // No error as TS knows greeting is string as we mention in Promise<string>.
    }).catch((error) => {
        console.log("fetch_greeting_example output: ", error.message, "\n");
    });
}
fetch_greeting_example();
//-----------------------------------
// Promise States and Type Flow:
// - pending → fulfilled (with value: T) // Success case
// - pending → rejected (with reason: any) // Error case
// TypeScript tracks these states through the type system, ensuring you handle both success and error cases properly.
// The type parameter in Promise<T> tells TypeScript what type the Promise will resolve to, allowing for
// better type checking and IDE support.
//-------------------------------------------------------------------------------------------------------
// Async/Await with TypeScript
// - TypeScript's async/await syntax provides a cleaner way to work with Promises, making asynchronous code look
//   and behave more like synchronous code while maintaining type safety.
// - The async and await keywords act as syntactic sugar built on top of Promises.
// - They make asynchronous code read like sequential, synchronous code.
// - The Keywords:
//   ~ async keyword: Functions marked with async automatically return a Promise. If you return a raw value,
//     TypeScript wraps it in a resolved Promise automatically.
//   ~ await keyword: Pauses execution of the async function until the targeted Promise resolves or rejects.
// - Error Handling:
//     Uses native synchronous try/catch structural blocks instead of .catch() chains.
// - Key Benefits of Async/Await
//   ~ Readability: Sequential code that's easier to follow
//   ~ Error Handling: Use try/catch for both sync and async errors
//   ~ Debugging: Easier to debug with synchronous-like stack traces
//   ~ Type Safety: Full TypeScript type inference and checking
function basic_async_await_example() {
    // Function that returns a Promise of User Profile
    async function fetchCurrentUserProfile() {
        console.log('Fetching user profile...');
        await new Promise((resolve, reject) => { setTimeout(resolve, 2000); });
        return {
            id: 1,
            name: "John Doe",
            email: "john@doe.com",
            role: 'admin',
        };
    }
    // Async function to call for user profile
    async function getCurrentUserRole() {
        try {
            const user = await fetchCurrentUserProfile();
            return user.role;
        }
        catch (error) {
            throw error; // Re-throw to let caller handle
        }
    }
    // Execute the async function
    getCurrentUserRole().then((role) => console.log(`basic_async_await_example output: The role of current user is ${role}\n`)).catch((error) => console.error(`basic_async_await_example output: Failed to fetch current user role: ${error.message} \n`));
}
basic_async_await_example();
// Async Function Return Types
// - All async functions in TypeScript return a Promise.
// - The return type is automatically wrapped in a Promise:
// - async function getString(): string { } // Error: must return Promise
// - async function getString(): Promise<string> { } // Correct
//---------------------------------------
function calling_real_api() {
    async function fetchPostDetail(id) {
        try {
            let postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (postResponse.ok) {
                const data = await postResponse.json();
                return data;
            }
            else {
                throw new Error(`HTTP Error Status: ${postResponse.status}`);
            }
        }
        catch (error) {
            console.error("Failed to execute data fetch operations.");
            throw error; // Re-throwing ensures the return Promise is rejected
        }
    }
    let id = 1;
    fetchPostDetail(id).then((postDetail) => console.log(`Details of post Id: ${id} is: ${JSON.stringify(postDetail)}`)).catch((error) => console.error('Failed to fetch post detail: ', error.message));
}
calling_real_api();
//-------------------------------------------------------------------------------------------------------
// Parallel Execution with Promise.all
// Run multiple async operations in parallel and wait for all to complete
function multiple_parallel_promise_example() {
    async function fetchProduct(id) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        return { id, name: `Product ${id}`, price: Math.floor(Math.random() * 100) };
    }
    async function fetchMultipleProduct(ids) {
        try {
            // Start all fetches in parallel
            // Map IDs to an array of Promise<Product>[]
            const productPromises = ids.map(id => fetchProduct(id));
            // Now, pass the array of promises to Promise.all
            // This will return an array of Products: Product[]
            const products = await Promise.all(productPromises);
            return products.reduce((sum, b) => sum + b.price, 0);
        }
        catch (error) {
            throw error;
        }
    }
    let productIds = [1, 2, 3, 4, 5];
    fetchMultipleProduct(productIds).then((totalPrice) => console.log(`multiple_parallel_promise_example output: The total price for products ${productIds} is $${totalPrice} \n`)).catch((error) => console.error('multiple_parallel_promise_example output: ', error.message, '\n'));
}
multiple_parallel_promise_example();
//  All async functions in TypeScript return a Promise.
// The type parameter of the Promise corresponds to the return type you declare after the Promise keyword.
//---------------------------------
// Typing Callbacks for Async Operations
// For traditional callback-based asynchronous code, TypeScript helps ensure proper typing of the callback
// parameters:
function callback_based_async_code_example() {
    // Function that takes a typed callback
    function fetchDataWithCallback(url, callback) {
        // Simulate async operation
        setTimeout(() => {
            try {
                // Simulate successful response
                callback(null, "Response Data");
            }
            catch (error) {
                callback(error instanceof Error ? error : new Error("Unknown error"));
            }
        }, 1000);
    }
    // Using the callback function
    fetchDataWithCallback('http://localhost:8080', (error, data) => {
        if (error) {
            console.error("callback_based_async_code_example output: Error : ", error.message, '\n');
        }
        // TypeScript knows data is a string (or undefined)
        if (data) { // Here we filter that data is string not undefined
            console.log("callback_based_async_code_example output: ", data.toUpperCase(), '\n');
        }
    });
}
callback_based_async_code_example();
//---------------------------------------------------------------------------------------------------
// Promise Combinations
// - TypeScript provides powerful utility types and methods for working with multiple Promises.
// - These methods help you manage concurrent operations and handle their results in a type-safe way.
// - Promise Combination Methods
//   ~ Promise.all() - Waits for all promises to resolve
//   ~ Promise.race() - Returns the first settled promise
//   ~ Promise.allSettled() - Waits for all to settle (success or failure)
//   ~ Promise.any() - Returns the first fulfilled promise
// - Let's see examples for each case
// 1) Promise.all - Parallel Execution
// Run multiple promises in parallel and wait for all to complete.
// Fails fast if any promise rejects.
function promise_all_example() {
    const fetchUser = (id) => new Promise((resolve) => {
        return setTimeout(() => {
            resolve({ id: id, name: "John Doe" });
        }, 500);
    });
    const fetchPosts = (userId) => new Promise((resolve) => {
        return setTimeout(() => {
            resolve([{ id: 1, detail: "Ahh! Everything is good" }, { id: 2, detail: "Yo Yo Yo, Welcome to my blog!" }]);
        }, 1000);
    });
    const fetchStats = (userId) => Promise.resolve({ views: 100, likes: 25 });
    async function loadUserDashboard(userId) {
        try {
            const [user, posts, stats] = await Promise.all([
                fetchUser(userId),
                fetchPosts(userId),
                fetchStats(userId),
            ]);
            console.log(`promise_all_example output: \n
            user = ${JSON.stringify(user)} \n 
            posts = ${JSON.stringify(posts)} \n
            stats = ${JSON.stringify(stats)} \n`);
        }
        catch (error) {
            console.error('promise_all_example output: Failed to load dashboard:', error, '\n');
        }
    }
    loadUserDashboard(1);
}
promise_all_example();
//----------------------------------
// 2. Promise.race - First to Settle
// Useful for timeouts or getting the first successful response from multiple sources.
function promise_race_example() {
    function randomReject(time) {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject("Fuck you!");
            }, time);
        });
    }
    function randomResolve(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Fuck you too, bitch!");
            }, time);
        });
    }
    async function callRandom() {
        const time1 = Math.floor(Math.random() * 5) * 500;
        const time2 = Math.floor(Math.random() * 5) * 500;
        try {
            const result = await Promise.race([
                randomReject(time1),
                randomResolve(time2),
            ]);
            console.log('promise_race_example output: Random resolve says: ', result, '\n');
        }
        catch (error) {
            console.error('promise_race_example output: Random reject says: ', error, '\n');
        }
    }
    callRandom();
}
promise_race_example();
//----------------------------------
// 3. Promise.allSettled - Handle All Results
// When you want to wait for all promises to complete, regardless of success or failure.
function promise_allsettled_example() {
    // Simulate multiple API calls with different outcomes
    function fetchData(id) {
        // Randomly fail some request also
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    reject(new Error(`Failed to fetch data for ID ${id}`));
                }
                resolve({ id, data: `Data for ${id}` });
            }, 1000);
        });
    }
    async function fetchBulkData(ids) {
        const promises = ids.map(id => fetchData(id)
            .then(value => ({ content: value }))
            .catch(error => ({ content: error.message })));
        // Wait for all to complete
        const results = await Promise.allSettled(promises);
        console.log(`promise_allsettled_example output: \n ${JSON.stringify(results)} \n`);
    }
    fetchBulkData([1, 2, 3]);
}
promise_allsettled_example();
//----------------------------------//----------------------------------//----------------------------------
// Error Handling in Async Code
// TypeScript provides powerful tools for type-safe error handling in asynchronous code.
// Let's explore different patterns and best practices.
// Error Handling Strategies
// - Try/Catch Blocks: For handling errors in async/await
// -  Error Boundaries: For React components
// - Result Types: Functional approach with success/failure
// - Error Subclassing: For domain-specific errors
// Let's go with the example of Custom Error Classes: Create domain-specific error types for better
// error handling:
function custom_error_class_example() {
    class AppError extends Error {
        constructor(message, code, // Since publics is used then TS will creates an internal class variable.
        detail) {
            super(message);
            this.code = code;
            this.detail = detail;
            this.name = this.constructor.name;
            Error.captureStackTrace?.(this, this.constructor); // It removes the constructor name from the stack trace.
        }
    }
    class NetworkError extends AppError {
        constructor(message, details) {
            super(message, "NETWORK ERROR", details);
        }
    }
    class NotFoundError extends AppError {
        constructor(message, details) {
            super(message, "NOT_FOUND", details);
        }
    }
    class ValidationError extends AppError {
        constructor(message, details) {
            super(message, "VALIDATION ERROR", details);
        }
    }
    function mockUserAPI(url, id) {
        const time = Math.floor(Math.random() * 5) * 300;
        return new Promise((resolve) => {
            setTimeout(() => {
                let chance = Math.random();
                if (chance < 0.3) {
                    resolve({ ok: false, status: 404, content: {} });
                }
                else if (chance >= 0.3 && chance < 0.6) {
                    resolve({ ok: false, status: 500, content: {} });
                }
                else if (chance >= 0.6 && chance <= 0.8) {
                    resolve({ ok: true, status: 200, content: { id: id, name: `User ${id}` } });
                }
                else {
                    resolve({ ok: true, status: 200, content: { id: id } });
                }
            }, time);
        });
    }
    // Usage example
    async function fetchUserData(userId) {
        try {
            const response = await mockUserAPI("http://localhost:8080", userId);
            if (!response.ok) {
                if (response.status === 404)
                    throw new NotFoundError('User does not exist', userId);
                else if (response.status === 500)
                    throw new NetworkError('Network Error', userId);
                else
                    throw new Error(`HTTP error!`);
            }
            const data = response.content;
            // Validate response data
            if (!data.name) {
                throw new ValidationError('name', 'Name is required');
            }
            return data;
        }
        catch (error) {
            if (error instanceof AppError) {
                // Already one of our custom errors
                throw error;
            }
            // Wrap unexpected errors
            throw new AppError('Failed to fetch user data', 'UNEXPECTED_ERROR', { cause: error });
        }
    }
    // Error handling in the application
    async function displayUserProfile(userId) {
        try {
            const user = await fetchUserData(userId);
            console.log("custom_error_class_example output: ", 'User profile:', user);
        }
        catch (error) {
            if (error instanceof NetworkError) {
                console.error("custom_error_class_example output: ", 'Network issue:', error.message);
                // Show retry UI
            }
            else if (error instanceof ValidationError) {
                console.error("custom_error_class_example output: ", 'Validation failed:', error.message);
                // Highlight the invalid field
            }
            else if (error instanceof NotFoundError) {
                console.error("custom_error_class_example output: ", 'Not found:', error.message);
                // Show 404 page
            }
            else {
                console.error("custom_error_class_example output: ", 'Unexpected error:', error);
                // Show generic error message
            }
        }
    }
    // Execute with example data
    displayUserProfile('123');
}
custom_error_class_example();

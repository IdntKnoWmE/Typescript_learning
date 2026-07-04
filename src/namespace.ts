
// Intro
// - As the codebase grows from a few lines to thousands of lines, there is a problem everyone faces that is
//   so common known as Naming Collisions.
// - It's like you are living in a town where there are multiple people with same names, now if you try to call
//   them in a public, all will get confuse that whom I am calling to. Now, what's the solution, it's simple we
//   some context with the name or group their name by their household or work like: "john from gupta family" or
//   "john from kapoor family".
// - In this similar way, TS provides Namespace which acts as a secure fence built around the group of code (like
//   variables, interfaces, or classes) so their names don't clash with each other.

//-------------------------------------------------------------------------------------------------------

// How to create and use a Namespace
// To group your code into a namespace, we use the "namespace" keyword. Inside the namespace, any code we want to
// make visible to outside world must have the "export" keyword in front of it.
// Example:

namespace Validation {
    const letterRegex = /^[A-Za-z0-9]+$/; // This is hidden from outside world like a private variable

    export interface StringValidator { // Available to outside world
        isValid(s: string): boolean;
    }

    export class LettersOnlyValidator implements StringValidator {
        isValid(s: string): boolean {
            return letterRegex.test(s);
        }
    }
}

// let's access the namespace class or variables
let validator = new Validation.LettersOnlyValidator();
console.log(validator.isValid("hskhwfh44mnnv")); // return true

// If we try to access lettersRegexp a private member of namespace
// console.log(Validation.letterRegex);
// Above will throw: "Property 'letterRegex' does not exist on type 'typeof Validation'" as letterRegex
//  wasn't exported.

//-------------------------------------------------------------------------------------------------------

// Nested Namespaces (Houses inside Neighborhoods)
// You can even nest namespaces inside other namespaces to create clean, organized folder structures for
//  your code logic.

namespace Corporate{
    export namespace Security{ // If we want to use it outside the Corporate namespace then we need to export it.
        export class AccessControl{
            grantAccess(){
                console.log("Access Granted.");
            }
        }
    }
}
// Accessing the nested code:
let guard = new Corporate.Security.AccessControl();
guard.grantAccess()

//-------------------------------------------------------------------------------------------------------

// The Modern Truth: Namespaces vs. Modules
// - Here is an important bit of history: Namespaces were invented early in TypeScript's life before JavaScript
//   had an official way to organize files.
// - Today, modern TypeScript development mostly uses standard ES Modules (using files with import and export
//   statements) instead of namespaces. Modules isolate code automatically at the file level.
// - However, namespaces are still incredibly useful today for:
//      Building massive Global Plugins or libraries.
//      Organizing internal logic within a single, very large file.
//      Handling legacy TypeScript codebases.


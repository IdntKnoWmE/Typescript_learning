"use strict";
// An enum is a special "class" that represents a group of constants (unchangeable variables).
Object.defineProperty(exports, "__esModule", { value: true });
// Why we use it?
// As in programming sometimes we have to assign some constant values to some of the fields like say assigning
// priority to tasks(1-> highly prior, 2-> prior, 3-> lower priority) , similarly we have status like Pending,
// success, failed or waiting. This kind of values if hardcoded again and again then there can be a case where we
// might have a spelling mistake, so to avoid we define enums -> a group of constant and through this we can
// assign those value to our code.
//-------------------------------------------------------------------------------------------------------
// Enums come in two flavors string and numeric.
// Numeric Enums (The default ones)
// By default, Enums assign a number to each of your choices, starting at 0.
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Success"] = 1] = "Success";
    Status[Status["Failed"] = 2] = "Failed"; // 2
})(Status || (Status = {}));
// how you use it
let currStatus = Status.Pending;
console.log(currStatus); // return 0
// Here, under the hood TS reads Status.Pending as 0, Status.Success as 1.
// This makes your code highly readable without sacrificing performance
//-------------------------------------------------------------------------------------------------------
// String Enums
// Since Enums is by default assigning the numerical value to the constants so, when we look at our code during
// run time, there in logs we get values as numerics which is harder to track means we have to see in Enums again
// and again to calc this numeric value is assigned to which constant.
// This issue can be resolved by explicitly assigning string values to our constants like:
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Viewer"] = "viewer";
    Role["Editor"] = "editor";
})(Role || (Role = {}));
// Now if you run and check the value
console.log(Role.Admin); // you will get admin here.
// You can assign custom Numerics also to your enums like
var Priority;
(function (Priority) {
    Priority[Priority["Higher"] = 10] = "Higher";
    Priority[Priority["Medium"] = 20] = "Medium";
    Priority[Priority["Lower"] = 30] = "Lower";
})(Priority || (Priority = {}));
console.log(Priority.Higher); // It will return 10

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInfo() {
    const userNameElement = document.getElementById("username");
    const emailElement = document.getElementById("email");
    const ageElement = document.getElementById("age");
    const name = userNameElement.value;
    const age = Number(ageElement.value);
    const email = emailElement.value;
    console.log(name, email, age);
}



function getInfo(){

    const userNameElement = document.getElementById("username") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const ageElement = document.getElementById("age") as HTMLInputElement;

    const name:string = userNameElement.value;
    const age:number = Number(ageElement.value);
    const email:string = emailElement.value;

    console.log(name, email, age);




}


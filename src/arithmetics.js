"use strict";

let operator;
let numbers = [];

try {
    calculator();
}
catch (e) {
    alert("Cancelled")
}

function calculator() {
    operator = askInputOperator("Enter an arithmetic operation (add, subtract, divide, multiply):");
    numbers[0] = askInputNum("Enter first number");
    numbers[1] = askInputNum("Enter second number");

    if (checkDivisionByZero(operator, numbers[1])) {
        alert("Division by 0");
    } else {
        outputResult();
    }
}

function askInputNum(message) {
    let userInput = prompt(message);
    if (userInput === null) { throw new Error("User cancelled"); }
    userInput = parseInt(userInput);
    if (isNaN(userInput)) {
        userInput = askInputNum("Wrong input! Enter a number one more time:");
    }
    return userInput;
}
function askInputOperator(message) {
    let inputOperator;
    let userInput = prompt(message);
    switch (userInput) {
        case null:
            throw new Error("User cancelled");
        case "add":
            inputOperator =  "+";
            break;
        case "subtract":
            inputOperator =  "-";
            break;
        case "divide":
            inputOperator =  "/";
            break;
        case 'multiply':
            inputOperator =  "*";
            break;
        default:
            inputOperator = askInputOperator("Enter one of those -> add, subtract, divide or multiply");
            break;
    }
    return inputOperator;
}
function checkDivisionByZero(operator, number) {
    if (operator !== '/') { return false; }
    if (number !== 0) { return false;}
    return true;
}
function outputResult(){
    let result = eval(numbers[0] + operator + numbers[1]);
    alert (result);
};



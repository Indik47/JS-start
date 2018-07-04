"use strict";

let operator;
let numbers = [];

askUserInput();
while (checkDivisionByZero(operator, numbers[1])) {
    numbers[1] = askInputNum("Division by 0. Enter non-0 second number");
}
outputResult();

function askUserInput() {
    operator = askInputOperator("Enter an arithmetic operation (add, subtract, divide, multiply):");
    numbers[0] = askInputNum("Enter first number");
    numbers[1] = askInputNum("Enter second number");
};
function askInputNum(message) {
    let inputNum = parseInt(prompt(message));
    if (isNaN(inputNum)) {
        askInputNum("Wrong input! Enter a number one more time:");
    }
    return inputNum;
}
function askInputOperator(message) {
    let inputOperator;
    let userInput = prompt(message);
    switch (userInput) {
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



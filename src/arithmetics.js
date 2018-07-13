'use strict';
let operator;
const numbers = [];

function askInputOperator(message) {
  const input = prompt(message);
  switch (input) {
    case '+':
    case '-':
    case '/':
    case '*':
      return input;
    case null:
      throw new Error('Cancelled');
    default:
      return undefined;
  }
}
function askInputNumber(message) {
  const input = prompt(message);

  if (input === null) {
    throw new Error('Cancelled');
  }

  return parseInt(input);
}
function askUserInput() {
  while (isNaN(numbers[0])) {
    numbers[0] = askInputNumber('First number (cancel to exit)');
  }
  while (operator === undefined) {
    operator = askInputOperator('+     -     /    *     (cancel to exit):');
  }

  while (isNaN(numbers[1])) {
    numbers[1] = askInputNumber('Second number (cancel to exit)');
  }
}
function checkDivisionByZero(number) {
  if (number !== 0) return false;
  return true;
}
function outputResult() {
  const result = `${numbers[0]} ${operator} ${numbers[1]}`;
  alert(`${result} = ${eval(result)}`);
}
function calculate() {
  if ( operator === '/' && checkDivisionByZero(numbers[1])) {
    throw new Error('Division by 0');
  }
  outputResult();
}

try {
  askUserInput();
  calculate();
} catch (e) {
  e.message === "Division by 0" ? alert(e.message) : console.log(e.message);
}

let operator;
const numbers = [];

function askInputOperator(message) {
  let inputOperator;
  const userInput = prompt(message);
  switch (userInput) {
    case 'add':
      inputOperator = '+';
      break;
    case 'subtract':
      inputOperator = '-';
      break;
    case 'divide':
      inputOperator = '/';
      break;
    case 'multiply':
      inputOperator = '*';
      break;
    default:
      throw new Error('User cancelled');
  }
  return inputOperator;
}
function askInputNum(message) {
  const userInput = prompt(message);

  if (userInput === null) {
    throw new Error('User cancelled');
  }

  return parseInt(userInput);
}
function askUserInput() {
  operator = askInputOperator('Enter an arithmetic operation (add, subtract, divide, multiply):');

  while (isNaN(numbers[0])) {
    numbers[0] = askInputNum('Enter first number');
  }

  while (isNaN(numbers[1])) {
    numbers[1] = askInputNum('Enter second number');
  }
}
function outputResult() {
  const result = eval(numbers[0] + operator + numbers[1]);
  alert(result);
}
function checkDivisionByZero(number) {
  if (number !== 0) return false;
  return true;
}
function calculate() {
  if (operator !== '/') {
    outputResult();
    return;
  }
  if ( checkDivisionByZero(numbers[1]) ) {
    alert('Division by 0');
  }
}

try {
  askUserInput();
  calculate();
} catch (e) {
  alert(e.message);
}

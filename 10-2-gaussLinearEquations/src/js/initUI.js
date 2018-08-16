'use strict';

/**
 * Initialize form for user inputs
 * @param num - number of equations
 * @param parentRow - parent element for the generated form
 */
const initInputs = function (num, parentRow) {
    clearElement(parentRow);

    let inputsCol = document.createElement('div');
    inputsCol.className = 'col inputs';

    createInputRow();
    cloneInputRowAndAppend(num);

    function createInputRow() {
        for (let j = 0; j < num + 1; j++) {
            const input = document.createElement('input');
            input.className = 'inputs matrixEl';
            inputsCol.appendChild(input);
        }
    }

    /**
     * Clone created row of inputs N times = number of equations
     * @param n - number of equations
     */
    function cloneInputRowAndAppend(n) {
        for (let i = 0; i < n; i++) {
            parentRow.appendChild(inputsCol.cloneNode(true));
        }
    }

};

/**
 * Initializes matrix of coefficients with user inputs
 * @param parentRow - HTML element that contains user input form
 * @returns {*[]} - Array
 */
const initMatrix = function (parentRow) {
    const inputsRow = parentRow.children;
    const arr = createArray(parentRow.children.length);

    Array.prototype.forEach.call(inputsRow, (row, i) => {
        Array.prototype.forEach.call(row.children, (child, j) => {
            const num = Number(child.value);
            if ( !num ) child.value = 'NaN';
            if ( Number(num).toString() === `NaN`) child.value = 'NaN';

            arr[i][j] = num;
        })
    });

    return arr;
};

/**
 * Clears all HTML element children
 * @param elem - element to clear
 */
const clearElement = function (elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
};

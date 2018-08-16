'use strict';

/**
 * Creates HTML table
 * @param tableParent {string} - parent HTML node inside which the table is created
 */
var makeTable = function (matrix) {
    var tableParent = document.querySelector('.table__container');
    var table = document.createElement('table');

    for (var i=0; i < matrixLen; i++) {
        var tableRow = document.createElement('tr');
        table.appendChild(tableRow);
        for (var j=0; j < matrixLen ; j++) {
            var tableElem = document.createElement('td');
            tableElem.innerText = matrix[i][j];
            tableElem.setAttribute('data-row', `${i}`);
            tableElem.setAttribute('data-col', `${j}`);
            tableRow.appendChild(tableElem);
        }
    }
    tableParent.appendChild(table);
};

/**
 * Initizalizes matrix with with values needed for Vigenere cipher
 */
const initMatrix = function (matrix) {
    fillMatrixLeftHalf(matrix, matrixLen, alphabetStr);
    fillMatrixRightHalf(matrix, matrixLen);
    fillMatrixRowsCols(matrix, alphabetStr, matrixLen);

    return matrix; //for test purposes only
};

/**
 * Creates string of chars
 * @param startCharCode
 * @param endCharCode
 * @returns {string}
 */
function createAlphabetString(startCharCode, endCharCode) {
    var str = '';
    for (let i = startCharCode; i <= endCharCode; i++) {
        str += String.fromCharCode(i);
    }
    return str;
}

/**
 * Randomizes provided string. For test purposes.
 * @param str
 * @returns {string}
 */
function randomizeString(str) {
    var chars = Array.from(str);
    var randomValue;
    for (let i = 0; i < chars.length-1; i++) {
        randomValue = Math.floor(Math.random()*26);
        [chars[i],chars[randomValue]] = [chars[randomValue],chars[i]];
    }
    str = chars.join("");
    return str;
}

/**
 * Creates two-dimensional array
 * @param height
 * @param width
 * @return {[]} - created array
 */
function createArray(height, width) {
    var arr = new Array(height || 0);

    for (var i = 0; i < height; i++) {
        arr[i] = new Array(width);
    }
    return arr;
}

/**
 * Logs 2d array to console. For test purposes.
 * @param array
 */
function logArray (array) {
    for (let i = 0; i < array.length; i++) {
        var str = '';
        for (let j = 0; j < array[i].length; j++) {
            str += array[i][j] + '  ';
        }
        console.log(str);
    }
}

var toggleHover = function (row, col, char, delay, label) {
    const td = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);

    setTimeout(function(){
        td.classList.toggle('td-hover');
        label.innerText += char;

        setTimeout(function(){
            td.classList.toggle('td-hover');
        },500);
    },delay);
};

function showAnim (chars,label) {
    for (var [i, char] of Object.entries(chars)) {
        toggleHover(char.tableRow, char.tableCol, char.value, i*50, label)
    }
}


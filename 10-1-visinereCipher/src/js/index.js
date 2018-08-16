'use strict';

//create string of chars of desired length
var startChar = 97;
var endCharCode = 123;
var alphabetStr = createAlphabetString(startChar, endCharCode);

//create empty 2d array
var matrixLen = alphabetStr.length;
var emptyMatrix = createArray(matrixLen, matrixLen);

const matrix = initMatrix(emptyMatrix);
makeTable(matrix);


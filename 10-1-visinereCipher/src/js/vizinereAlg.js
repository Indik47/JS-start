
'use strict';
/**
 * Fills left half of 2d array needed for Vigenere cipher
 * @param array - empty 2d array to fill
 * @param dimension - array dimension
 * @param str - string to take characters from
 * @returns {array}
 */
function fillMatrixLeftHalf(array, dimension, str) {
    for (let i = 1; i <= dimension - 1; i++) {
        var k = i;
        for (let j = 1; j <= i; j++) {
            array[k][j] = str[i-1];
            k--;
        }
    }
    return array;

}
/**
 * Fills right half of 2d array needed for Vigenere cipher. Takes characrer values from left half of the array.
 * @param array - 2d array to fill, left half filled
 * @param dimension - array dimension
 * @returns {array}
 */
function fillMatrixRightHalf(array, dimension) {
    for (let i = dimension-1; i > 1; i--) {
        var k = dimension - 1;
        for (let j = i; j <= dimension-1; j++) {
            array[k][j] = array[i-1][1];
            k--;
        }
    }
    return array;

}
/**
 * Fill first row and first column of of 2d array needed for Vigenere cipher
 * @param array - 2d array to fill
 * @param str
 * @param arrayDimension
 */
function fillMatrixRowsCols(array, str, arrayDimension) {
    array[0][0] = 0;
    for (let i = 1; i < arrayDimension; i++) {
        array[i][0] = str[i-1];
        array[0][i] = str[i-1];
    }
}

function crypto(cryptoArray, originalString, code) {
    code = code.repeat( 25 );
    var cryptoChars = {};

    var arrayI;
    var arrayJ;

    Array.from(originalString).forEach( (char,index) => {
        arrayI = char.charCodeAt(0) - (startChar - 1);
        arrayJ = code.charCodeAt(index) - (startChar - 1);

        cryptoChars[index] = {
            value: cryptoArray[arrayI][arrayJ],
            tableRow: arrayI,
            tableCol: arrayJ
        };

    });
    return cryptoChars;
}

/**
 * Reverses cipher of the string
 * @param cryptoArray
 * @param cryptoString
 * @param code
 * @return {string}
 */
function deCrypto(cryptoArray, cryptoString, code) {
    code = code.repeat( 25 );
    var arrayJ;
    var deCryptoChars = {};

    Array.from(cryptoString).forEach((char,index) => {
        arrayJ = code.charCodeAt(index) - (startChar - 1);

        for (let i = 1; i < cryptoArray.length; i++) {
            if ( cryptoArray[i][arrayJ] === cryptoString[index] ) {

                deCryptoChars[index] = {
                    value: cryptoArray[i][0],
                    tableRow: i,
                    tableCol: 0
                };
            }
        }
    });
    return deCryptoChars;
}

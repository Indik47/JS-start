'use strict';

/**
 * Logs array to the console
 * @param array
 */
const logArray = function(array) {
    for (let i = 0; i < array.length; i++) {
        var str = '';
        for (let j = 0; j < array[i].length; j++) {
            str += array[i][j] + '  ';
        }
        console.log(str);
    }
};

/**
 * Creates empty two-dimensional array
 * @param height
 * @return {[]} - created array
 */
const createArray = function(height) {
    var arr = new Array(height || 0);

    //for the linear equation system coefficients matrix:
    const width = height + 1;
    for (var i = 0; i < height; i++) {
        arr[i] = new Array(width);
    }
    return arr;
};

/**
 * Step one of Gauss algorithm
 * @param matrix - array of linear equation coefficients
 * @returns {array} - array of transformed coefficients ( zero`s below main diagonal )
 */
const gaussStepOne = function(matrix) {
    const arr = JSON.parse(JSON.stringify(matrix));
    for (let i = 1; i <= arr.length -1; i++) {
        for (let j = i; j <= arr.length - 1; j++) {
            const coef = ( arr[j][i-1] / arr[i-1][i-1] ).toFixed(3);
            for (let k = 0; k < arr[j].length; k++) {
                const num = Number( arr[j][k] - arr[i-1][k] * coef ).toFixed(3);
                arr[j][k] = parseFloat(num);
            }
        }
    }
    return arr;
};

/**
 * Step two of Gauss algorithm
 * @param matrix - array of transformed coefficients ( zero`s below main diagonal )
 * @returns {array}
 */
const gaussStepTwo = function(matrix) {
    const arr = JSON.parse(JSON.stringify(matrix));
    const roots = [];
    for (let i = arr.length-1; i >= 0 ; i--) {
        let sum = Number( arr[i][arr.length] ).toFixed(3);
        for (let j = i + 1; j <= arr.length-1 ; j++) {
            sum = sum - Number( arr[i][j] * roots[j] ).toFixed(3);
        }
        const num = Number( sum/arr[i][i] ).toFixed(2);
        roots[i] = parseFloat(num) ;
    }
    return roots;
};

const getRootsGauss = function (matrix) {
    return gaussStepTwo(gaussStepOne(matrix));
};



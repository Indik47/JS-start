'use strict';

console.log('----flatten debug----');
// test case 1: flatten with required depth specified
const complexArray1 = [1,3,7,[6,1,[-8]],23];

const flattened1 = flattenArray(complexArray1, 1);
console.log('original :', complexArray1);
console.log('flattened with depth = 1:', flattened1);

// test case 2: deep flatten
const complexArray2 = [2,7,[6,1,[-8,2,[54]]],1.68];

const flattened2 = flattenArray(complexArray2);
console.log('original :', complexArray2);
console.log('deep flattened :', flattened2);


//if called without depth parameter, performs a deep flatten
function flattenArray(array, depth = Infinity) {
    let flattenedArray = [];
    let currentDepth = 0;

    return flattenInner(array);

    function flattenInner(values) {
        // 1) recursion exit if values is a simple number
        if ( !Array.isArray(values) ) {
          flattenedArray.push(values);
          currentDepth--;                       //decrease depth before recursion exit
          return;
        }

        // 2) recursion exit if depth too big
        if (currentDepth > depth) {
          const clone = flattenArray(values, 0); //make a clone of inner arrays by value (if they have depth bigger than in func call)
          flattenedArray.push(clone);
          currentDepth--;                       //decrease depth before recursion exit
          return;
        }

        // 3) recursion enter
        for (const item of values) {
           currentDepth++;    //increase depth before entering recursion
           flattenInner(item);
        }

      return flattenedArray;
    }
}





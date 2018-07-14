'use strict';

const clone = function (array) {
  return array.map(elem => Array.isArray(elem) ? clone(elem) : elem);
};

function flattenArray(array, depth = Infinity) {
  const flatArray = [];
  let currentDepth = 0;

  function flattenInner(array, depth) {
  // recursion exit if depth too big
      if (currentDepth > depth) {
        flatArray.push(clone(array));    //  make copy by value before pushing
        currentDepth--;                       //  decrease depth before recursion exit
        return;
      }

      for (const elem of array) {
        if ( Array.isArray(elem) ){
          currentDepth++;                     //  increase depth before entering recursion
          flattenInner(elem, depth);          //  recursion enter
        } else {
          flatArray.push(elem);          //  if element is a number,  just push it into result
        }
      }
    return flatArray;
  }

  return flattenInner(array, depth);
}

console.log('----flatten debug----');

// test case 1: flatten with specified depth
const complexArray1 = [1,3,7,[6,1,[-8, [-5]]],23];
const flattened1 = flattenArray(complexArray1, 1);

console.log('original :', complexArray1);
console.log('flattened with depth = 1:', flattened1);

// test case 2: deep flatten
const complexArray2 = [2,7,[6,1,[-8,2,[54]]],1.68];
const flattened2 = flattenArray(complexArray2);

console.log('original :', complexArray2);
console.log('deep flattened :', flattened2);
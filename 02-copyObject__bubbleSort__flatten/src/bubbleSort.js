'use strict';

// regular b sort
function bSortLoops(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let k = 0; k < array.length - i; k++) {
      if (array[k] > array[k + 1]) {
        [array[k], array[k + 1]] = [array[k + 1], array[k]];
      }
    }
  }
}

// regular b sort, starting from the end of the array
function bSortLoopsEnd(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    for (let k = array.length - 1; k >= array.length - i; k--) {
      if (array[k] < array[k -1]) {
        [array[k], array[k - 1]] = [array[k - 1], array[k]];
      }
    }
  }
}

// b sort with recursion
function bSortRecursive(array) {
  let swaps = false;
  for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swaps = true;
      }
  }
  if (swaps) {
      return  bSortRecursive(array);
  }
}

// b sort with recursion, starting from the end of the array
function bSortRecursiveEnd(array) {
  let swaps = false;
  for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] < array[i - 1]) {
        [array[i], array[i - 1]] = [array[i - 1], array[i]];
        swaps = true;
      }
  }
  if (swaps) {
      return bSortRecursiveEnd(array);
  }
}

console.log('----bubble sort debug----');
let arr1 = [4, 2, 5.2, 3, -1.4, 20,  1, -15];
bSortLoops(arr1);
console.log('regular bSort:', arr1);

let arr2 = [7, 12, -14, 2, 1, 1, 14, -11.3];
bSortRecursive(arr2);
console.log('regular bSort v2', arr2);

let arr3 = [3, 56, 2, 2, -27, -27.1, 8, 4];
bSortLoopsEnd(arr3);
console.log('recursive bSort:', arr3);

let arr4 = [-13, 3, 43.4, 20, 2, 1, 9, 4];
bSortRecursiveEnd(arr4);
console.log('recursive bSort v2:', arr4);



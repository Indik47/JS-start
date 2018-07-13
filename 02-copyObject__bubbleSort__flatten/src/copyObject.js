'use strict';

const student = {
  name: 'Denys',
  lastName: 'Oligov',
  occupation: {
    title: 'student',
    company: 'DITS school',
    adress: {
      street: 'Kotsiubinskogo',
      number: '14'
    }
  }
}

console.log('----copy object debug----');

const studentCopy = copyObjectDeep(student);

console.log('original object:', student);
console.log('copied object:', studentCopy);


function copyObjectDeep(objectToCopy) {
  let newObject = {};

  for ( const [key,value] of Object.entries(objectToCopy) ) {
    if ( typeof(value) === 'object' && value !== null) {
      newObject[key] = copyObjectDeep(value);
    } else {
      newObject[key] = value;
    }
  }

  return newObject;
}

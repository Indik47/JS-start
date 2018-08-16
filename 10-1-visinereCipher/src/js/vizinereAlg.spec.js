'use strict';

const origPhraze = 'IstudyJS';
const code = 'abc';
const cipheredPhraze = 'itvueajt';
const decipheredPhraze = 'istudyjs';
var startChar = 97;
var endCharCode = 123;
var alphabetStr = createAlphabetString(startChar, endCharCode);

//create empty 2d array
var matrixLen = alphabetStr.length;
var emptyMatrix = createArray(matrixLen, matrixLen);

const matrixArr = initMatrix(emptyMatrix);

QUnit.test( "cipher", function( assert ) {
    const cryptoChars = crypto(matrixArr, origPhraze.toLowerCase(), code);
    let cryptoStr = '';
    for (const obj of Object.values(cryptoChars)) {
        cryptoStr += obj.value;
    }
    assert.equal( cryptoStr, cipheredPhraze, "Passed!" );
});

QUnit.test( "decipher", function( assert ) {
    const deCryptoChars = deCrypto(matrixArr, cipheredPhraze.toLowerCase(), code);
    let deCryptoStr = '';
    for (const obj of Object.values(deCryptoChars)) {
        deCryptoStr += obj.value;
    }
    assert.equal( deCryptoStr, decipheredPhraze, "Passed!" );
});
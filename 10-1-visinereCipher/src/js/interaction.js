'use strict';

var cipherBtn = document.querySelector('.col.inputs .cipher');
var deCipherBtn = document.querySelector('.col.inputs .decipher');
var cipherLabel = document.querySelector('.inputs__item.ciphered');
var deCipherLabel = document.querySelector('.inputs__item.deciphered');
var phraze = document.querySelector('.inputs__item.phraze');
var code = document.querySelector('.inputs__item.code');

cipherBtn.addEventListener('click', function () {
    var origString = phraze.value.toLowerCase();
    var codeString = code.value.toLowerCase();

    var cipher = new Promise(function (resolve) {
        var cryptoChars = crypto(matrix, origString, codeString);
        resolve(cryptoChars);
    });

    cipher
        .then( (cryptoChars) => {
            cipherLabel.innerText = '';
            showAnim(cryptoChars, cipherLabel);
        });
});

deCipherBtn.addEventListener('click', function () {
    var cryptedString = cipherLabel.innerText;
    var codeString = code.value.toLowerCase();

    var decipher = new Promise(function (resolve) {
        var deCryptoChars = deCrypto(matrix, cryptedString, codeString);
        resolve(deCryptoChars);
    });

    decipher
        .then( (deCryptoChars) => {
            deCipherLabel.innerText = '';
            showAnim(deCryptoChars, deCipherLabel);
        });
});

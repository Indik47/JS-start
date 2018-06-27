window.onload = function () {


    // !function askUser() {
    //     let userInput = parseInt(prompt());
    //     (isNaN(userInput))? askUser():(userInput>100)?console.log(userInput/5):console.log(++userInput);
    // }();


    "use strict";
    alert(function rec(a = '') { return a === '' ? rec(parseInt(prompt('Input Number'))) : isNaN(a) ? rec('') : a > 100 ? console.log(a%5) : ++a}.apply(this));


    // let input = document.querySelector('.name');
    // let button = document.querySelector('button');
    // let overlay = document.querySelector('.overlay');
    // button.addEventListener('click', function (event) {
    //     if (overlay.style.display == 'block') {
    //     overlay.style.display = 'none';
    //     } else {
    //         overlay.style.display = 'block';
    //     }
    // });
    //

}

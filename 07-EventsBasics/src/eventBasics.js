'use strict';

var parent = document.querySelector(".buttons");

for ( var i = 1; i <= 10; i++ ) {
    (function(i) {
        var btn = document.createElement('button');

        btn.classList.add("button");
        btn.innerText = i;

        parent.appendChild(btn);
        btn.addEventListener('click', function () {
            alert(i);
        });
    })(i);
}
'use strict';

function show(result) {
    var textArea = document.getElementsByClassName('text')[0];
    var textAreaOldValue = textArea.innerText;

    textArea.innerText = result;
    textArea.classList.add('addAnimation');
    var timeout = setTimeout(() => {
        textArea.innerText = textAreaOldValue;
        textArea.classList.remove('addAnimation');
    }, 1500)
}

//button with hasClass function
document.querySelector('[value="Has Class"]').addEventListener('click', () => {
    var nodeName = document.getElementById('nodeName');
    var className = document.getElementById('className');

    var result = hasClass(nodeName.value, className.value);

    show(result);
});

//button with removeClass function
document.querySelector('[value="Remove Class"]').addEventListener('click', () => {
    var nodeName = document.getElementById('nodeName').value;
    var className = document.getElementById('className').value;
    removeClass(nodeName, className);
});

//button with addClass function
document.querySelector('[value="Add Class"]').addEventListener('click', () => {
    var nodeName = document.getElementById('nodeName').value;
    var className = document.getElementById('className').value;
    addClass(nodeName, className);
});

//button with makeTable function
document.querySelector('[type="button"][value="Create table"]').addEventListener('click', () => {
    var tableParent = document.querySelector('.table__container');
    if (tableParent.innerText === '') {
        makeTable(tableParent);
    } else {
        tableParent.innerHTML = '';
    }
});
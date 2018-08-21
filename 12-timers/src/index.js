'use strict';

const btn = document.getElementById('addTimer');
btn.addEventListener('click', function add() {
    if (Object.keys(timers).length < timerCountLimit) addTimer();
});

const list = document.getElementById('list');
list.addEventListener('click', function del(e) {
    const target = e.target;
    if (target.tagName === 'BUTTON') deleteTimer(target.parentNode, target.parentNode.dataset.id);
});

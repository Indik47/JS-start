const timers = {};
const timerCountLimit = 10; // max 10 timers
const timerStart = 10; // in sec

const addTimer = function () {
    let timer = {
        state: timerStart
    };

    //bind timer to callback in setInterval
    const cb = makeTimerCallback.bind(null, timer);
    timer.id = setInterval(cb, 10);

    // make DOM element for timer
    const timerHTML = createTimerElement(timer.id);

    // append to DOM list
    const timerParent = document.getElementById('list');
    timerParent.appendChild(timerHTML);

    //push to timers
    timers[timer.id] = timer;
};

/**
 * Callback for setInterval
 * @param {object} timer
 */
const makeTimerCallback = function (timer) {
    const htmlElem = document.querySelector(`#list [data-id="${timer.id}"]`);
    htmlElem.firstChild.innerText = timer.state;

    timer.state = (timer.state - 1/100).toFixed(2);

    // Check if time < 0 -> showNotification with Timer's id
    if (timer.state < 0) {
        showNotification(timer.id);
        clearInterval(timer.id);
    }
};

/**
 * Creates HTML element for timer
 * @param id - timer id
 * @returns {HTMLDivElement} - div element for timer
 */
const createTimerElement = function (id) {
    const div = document.createElement('div');
    div.setAttribute('data-id', id);
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    deleteBtn.innerText = 'delete';

    div.appendChild(span);
    div.appendChild(deleteBtn);

    return div;
};

/**
 * Deletes timer from HTML and from timers
 * @param htmlElem - html elem containing timer
 * @param timerId
 */
const deleteTimer = function (htmlElem, timerId) {
    htmlElem.parentNode.removeChild(htmlElem);
    clearInterval(timerId);
    delete timers[timerId];
};

/**
 * Show notification about timer ended
 * @param id
 */
const showNotification = function (timerId) {
    const parent = document.querySelector('#details');
    const child = document.createElement('div');
    child.innerText = `Timer ${timerId} ended`;
    parent.appendChild(child);

    setTimeout( function() {
        parent.removeChild(child); }, 5000);
};
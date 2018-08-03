'use strict';

/**
 * Checks if DOM node contains CSS class
 * @param nodeName {string} - DOM node name
 * @param className {string} - CSS class name
 * @returns {boolean | Array} - True/false if only 1 nodeName present in the document,
 * array of values if multiple nodeNames are present
 */
var hasClass = function(nodeName, className) {
    var elements = document.querySelectorAll(nodeName);

    var contains = Array.prototype.map
        .call(elements, element => element.classList.contains(className) );

    if (elements.length === 1) { return contains[0]; }
    return contains;
};

/**
 * Adds CSS class to DOM node
 * @param nodeName {string} - DOM node name
 * @param className {string} - CSS class name
 */
var addClass = function(nodeName, className) {
    var elements = document.querySelectorAll(nodeName);
    Array.prototype.forEach
        .call(elements, element => element.classList.add(className));
};
/**
 * Removes CSS class from DOM node
 * @param nodeName {string} - DOM node name
 * @param className {string} - CSS class name
 */
var removeClass = function(nodeName, className) {
    var elements = document.querySelectorAll(nodeName);

    Array.prototype.forEach
        .call(elements, element => {
            element.classList.remove(className);
        });
};
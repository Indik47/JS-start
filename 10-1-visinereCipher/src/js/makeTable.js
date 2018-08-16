'use strict';

/**
 * Creates HTML table
 * @param tableParent {string} - parent HTML node inside which the table is created
 */
var makeTable = function (tableParent) {
    var tableParent = document.querySelector('.table__container');
    var table = document.createElement('table');

    for (var i=0; i < matrixLen; i++) {
        var tableRow = document.createElement('tr');
        table.appendChild(tableRow);
        for (var j=0; j < matrixLen ; j++) {
            var tableElem = document.createElement('td');
            tableElem.innerText = matrix[i][j];
            tableElem.setAttribute('data-row', `${i}`);
            tableElem.setAttribute('data-col', `${j}`);
            tableRow.appendChild(tableElem);
        }
    }
    tableParent.appendChild(table);
};

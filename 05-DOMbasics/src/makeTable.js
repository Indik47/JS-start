'use strict';

/**
 * Creates HTML table
 * @param tableParent {string} - parent HTML node inside which the table is created
 */
var makeTable = function (tableParent) {
    var table = document.createElement('table');

    for (var i=0; i < 10; i++) {
        var tableRow = document.createElement('tr');
        table.appendChild(tableRow);
        for (var j=0; j < 10; j++) {
            var tableColumn = document.createElement('td');
            tableColumn.innerText = j+1;
            tableRow.appendChild(tableColumn);
        }
    }
    tableParent.appendChild(table);
};

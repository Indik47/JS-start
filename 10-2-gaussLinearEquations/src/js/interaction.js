'use strict';

const dom = {
    initBtn: document.querySelector('.init__btn'),
    solveBtn: document.querySelector('.solve__btn'),
    initNumber: document.querySelector('.init__number'),
    parentRow: document.querySelector('.row.inputs'),
    answersRow: document.querySelector('.row.answers')
};

const unknowns = ['x', 'y', 'z', 't', 'm', 'n', 'l', 'o', 'p', 'r'];


dom.initBtn.addEventListener('click', function () {
    const equationsNumber = Number(dom.initNumber.value);
    const num = (equationsNumber <= 10)? equationsNumber: 10;
    initInputs(num, dom.parentRow);
});

dom.solveBtn.addEventListener('click', function () {
    const coeffMatrix = initMatrix(dom.parentRow);
    const roots = getRootsGauss(coeffMatrix);

    /**
     * Log initial linear equations
     */
    function logEquations() {
        let equation = ``;
        dom.answersRow.innerText = ``;
        coeffMatrix.forEach(row => {
            row.forEach((value, j) => {
                if ((j > 0) && (j < row.length - 1)) {
                    equation += ' + ';
                }
                if (j === row.length - 1) {
                    equation += ` = ${value}`
                } else {
                    equation += value + unknowns[j];
                }
            });
            dom.answersRow.innerText += `${equation}\n`;
            equation = ``;
        });
    }

    /**
     * Log roots of linear equations
     */
    function logRoots() {
        dom.answersRow.innerText += '\nRoots:\n';
        roots.forEach((root, i) => {
            dom.answersRow.innerText += `${unknowns[i]} = ${root}\n`;
        })
    }

    logEquations();
    logRoots();
});
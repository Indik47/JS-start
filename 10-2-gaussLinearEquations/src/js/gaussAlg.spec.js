'use strict';

const matrix1 = [[1, -1, -5],[2, 1, -7]];
const roots1 = [-4,1];
const matrix2 = [[3, 2, -5, -1], [2, -1, 3, 13], [1, 2, -1, 9]];
const roots2 = [3, 5, 4];
const matrix1Roots = getRootsGauss(matrix1);
const matrix2Roots = getRootsGauss(matrix2);

roots1.forEach( (root, i) => {
    QUnit.test( `Matrix 1 root${i}`, function( assert ) {
        assert.equal( matrix1Roots[i], roots1[i], "Passed!" );
    });
});

roots2.forEach( (root, i) => {
    QUnit.test( `Matrix 2 root${i}`, function( assert ) {
        assert.equal( matrix2Roots[i], roots2[i], "Passed!" );
    });
});

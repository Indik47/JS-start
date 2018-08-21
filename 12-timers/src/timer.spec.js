'use strict';

QUnit.test( "CreateTimerElement", function( assert ) {
    const id = 5;
    const htmlElement = createTimerElement(id);
    assert.equal( htmlElement.outerHTML, `<div data-id=\"${id}"><span></span><button>delete</button></div>`, 'Sucess' );
});
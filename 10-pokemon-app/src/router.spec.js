QUnit.test("Router", function( assert ) {
    var pageRouter = new Router();
    var route = pageRouter.getRoute();
    assert.strictEqual(route.includes(`src/tests.html?`), true);
});

QUnit.test("Router", function( assert ) {
    var pageRouter = new Router();
    var route = pageRouter.getRoute();
    assert.strictEqual(route.includes(`src/tests.html?`), true);
});





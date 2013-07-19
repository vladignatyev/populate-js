module('readPopulateClass');
test('readPopulateClass: should return null', function(){
    equal(populatejs.readPopulateClass($('<li></li>')), null);
    equal(populatejs.readPopulateClass($('<li class="foobar"></li>')), null);
});

test('readPopulateClass: should read populate-N declaration', function(){
    deepEqual(populatejs.readPopulateClass($('<li class="populate5"></li>')), ["populate", 5]);
    deepEqual(populatejs.readPopulateClass($('<li class="populate-5"></li>')), ["populate", 5]);
    deepEqual(populatejs.readPopulateClass($('<li class="foobar populate-3 populate-5"></li>')), ["populate", 3]);
    deepEqual(populatejs.readPopulateClass($('<li class="foobar populat foo populate5"></li>')), ["populate", 5]);
});

test('readPopulateClass: should read populate-inner-N declaration', function(){
    deepEqual(populatejs.readPopulateClass($('<li class="populate-inner5"></li>')), ["populate-inner", 5]);
    deepEqual(populatejs.readPopulateClass($('<li class="populate-inner-5"></li>')), ["populate-inner", 5]);
    deepEqual(populatejs.readPopulateClass($('<li class="foobar populate-inner-3 populate-inner-5"></li>')), ["populate-inner", 3]);
    deepEqual(populatejs.readPopulateClass($('<li class="foobar populat foo populate-inner5"></li>')), ["populate-inner", 5]);
});

module('clearPopulateClasses');
test('clearPopulateClasses', function(){
    var $node = $('<li class="populate-2"></li>');
    populatejs.clearPopulateClasses($node);
    ok(!$node.hasClass('populate-2'), 'should not save populate-2 class');

    var $node = $('<li class="foobar populate-7 populate3 populate-inner4"></li>');
    populatejs.clearPopulateClasses($node);
    ok(!$node.hasClass('populate-7'), 'should not save populate-7 class');
    ok(!$node.hasClass('populate3'), 'should not save populate3 class');
    ok(!$node.hasClass('populate-inner4'), 'should not save populate-inner4 class');
    ok($node.hasClass('foobar'), 'should save user classes');
});

module('cloneNode');
test('cloneNode: should add cloned sibling and mark it populated', function(){
    $('<ol><li class="populate-2">foobar</li></ol>').appendTo('#qunit-fixture');
    var $node = $($('#qunit-fixture').find('ol>li')[0]);

    var population = populatejs.readPopulateClass($node);
    populatejs.cloneNode($node, population);

    var $lis = $('#qunit-fixture').find('ol>li');
    equal($lis.length, 2);

    ok($($lis[1]).hasClass('populated'));
    equal($($lis[1]).html(), 'foobar');

    ok(!$($lis[1]).hasClass('populate-2'), "should not save populate* classes for populated nodes");
});
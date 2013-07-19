test('readPopulateClass: should return null', function(){
    equal(populatejs.readPopulateClass(null), null);
    equal(populatejs.readPopulateClass("foobar"), null);
});

test('readPopulateClass: should read populate-N declaration', function(){
    deepEqual(populatejs.readPopulateClass("populate5"), ["populate", 5]);
    deepEqual(populatejs.readPopulateClass("populate-5"), ["populate", 5]);
    deepEqual(populatejs.readPopulateClass("foobar populate-3 populate-5"), ["populate", 3]);
    deepEqual(populatejs.readPopulateClass("foobar populat foo populate5"), ["populate", 5]);
});

test('readPopulateClass: should read populate-inner-N declaration', function(){
    deepEqual(populatejs.readPopulateClass("populate-inner5"), ["populate-inner", 5]);
    deepEqual(populatejs.readPopulateClass("populate-inner-5"), ["populate-inner", 5]);
    deepEqual(populatejs.readPopulateClass("foobar populate-inner-3 populate-inner-5"), ["populate-inner", 3]);
    deepEqual(populatejs.readPopulateClass("foobar populat foo populate-inner5"), ["populate-inner", 5]);
});


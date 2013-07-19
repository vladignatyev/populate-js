if (typeof populatejs == 'undefined') var populatejs = {};

populatejs.readPopulateClass = function (node) {
    classesString = node.attr('class');
    if (!classesString) return null;

    var classes = classesString.split(" ");
    var result = {};
    for (var i = 0; i < classes.length; i++) {
        if (classes[i].match(/populate-inner(.*)(\d+)/gi)) {
            if (!result.hasOwnProperty('populate-inner')) {
                result['populate-inner'] = parseInt (classes[i].match(/\d+/)[0]);
            }
        } else
        if (classes[i].match(/populate(.*)(\d+)/gi)) {
            if (!result.hasOwnProperty('populate')) {
                result['populate'] = parseInt (classes[i].match(/\d+/)[0]);
            }
        }
    }
    if (!result.hasOwnProperty('populate') && !result.hasOwnProperty('populate-inner')) result = null;
    return result;
};


populatejs.cloneNode = function(node, population) {
    if (!population) return;
    for (var i = 0; i < population['populate'] - 1; i++) {
        var $clone = node.clone();
        populatejs.clearPopulateClasses($clone);
        $clone.addClass('populated');
        node.after($clone);
    }
};


populatejs.clearPopulateClasses = function(node) {
    var classesString = node.attr('class');
    var classes = classesString.split(" ");
    for (var i = 0; i < classes.length; i++) {

        if (classes[i].match(/populate-inner(.*)(\d+)/)) {
            node.removeClass(classes[i]);
        } else
        if (classes[i].match(/populate(.*)(\d+)/)) {
            node.removeClass(classes[i]);
        }
    }
};
if (typeof populatejs == 'undefined') var populatejs = {};

populatejs.readPopulateClass = function (classesString) {
    if (!classesString) return null;

    var classes = classesString.split(" ");
    for (var i = 0; i < classes.length; i++) {
        if (classes[i].match(/populate-inner(.*)(\d+)/gi)) {
            return ["populate-inner", parseInt (classes[i].match(/\d+/)[0])];
        } else
        if (classes[i].match(/populate(.*)(\d+)/gi)) {
            return ["populate", parseInt (classes[i].match(/\d+/)[0])];
        }
    }
    return null;
};


populatejs.cloneNode = function(node, population) {
    var $clone = node.clone();
    $clone.addClass('populated');
    node.after($clone);
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
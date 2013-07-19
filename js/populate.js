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
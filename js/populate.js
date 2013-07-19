if (typeof populatejs == 'undefined') var populatejs = {};

populatejs.readPopulateClass = function (node) {
    classesString = node.attr('class');
    if (!classesString) return null;

    var classes = classesString.split(" ");
    var result = {};
    for (var i = 0; i < classes.length; i++) {
        if (classes[i].match(/populate-inner(.*)(\d+)/gi)) {
            if (!result.hasOwnProperty('populate-inner')) {
                result['populate-inner'] = parseInt(classes[i].match(/\d+/)[0]);
            }
        } else if (classes[i].match(/populate(.*)(\d+)/gi)) {
            if (!result.hasOwnProperty('populate')) {
                result['populate'] = parseInt(classes[i].match(/\d+/)[0]);
            }
        }
    }
    if (!result.hasOwnProperty('populate') && !result.hasOwnProperty('populate-inner')) result = null;
    return result;
};


populatejs.cloneNode = function (node) {
    var population = populatejs.readPopulateClass(node);
    if (!population) return;
    if (population.hasOwnProperty('populate-inner')) {
        var content = node.html();
        var newContent = content;
        for (var i = 0; i < population['populate-inner'] - 1; i++) {
            newContent = newContent + content;
        }
        node.html(newContent);
    }
    for (var i = 0; i < population['populate'] - 1; i++) {
        var $clone = node.clone();
        populatejs.clearPopulateClasses($clone);
        $clone.addClass('populated');
        node.after($clone);
    }
};


populatejs.clearPopulateClasses = function (node) {
    var classesString = node.attr('class');
    var classes = classesString.split(" ");
    for (var i = 0; i < classes.length; i++) {

        if (classes[i].match(/populate-inner(.*)(\d+)/)) {
            node.removeClass(classes[i]);
        } else if (classes[i].match(/populate(.*)(\d+)/)) {
            node.removeClass(classes[i]);
        }
    }
};

populatejs.findTerminalPopulatingNodes = function ($root) {
    var children = $root.children();
    var terminal = [];
    if (populatejs.readPopulateClass($root) != null) {
        terminal.push($root);
    }

    var result = [];
    for (var i = 0; i < children.length; i++) {
        result = result.concat(populatejs.findTerminalPopulatingNodes($(children[i])));
    }

    if (result.length > 0) {
        return result;
    } else {
        return terminal;
    }
};

populatejs.traverseUpFromTerminals = function (terminals, callable) {
    var plain = [];
    for (var i = 0; i < terminals.length; i++) {
        plain.push(terminals[i][0]); //"unjquery elements"
    }
    while (plain.length > 0) {
        var terminal = plain.shift();
        callable($(terminal));
        var walkingNode = $(terminal).parent()[0];
        if (!walkingNode) continue;

        while (populatejs.readPopulateClass($(walkingNode)) == null && $(walkingNode).parent()[0]) {
            walkingNode = $(walkingNode).parent()[0];
        }

        if (walkingNode && plain.indexOf(walkingNode) == -1) {
            plain.push(walkingNode);
        }
    }
};
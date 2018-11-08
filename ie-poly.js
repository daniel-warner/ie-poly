(function (window) {

    'use strict';

    var ie = function (n) {
        return new ie.init(n);
    }


    // ------- FUNCTION CONSTRUCTORS: -------
    var DOMTokenListPolyfill = function (c, n) {
        var self = this;
        self.list = c;
        self.n = n;
    }

    ie.init = function (n) {
        var self = this;
        self.n = n;
        self.classListInit = function () {
            var classStringTrimmed = this.n.className.replace(/^\s+|\s+$/gm, '');
            var classList = classStringTrimmed.replace(/\s\s+/g, ' ').split(' ');
            return new DOMTokenListPolyfill(classList, n);
        }
        self.classList = self.classListInit();
    }
    // --------------------------------------




    // ------------- PROTOTYPES -------------
    DOMTokenListPolyfill.prototype = {
        // Adds one or more classes to an HTMLDOMElement.
        add: function () {
            for(var x = 0; x < arguments.length; x++){
                if (typeof arguments[x] !== 'string') {
                    return console.error("The 'add()' method must contain at least one argument, and all arguments must be of type 'string'");
                }
                // Does arg/class 'x' exist in this.list?
                var alreadyExists = false;
                for(var y = 0; y < this.list.length; y++){
                    if(arguments[x] === this.list[y]){
                        alreadyExists = true;
                        break;
                    }
                }
                // If class does not exist, add it.
                if(!alreadyExists){
                    this.list.splice(this.list.length, 0, arguments[x]);
                }
            }
            this.n.className = this.list.join(' ');
        },
        // Removes one or more classes from an HTMLDOMElement
        remove: function () {
            for (var x = 0; x < arguments.length; x++) {
                if (typeof arguments[x] !== 'string') {
                    return console.error("The 'remove()' method must contain at least one argument, and all arguments must be of type 'string'");
                }
                // Does arg/class 'x' exist in this.list?
                for (var y = 0; y < this.list.length; y++) {
                    if (arguments[x] === this.list[y]) {
                        this.list.splice(y, 1);
                    }
                }
            }
            this.n.className = this.list.join(' ');
        },
        // Checks if the DOMTokenListPolyfill obj contains a specific CSS class.
        contains: function (c) {
            if (typeof c === 'string' && arguments.length === 1) {
                for (var x = 0; x < this.list.length; x++) {
                    if (this.list[x] === c) {
                        return true;
                    }
                }
                return false;
            } else {
                console.error("The 'contains()' method must contain one argument, of type 'string'");
            }
        },
        // Returns a CSS class that matches the index given.
        item: function (i) {
            // If the index exists in the 'list' array, return it.
            if (this.list[i]) {
                return this.list[i];
            }
            console.error("The '.item()' method's index argument does not exist or it is of wrong type (must be number or string number)");
            return null;
        }
    }

    ie.prototype = {
        //METHODS:
        // Takes an event type and adds an event listener to the node.
        addEvent: function (et, fn) {
            // If the arg types are correct - continue.
            if (typeof et === 'string' && typeof fn === 'function') {
                if (this.n.addEventListener) {
                    // >= IE9
                    // Check whether the 'et'/event type arg contains 'on' and if not, remove it before firing the 'addEventListener' method. 
                    et.indexOf('on') > -1 ? this.n.addEventListener(et.replace('on', ''), fn) : this.n.addEventListener(et, fn);
                } else if (this.n.attachEvent) {
                    // < IE9
                    // Check whether the 'et'/event type arg contains 'on' and if so, prepend it before firing the 'attachEvent' method.
                    et.indexOf('on') < 0 ? this.n.attachEvent('on' + et, fn) : this.n.attachEvent(et, fn);
                }
            } else {
                console.error("'addEvent()' arguments must be of type: (string, function) - in that order.");
            }
        },
        removeEventListener: function (et, fn) {
            // If the arg types are correct, else throw an error in the console.
            if (typeof et === 'string' && typeof fn === 'function') {
                if (this.n.removeEventListener) {
                    // >= IE9
                    // Check whether the 'et'/event type arg contains 'on' and if not, remove it before firing the 'removeEventListener' method. 
                    et.indexOf('on') > -1 ? this.n.removeEventListener(et.replace('on', ''), fn) : this.n.removeEventListener(et, fn);
                } else if (this.n.detachEvent) {
                    // < IE9
                    // Check whether the 'et'/event type arg contains 'on' and if so, prepend it before firing the 'detachEvent' method.
                    et.indexOf('on') < 0 ? this.n.detachEvent('on' + et, fn) : this.n.detachEvent(et, fn);
                }
            } else {
                console.error("'removeEventListener()' arguments must be of type: (string, function) - in that order.");
            }
        }
    }
    // ------------------------------------

    ie.init.prototype = ie.prototype;
    window.ie = ie;
}(window));
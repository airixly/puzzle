//the global namespace
var util = {

    //Cross-Browser Event Handlers
    e: {

        //only bubbling phase for compatibility
        addEvent: function (element, type, handler) {
            if (element.addEventListener) {

                //DOM LEVEL 2
                //'this' binds to element
                //when attaches multiple events,they will be fired
                // in the order as added
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {

                //IE8 and earlier
                //'this' binds to global
                //when attaches multiple events,they will be fired
                // in the inverse order as added
                element.attachEvent("on" + type, handler);
            } else {

                //DOM LEVEL 0 for all modern browsers
                //'this' binds to element
                //no longer in popular use
                elemnt["on" + type] = handler;
            }
        },

        //only bubbling phase for compatibility
        removeEvent: function (element, type, handler) {
            if (element.removeEventListener) {
                //DOM LEVEL 2
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                //IE8 and earlier
                element.detachEvent("on" + type, handler);
            } else {
                //DOM LEVEL 0 for all modern browsers
                //no longer in popular use
                element["on" + type] = null;
            }
        },

        //IE event object exists as a property of the 'window' object
        //when event handler is assigned using DOM LEVEL 0 and attachEvent
        //in DOM LEVEL 0,the event will be undefined,so window.event is returned
        getEvent: function (event) {
            return event ? event : window.event;
        },

        //IE event use 'srcElement' to show the target of the event
        getTarget: function (event) {
            return event.target || event.srcElement;
        },

        //cancel the default behavior for the event
        //as a link is to navigate to the URL with 'href' attribute when clicked
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                //for IE
                event.returnValue = false;
            }
        },
        stopPropagation: function (event) {
            //stop any further event capturing or event bubbling
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                //for IE,stop any further event bubbling
                event.cancelBubble = true;
            }
        }
    },
    o: {

        //child inherit the parent prototype chain
        //without calling parent's constructor twice that will
        //create two sets of instance properties
        inheritPrototype: function (parent) {

            //constructor stealing
            //the instance created by child will have its own properties
            var child = function () {
                //if parent constructor return a value,child also get the result
                return parent.apply(this, arguments);
            };

            //surrogate function
            //assign the constructor property to child
            function F() {
                this.constructor = child;
            }

            //surrogate make a reference to parent prototype
            //but lose the default constructor
            F.prototype = parent.prototype;

            //child prototype inherits from surrogate prototype
            child.prototype = new F();
            return child;
        }
    }
}

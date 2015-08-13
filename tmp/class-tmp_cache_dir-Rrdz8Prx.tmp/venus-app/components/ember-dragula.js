define('venus-app/components/ember-dragula', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        dragulaoptions: {
            direction: 'vertical', // Y axis is considered when determining where an element would be dropped
            copy: false, // elements will be moved by default, not copied
            revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: false, // spilling will `.remove` the element, if this is true
            delay: false // enable regular clicks by setting to true or a number of milliseconds
        }

    });

});
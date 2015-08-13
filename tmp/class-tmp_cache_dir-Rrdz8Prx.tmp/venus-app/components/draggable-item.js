define('venus-app/components/draggable-item', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var get = Ember['default'].get;

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['draggableItem'],
    attributeBindings: ['draggable'],
    draggable: 'true',

    dragStart: function dragStart(event) {
      return event.dataTransfer.setData('text/data', get(this, 'content'));
    }
  });

});
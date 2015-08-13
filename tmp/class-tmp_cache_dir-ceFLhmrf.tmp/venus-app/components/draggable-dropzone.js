define('venus-app/components/draggable-dropzone', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var set = Ember['default'].set;

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['draggableDropzone'],
    classNameBindings: ['dragClass'],
    dragClass: 'deactivated',

    dragLeave: function dragLeave(event) {
      event.preventDefault();
      set(this, 'dragClass', 'deactivated');
    },

    dragOver: function dragOver(event) {
      event.preventDefault();
      set(this, 'dragClass', 'activated');
    },

    drop: function drop(event) {
      var data = event.dataTransfer.getData('text/data');
      this.sendAction('dropped', data);

      set(this, 'dragClass', 'deactivated');
    }
  });

});
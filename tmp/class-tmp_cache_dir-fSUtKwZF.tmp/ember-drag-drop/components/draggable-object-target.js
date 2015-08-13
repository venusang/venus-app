define('ember-drag-drop/components/draggable-object-target', ['exports', 'ember', 'ember-drag-drop/mixins/droppable'], function (exports, Ember, Droppable) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(Droppable['default'], {
    classNames: ["draggable-object-target"],

    handlePayload: function(payload) {
      var obj = this.get('coordinator').getObject(payload,{target: this});
      this.sendAction('action',obj,{target: this});
    },

    handleDrop: function(event) {
      var dataTransfer = event.dataTransfer;
      var payload = dataTransfer.getData("Text");
      this.handlePayload(payload);
    },

    acceptDrop: function(event) {
      this.handleDrop(event);
      //Firefox is navigating to a url on drop sometimes, this prevents that from happening
      event.preventDefault();
    },

    actions: {
      acceptForDrop: function() {
        var hashId = this.get('coordinator.clickedId');
        this.handlePayload(hashId);
      }
    }
  });

});
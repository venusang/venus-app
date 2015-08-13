import Ember from 'ember';

var get = Ember.get;

export default Ember.Component.extend({
  classNames: ['draggableItem'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragStart: function dragStart(event) {
    return event.dataTransfer.setData('text/data', get(this, 'content'));
  }
});
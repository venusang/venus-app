import Ember from 'ember';

var set = Ember.set;

export default Ember.Component.extend({
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
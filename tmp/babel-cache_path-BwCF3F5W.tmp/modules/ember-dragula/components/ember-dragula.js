import Ember from 'ember';

export default Ember.Component.extend({
	willInsertElement: function willInsertElement() {
		var options = this.config.options || {};
		this.set('drake', dragula(options));
		this.set('parent', this);
	},
	didInsertElement: function didInsertElement() {
		this.setEventListeners();
	},
	setEventListeners: function setEventListeners() {
		this.config.eventList ? this.config.eventList.forEach((function (event) {
			this.drake.on(event.name, (function () {
				this.sendAction('dragulaEvent', event.name, arguments);
			}).bind(this));
		}).bind(this)) : "";
	},
	willDestroyElement: function willDestroyElement() {
		this.drake.containers.removeObject(this.element);
		this.drake.destroy();
		this.set('drake', '');
	}
});
import Ember from 'ember';

export default Ember.Route.extend({
	model: function model() {
		return this.store.findAll('sortable');
	},
	actions: {
		itemMoved: function itemMoved() {
			console.debug('itemMoved');
		}
	}
});
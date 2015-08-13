define('venus-app/routes/sortables', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('sortable');
		},
		actions: {
			itemMoved: function itemMoved() {
				console.debug('itemMoved');
			}
		}
	});

});
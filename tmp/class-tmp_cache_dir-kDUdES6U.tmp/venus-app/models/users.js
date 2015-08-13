define('venus-app/models/users', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({
		fullName: DS['default'].attr('string')
	}).reopenClass({
		FIXTURES: [{
			id: 1,
			fullName: "Luke Davis"
		}, {
			id: 2,
			fullName: "Liam Jacobson"
		}, {
			id: 3,
			fullName: "Jackie Jacobson"
		}]
	});

});
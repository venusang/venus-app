define('venus-app/models/draggable', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({
		title: DS['default'].attr('string'),
		body: DS['default'].attr('string'),
		status: DS['default'].attr('string')
	}).reopenClass({
		FIXTURES: [{
			id: 1,
			title: "Draggable item Clean the house",
			body: "Fold the laundry, take out the trash, clean the kitchen counters",
			status: "Not Completed"
		}, {
			id: 2,
			title: "Have lunch with the family",
			body: "Have a nice lunch with Luke and the kids then go see a movie!",
			status: "Not Completed"
		}, {
			id: 3,
			title: "Learn to be more better at ember with ember-cli",
			body: "Tutorials galore.  Dooo it.",
			status: "Not Completed"
		}]
	});

});
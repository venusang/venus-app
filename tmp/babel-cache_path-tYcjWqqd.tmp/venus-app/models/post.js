import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
	status: DS.attr('string')
}).reopenClass({
	FIXTURES: [{
		id: 1,
		title: "Clean the house",
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
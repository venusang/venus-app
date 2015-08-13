import DS from 'ember-data';

export default DS.Model.extend({
	fullName: DS.attr('string')
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
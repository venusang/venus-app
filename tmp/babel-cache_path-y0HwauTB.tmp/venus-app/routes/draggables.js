import Ember from 'ember';

var computed = Ember.computed;
var get = Ember.get;

export default Ember.Route.extend({
	model: function model() {
		return this.store.findAll('users');
	},

	selectedUsers: Ember.A([]),
	remainingUsers: computed.setDiff('users', 'selectedUsers'),
	remainingUsersLength: computed.alias('remainingUsers.length'),

	actions: {
		addUser: function addUser(userId) {
			var selectedUsers = get(this, 'selectedUsers');
			var user = get(this, 'model').find('id', parseInt(userId));

			if (!selectedUsers.contains(user)) {
				return selectedUsers.pushObject(user);
			}
		},

		addAllUsers: function addAllUsers() {
			var remainingUsers = get(this, 'remainingUsers');
			return get(this, 'selectedUsers').pushObjects(remainingUsers);
		},

		removeUser: function removeUser(user) {
			return get(this, 'selectedUsers').removeObject(user);
		},

		removeAllUsers: function removeAllUsers() {
			return get(this, 'selectedUsers').clear();
		}
	}
});
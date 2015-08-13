define('venus-app/routes/draggables', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var computed = Ember['default'].computed;
	var get = Ember['default'].get;

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('users');
		},

		selectedUsers: Ember['default'].A([]),
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

});
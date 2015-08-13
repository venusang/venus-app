import Ember from 'ember';

var { computed, get } = Ember;

export default Ember.Route.extend({
	model:function(){
		return this.store.findAll('users');
	},

	selectedUsers        : Ember.A([]),
	remainingUsers       : computed.setDiff('users', 'selectedUsers'),
	remainingUsersLength : computed.alias('remainingUsers.length'),

	actions: {
	    addUser(userId) {
	      var selectedUsers = get(this, 'selectedUsers');
	      var user          = get(this, 'model').find('id', parseInt(userId));

	      if (!selectedUsers.contains(user)) {
	        return selectedUsers.pushObject(user);
	      }
	    },

	    addAllUsers() {
	      var remainingUsers = get(this, 'remainingUsers');
	      return get(this, 'selectedUsers').pushObjects(remainingUsers);
	    },

	    removeUser(user) {
	      return get(this, 'selectedUsers').removeObject(user);
	    },

	    removeAllUsers() {
	      return get(this, 'selectedUsers').clear();
	    }
	}
});

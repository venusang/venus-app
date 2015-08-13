import Ember from 'ember';

export default Ember.Route.extend({
	model:function(){
		return this.store.findAll('sortable');
	},
	 actions: {
		itemMoved: function(){
			console.debug('itemMoved');
		}  
	}
});

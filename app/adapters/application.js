import DS from 'ember-data';

export default DS.FixtureAdapter.extend({
	defaultSerializer: "-default",
	shouldReloadAll: function(){
		return true;
	}
});

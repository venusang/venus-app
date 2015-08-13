define('ember-dragula/components/ember-dragula-container', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({
		didInsertElement: function didInsertElement() {
			Ember['default'].run.next((function () {
				this.get('parentView').drake.containers.push(this.element);
			}).bind(this));
		},
		setElementIdToChildren: function setElementIdToChildren() {
			var childViews = this.get('childViews');
			var elementToChild = {};
			childViews.forEach(function (view) {
				elementToChild[view.elementId] = view.tree;
			});
		},
		willDestroyElement: function willDestroyElement() {}
	});

});
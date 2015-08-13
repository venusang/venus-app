define('venus-app/router', ['exports', 'ember', 'venus-app/config/environment'], function (exports, Ember, config) {

	'use strict';

	var Router = Ember['default'].Router.extend({
		location: config['default'].locationType
	});

	Router.map(function () {
		this.resource('posts', { path: '/' });
		this.resource('sortables');
		this.resource('draggables');
		this.resource('dragula');
	});

	exports['default'] = Router;

});
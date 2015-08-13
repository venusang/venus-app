import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.resource('posts', { path: '/' });
	this.resource('sortables');
	this.resource('draggables');
	this.resource('dragula');
});

export default Router;
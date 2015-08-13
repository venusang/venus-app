define('venus-app/routes/posts', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var Foo = Ember['default'].Object.extend({});
	var Bar = Ember['default'].Object.extend({ code: "" });

	var Post = Ember['default'].Object.extend({});
	exports['default'] = Ember['default'].Route.extend({
					model: function model() {
									var codes = [];
									codes.pushObject(Foo.create({ code: "ABC", text: "SOMETHING 1" }));
									codes.pushObject(Foo.create({ code: "ABCD", text: "SOMETHING 2" }));
									codes.pushObject(Foo.create({ code: "ABCDE", text: "SOMETHING 3" }));
									return Ember['default'].RSVP.hash({
													model: Bar.create(),
													codes: codes
									});
					},
					setupController: function setupController(controller, hash) {
									controller.set("model", hash.model);
									controller.set("codes", hash.codes);
					},

					//Draggable isn't working right now because the model below is commented out
					//so that I can get ember-cli-auto-complete working
					// model:function(){
					// 	return this.store.findAll('post');
					// },

					actions: {
									setStatus: function setStatus(post, ops) {
													var status = ops.target.status;
													console.debug('status is: ' + status);
													post.set("status", "changed");
													post.save();
									},
									itemSelected: function itemSelected(item) {
													this.get('controller').set('selection', item.get('code'));
									}

					}
	});

});
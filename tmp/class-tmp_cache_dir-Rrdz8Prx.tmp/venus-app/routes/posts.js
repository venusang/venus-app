define('venus-app/routes/posts', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var Foo = Ember['default'].Object.extend({});
	var Bar = Ember['default'].Object.extend({ code: "" });

	exports['default'] = Ember['default'].Route.extend({
					model: function model() {
									var codes = [];
									var posts = this.store.findAll('post'); //this used to be in the model hook as return this.store.findAll('post');
									codes.pushObject(Foo.create({ code: "ABC", text: "SOMETHING 1" }));
									codes.pushObject(Foo.create({ code: "ABCD", text: "SOMETHING 2" }));
									codes.pushObject(Foo.create({ code: "ABCDE", text: "SOMETHING 3" }));
									return Ember['default'].RSVP.hash({
													model: Bar.create(),
													codes: codes,
													posts: posts //I added this to the hash
									});
					},
					setupController: function setupController(controller, hash) {
									controller.set("model", hash.model);
									controller.set("codes", hash.codes);
									controller.set("posts", hash.posts); //I added this to the setupController hook and changed "model" in the posts.hbs to say "posts"
					},

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
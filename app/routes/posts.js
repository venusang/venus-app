import Ember from 'ember';

var Foo = Ember.Object.extend({});
var Bar = Ember.Object.extend({code: ""});

export default Ember.Route.extend({
    model: function() {
	    var codes = [];
	    var posts = this.store.findAll('post'); //this used to be in the model hook as return this.store.findAll('post');
	    codes.pushObject(Foo.create({code: "ABC", text: "SOMETHING 1"}));
	    codes.pushObject(Foo.create({code: "ABCD", text: "SOMETHING 2"}));
	    codes.pushObject(Foo.create({code: "ABCDE", text: "SOMETHING 3"}));
	    return Ember.RSVP.hash({
	        model: Bar.create(),
	        codes: codes, 
	        posts: posts //I added this to the hash
	    });
    },
    setupController: function(controller, hash) {
        controller.set("model", hash.model);
        controller.set("codes", hash.codes);
        controller.set("posts", hash.posts); //I added this to the setupController hook and changed "model" in the posts.hbs to say "posts"
    },
	
	 actions: {
	    setStatus: function(post, ops) {
			// var status = ops.target.status;
			// console.debug(post.isDraggingObject);
			
			// console.debug(post.get("status"));
			// console.debug(ops.target.get("class"));
			// console.debug(ops);
			// var status = post.get("status");
			var bucketStatus = ops.target.get("status");


			if(bucketStatus === 'Ready to Publish'){
				post.set("status",'Ready to Publish');
				post.set("class",'label-info');
				post.save();
			} 

			if (bucketStatus === 'Needs Revision'){
				post.set("status","Needs Revision");
				post.set("class",'label-warning');
				post.save();
			}
		},
		itemSelected: function(item) {
	      this.get('controller').set('selection', item.get('code'));
	    }
  
	}
});

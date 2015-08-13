import Ember from 'ember';
import config from './config/environment';

var Foo = Ember.Object.extend({});
var Bar = Ember.Object.extend({ code: "" });

var Router = Ember.Router.extend({
    location: config.locationType,
    model: function model() {
        var codes = [];
        codes.pushObject(Foo.create({ code: "ABC", text: "SOMETHING 1" }));
        codes.pushObject(Foo.create({ code: "ABCD", text: "SOMETHING 2" }));
        codes.pushObject(Foo.create({ code: "ABCDE", text: "SOMETHING 3" }));
        return Ember.RSVP.hash({
            model: Bar.create(),
            codes: codes
        });
    },
    setupController: function setupController(controller, hash) {
        controller.set("model", hash.model);
        controller.set("codes", hash.codes);
    }
});

Router.map(function () {
    this.resource('posts', { path: '/' });
    this.resource('sortables');
    this.resource('draggables');
    this.resource('dragula');
});

export default Router;
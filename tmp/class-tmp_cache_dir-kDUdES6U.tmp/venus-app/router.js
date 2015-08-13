define('venus-app/router', ['exports', 'ember', 'venus-app/config/environment'], function (exports, Ember, config) {

    'use strict';

    var Foo = Ember['default'].Object.extend({});
    var Bar = Ember['default'].Object.extend({ code: "" });

    var Router = Ember['default'].Router.extend({
        location: config['default'].locationType,
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
        }
    });

    Router.map(function () {
        this.resource('posts', { path: '/' });
        this.resource('sortables');
        this.resource('draggables');
        this.resource('dragula');
    });

    exports['default'] = Router;

});
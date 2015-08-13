define('venus-app/initializers/coordinator-setup', ['exports', 'venus-app/models/coordinator'], function (exports, Coordinator) {

  'use strict';

  exports['default'] = {
    name: "setup coordinator",

    initialize: function initialize(container, app) {
      app.register("drag:coordinator", Coordinator['default']);
      app.inject("component", "coordinator", "drag:coordinator");
    }
  };

});
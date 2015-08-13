define('venus-app/tests/routes/posts.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/posts.js should pass jshint', function() { 
    ok(false, 'routes/posts.js should pass jshint.\nroutes/posts.js: line 6, col 5, \'Post\' is defined but never used.\n\n1 error'); 
  });

});
/* jshint ignore:start */

define('venus-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'venus-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("venus-app/tests/test-helper");
} else {
  require("venus-app/app")["default"].create({"name":"venus-app","version":"0.0.0+c5b3b8b6"});
}

/* jshint ignore:end */

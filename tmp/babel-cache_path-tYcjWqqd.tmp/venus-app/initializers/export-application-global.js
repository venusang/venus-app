

export { initialize };import Ember from 'ember';
import config from '../config/environment';
function initialize(container, application) {
  if (config.exportApplicationGlobal !== false) {
    var value = config.exportApplicationGlobal;
    var globalName;

    if (typeof value === 'string') {
      globalName = value;
    } else {
      globalName = Ember.String.classify(config.modulePrefix);
    }

    if (!window[globalName]) {
      window[globalName] = application;

      application.reopen({
        willDestroy: function willDestroy() {
          this._super.apply(this, arguments);
          delete window[globalName];
        }
      });
    }
  }
}

;

export default {
  name: 'export-application-global',

  initialize: initialize
};
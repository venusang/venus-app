define('venus-app/models/coordinator', ['exports', 'ember', 'venus-app/models/obj-hash'], function (exports, Ember, ObjHash) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend(Ember['default'].Evented, {
    objectMap: (function () {
      return ObjHash['default'].create();
    }).property(),

    getObject: function getObject(id, ops) {
      ops = ops || {};
      var payload = this.get('objectMap').getObj(id);

      if (payload.ops.source) {
        payload.ops.source.sendAction('action', payload.obj);
      }

      if (payload.ops.target) {
        payload.ops.target.sendAction('action', payload.obj);
      }

      this.trigger("objectMoved", { obj: payload.obj, source: payload.ops.source, target: ops.target });

      return payload.obj;
    },

    setObject: function setObject(obj, ops) {
      ops = ops || {};
      return this.get('objectMap').add({ obj: obj, ops: ops });
    }
  });

});
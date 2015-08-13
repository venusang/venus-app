define('ember-cli-auto-complete', ['ember-cli-auto-complete/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-auto-complete/components/auto-complete', ['exports', 'ember', 'ember-cli-auto-complete/utilities/key-codes'], function (exports, Ember, KeyCodes) {

  'use strict';

  var focusOutEvent;

  var VISIBLE = "visible";
  var HIDDEN = "hidden";

  function getNewHighlightIndex(direction, index, length) {
    if (direction === "down" && index < length - 1) {
      return index + 1;
    } else if (direction === "up" && index > 0) {
      return index - 1;
    }
    return index;
  }

  function keepHighlightInView(event) {
    var highlighted = document.getElementsByClassName("tt-cursor")[0];
    if (highlighted) {
      if (KeyCodes['default'].keyPressed(event) === "downArrow") {
        highlighted.scrollIntoView(false);
      } else if (KeyCodes['default'].keyPressed(event) === "upArrow") {
        highlighted.scrollIntoView();
      }
    }
  }
  exports['default'] = Ember['default'].Component.extend({
    layoutName: "components/auto-complete",
    highlightIndex: -1,
    visibility: HIDDEN,
    inputClass: '',
    inputClazz: Ember['default'].computed(function () {
      return "typeahead text-input " + this.get('inputClass');
    }),
    keyUp: function keyUp(event) {
      if (KeyCodes['default'].keyPressed(event) === "escape") {
        this.set("visibility", HIDDEN);
      } else if (!KeyCodes['default'].isEscapedCode(event)) {
        this.set("highlightIndex", -1);
        this.get("options").forEach(function (item) {
          item.set("highlight", false);
        });
        this.set("visibility", VISIBLE);
        this.set("inputVal", Ember['default'].$(event.target).val());
      }
      keepHighlightInView(event);
    },
    focusIn: function focusIn() {
      if (this.get("visibility") === HIDDEN) {
        this.set("visibility", VISIBLE);
      }
    },
    focusOut: function focusOut() {
      clearTimeout(focusOutEvent);
      var self = this;
      var func = function func() {
        if (self.isDestroyed) {
          return;
        }
        self.set("visibility", HIDDEN);
        if (!self.get("selectedFromList")) {
          var value = this.get("selectedValue");
          var optionsToMatch = this.get("optionsToMatch");
          if (optionsToMatch.indexOf(value) === -1) {
            self.set("inputVal", "");
            self.set("selectedValue", "");
          }
        }
      };
      focusOutEvent = Ember['default'].run.later(this, func, 200);
    },
    keyDown: function keyDown(event) {
      if (this.get("visibility") !== HIDDEN) {
        if (KeyCodes['default'].keyPressed(event) === "downArrow") {
          this.highlight("down");
        } else if (KeyCodes['default'].keyPressed(event) === "upArrow") {
          this.highlight("up");
        } else if (KeyCodes['default'].keyPressed(event) === "enter" || KeyCodes['default'].keyPressed(event) === "tab") {
          if (!Ember['default'].isBlank(this.selectableSuggestion)) {
            this.send("selectItem", this.selectableSuggestion);
            this.set("visibility", HIDDEN);
          } else {
            var value = this.get("selectedValue");
            var optionsToMatch = this.get("optionsToMatch");
            if (optionsToMatch.indexOf(value) >= 0) {
              this.set("selectedFromList", true);
              this.set("visibility", HIDDEN);
            }
          }
        }
      } else {
        this.set("visibility", VISIBLE);
      }
    },

    highlight: function highlight(direction) {
      var length = this.get("suggestions").length;
      var currentHighlight = this.get("highlightIndex");
      var nextHighlight = getNewHighlightIndex(direction, currentHighlight, length);

      if (currentHighlight >= 0) {
        this.get("suggestions").objectAt(currentHighlight).set("highlight", false);
      }

      var newSelectedItem = this.get("suggestions").objectAt(nextHighlight);
      newSelectedItem.set("highlight", true);
      this.set("selectableSuggestion", newSelectedItem);
      this.set("highlightIndex", nextHighlight);
    },
    actions: {
      selectItem: function selectItem(item) {
        var valueProperty = this.get("valueProperty");
        this.set("selectedFromList", true);
        this.set("selectedValue", item.get(valueProperty));

        this.sendAction('selectItem', item);
      }
    }
  });

});
define('ember-cli-auto-complete/utilities/key-codes', ['exports'], function (exports) {

  'use strict';

  var keyCodeList = [{ key: "tab", code: 9 }, { key: "enter", code: 13, escaped: true }, { key: "escape", code: 27 }, { key: "upArrow", code: 38, escaped: true }, { key: "downArrow", code: 40, escaped: true }];

  exports['default'] = {
    isEscapedCode: function isEscapedCode(event) {
      var filter = keyCodeList.filter(function (keyCode) {
        return keyCode.code === event.keyCode && keyCode.escaped;
      });
      return filter.length;
    },
    keyPressed: function keyPressed(event) {
      return keyCodeList.filter(function (keyCode) {
        return keyCode.code === event.keyCode;
      }).map(function (keyCode) {
        return keyCode.key;
      })[0];
    }
  };

});
define('ember-drag-drop', ['ember-drag-drop/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-drag-drop/components/draggable-object-target', ['exports', 'ember', 'ember-drag-drop/mixins/droppable'], function (exports, Ember, Droppable) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(Droppable['default'], {
    classNames: ["draggable-object-target"],

    handlePayload: function(payload) {
      var obj = this.get('coordinator').getObject(payload,{target: this});
      this.sendAction('action',obj,{target: this});
    },

    handleDrop: function(event) {
      var dataTransfer = event.dataTransfer;
      var payload = dataTransfer.getData("Text");
      this.handlePayload(payload);
    },

    acceptDrop: function(event) {
      this.handleDrop(event);
      //Firefox is navigating to a url on drop sometimes, this prevents that from happening
      event.preventDefault();
    },

    actions: {
      acceptForDrop: function() {
        var hashId = this.get('coordinator.clickedId');
        this.handlePayload(hashId);
      }
    }
  });

});
define('ember-drag-drop/components/draggable-object', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "div",
    classNames: ["draggable-object"],
    classNameBindings: ["isDraggingObject:is-dragging-object:"],
    attributeBindings: ['draggable'],
    isDraggable: true,

    draggable: function() {
      var isDraggable = this.get('isDraggable');

      if (isDraggable) {
        return true;
      }
      else {
        return null;
      }
    }.property('isDraggable'),

    handleDragStart: function(event) {

      var dataTransfer = event.dataTransfer;

      var obj = this.get('content');
      var id = this.get('coordinator').setObject(obj, { source: this });

      dataTransfer.setData('Text', id);

      if (obj) {
        Ember['default'].set(obj, 'isDraggingObject', true);
      }
      this.set('isDraggingObject', true);
    }.on("dragStart"),

    handleDragEnd: function() {
      var obj = this.get('content');

      if (obj) {
        Ember['default'].set(obj, 'isDraggingObject', false);
      }
      this.set('isDraggingObject', false);
    }.on("dragEnd"),

    actions: {
      selectForDrag: function() {
        var obj = this.get('content');
        var hashId = this.get('coordinator').setObject(obj, { source: this });
        this.get('coordinator').set("clickedId", hashId);
      }
    }
  });

});
define('ember-drag-drop/components/object-bin', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var YieldLocalMixin = Ember['default'].Mixin.create({
    _yield: function(context, options) {
      var view = options.data.view;
      var parentView = this._parentView;
      var template = Ember['default'].get(this, 'template');

      if (template) {
        Ember['default'].assert("A Component must have a parent view in order to yield.", parentView);

        view.appendChild(Ember['default'].View, {
          isVirtual: true,
          tagName: '',
          _contextView: parentView,
          template: template,
          context: Ember['default'].get(view, 'context'),
          controller: Ember['default'].get(view, 'controller'),
          templateData: { keywords: {} }
        });
      }
    }
  });

  var removeOne = function(arr,obj) {
    var l = arr.get('length');
    arr.removeObject(obj);
    var l2 = arr.get('length');

    if (l-1 !== l2) {
      throw "bad length " + l + " " + l2;
    }
  };

  exports['default'] = Ember['default'].Component.extend(YieldLocalMixin, {
    model: [],
    classNames: ['draggable-object-bin'],

    manageList: true,

    handleObjectMoved: function() {
    }.on("objectMoved"),

    actions: {
      handleObjectDropped: function(obj) {
        if (this.get('manageList')) {
          this.get("model").pushObject(obj);
        }

        this.trigger("objectDroppedInternal",obj);
        this.sendAction("objectDropped",{obj: obj, bin: this});
      },

      handleObjectDragged: function(obj) {
        if (this.get('manageList')) {
          removeOne(this.get('model'),obj);
        }
        this.trigger("objectDraggedInternal",obj);
        this.sendAction("objectDragged");

      }
    }
  });

});
define('ember-drag-drop/mixins/droppable', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Droppable = Ember['default'].Mixin.create({

    classNameBindings: [
      'accepts-drag',
      'self-drop'
    ],

    /**
     * Read-only className property that is set to true when the component is
     * receiving a valid drag event. You can style your element with
     * `.accepts-drag`.
     *
     * @property accepts-drag
     * @private
     */

    'accepts-drag': false,

    /**
     * Will be true when the component is dragged over itself. Can use
     * `.self-drop` in your css to style (or more common, unstyle) the component.
     *
     * @property self-drop
     * @private
     */

    'self-drop': false,

   /**
     * Validates drag events. Override this to restrict which data types your
     * component accepts.
     *
     * Example:
     *
     * ```js
     * validateDragEvent: function(event) {
     *   return event.dataTransfer.types.contains('text/x-foo');
     * }
     * ```
     *
     * @method validateDragEvent
     * @public
     */

    validateDragEvent: function() {
      return true;
    },

    /**
     * Called when a valid drag event is dropped on the component. Override to
     * actually make something happen.
     *
     * ```js
     * acceptDrop: function(event) {
     *   var data = event.dataTransfer.getData('text/plain');
     *   doSomethingWith(data);
     * }
     * ```
     *
     * @method acceptDrop
     * @public
     */

    acceptDrop: Ember['default'].K,

    /**
     * @method _handleDragOver
     * @private
     */

    _handleDragOver: function(event) {
      if (this._droppableIsDraggable(event)) {
        this.set('self-drop', true);
      }
      if (this.get('accepts-drag')) {
        return this._allowDrop(event);
      }
      if (this.validateDragEvent(event)) {
        this.set('accepts-drag', true);
        this._allowDrop(event);
      } else {
        this._resetDroppability();
      }
    }.on('dragOver'),

    /**
     * @method _handleDrop
     * @private
     */

    _handleDrop: function(event) {
      // have to validate on drop because you may have nested sortables the
      // parent allows the drop but the child receives it, revalidating allows
      // the event to bubble up to the parent to handle it
      if (!this.validateDragEvent(event)) {
        return;
      }
      this.acceptDrop(event);
      this._resetDroppability();
      // TODO: might not need this? I can't remember why its here
      event.stopPropagation();
      return false;
    }.on('drop'),

    /**
     * Tells the browser we have an acceptable drag event.
     *
     * @method _allowDrop
     * @private
     */

    _allowDrop: function(event) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    },

    /**
     * We want to be able to know if the current drop target is the original
     * element being dragged or a child of it.
     *
     * @method _droppableIsDraggable
     * @private
     */

    _droppableIsDraggable: function(event) {
      return Droppable._currentDrag && (
        Droppable._currentDrag === event.target ||
        Droppable._currentDrag.contains(event.target)
      );
    },

    /**
     * @method _resetDroppability
     * @private
     */

    _resetDroppability: function() {
      this.set('accepts-drag', false);
      this.set('self-drop', false);
    }.on('dragLeave')

  });

  // Need to track this so we can determine `self-drop`.
  // It's on `Droppable` so we can test :\
  Droppable._currentDrag = null;
  window.addEventListener('dragstart', function(event) {
    Droppable._currentDrag = event.target;
  }, true);

  exports['default'] = Droppable;

});
define('ember-dragula', ['ember-dragula/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-dragula/components/ember-dragula-container', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({
		didInsertElement: function didInsertElement() {
			Ember['default'].run.next((function () {
				this.get('parentView').drake.containers.push(this.element);
			}).bind(this));
		},
		setElementIdToChildren: function setElementIdToChildren() {
			var childViews = this.get('childViews');
			var elementToChild = {};
			childViews.forEach(function (view) {
				elementToChild[view.elementId] = view.tree;
			});
		},
		willDestroyElement: function willDestroyElement() {}
	});

});
define('ember-dragula/components/ember-dragula', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({
		willInsertElement: function willInsertElement() {
			var options = this.config.options || {};
			this.set('drake', dragula(options));
			this.set('parent', this);
		},
		didInsertElement: function didInsertElement() {
			this.setEventListeners();
		},
		setEventListeners: function setEventListeners() {
			this.config.eventList ? this.config.eventList.forEach((function (event) {
				this.drake.on(event.name, (function () {
					this.sendAction('dragulaEvent', event.name, arguments);
				}).bind(this));
			}).bind(this)) : "";
		},
		willDestroyElement: function willDestroyElement() {
			this.drake.containers.removeObject(this.element);
			this.drake.destroy();
			this.set('drake', '');
		}
	});

});//# sourceMappingURL=addons.map
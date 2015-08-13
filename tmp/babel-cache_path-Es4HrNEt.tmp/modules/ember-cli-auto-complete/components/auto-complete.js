import Ember from "ember";
import KeyCodes from '../utilities/key-codes';

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
    if (KeyCodes.keyPressed(event) === "downArrow") {
      highlighted.scrollIntoView(false);
    } else if (KeyCodes.keyPressed(event) === "upArrow") {
      highlighted.scrollIntoView();
    }
  }
}
export default Ember.Component.extend({
  layoutName: "components/auto-complete",
  highlightIndex: -1,
  visibility: HIDDEN,
  inputClass: '',
  inputClazz: Ember.computed(function () {
    return "typeahead text-input " + this.get('inputClass');
  }),
  keyUp: function keyUp(event) {
    if (KeyCodes.keyPressed(event) === "escape") {
      this.set("visibility", HIDDEN);
    } else if (!KeyCodes.isEscapedCode(event)) {
      this.set("highlightIndex", -1);
      this.get("options").forEach(function (item) {
        item.set("highlight", false);
      });
      this.set("visibility", VISIBLE);
      this.set("inputVal", Ember.$(event.target).val());
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
    focusOutEvent = Ember.run.later(this, func, 200);
  },
  keyDown: function keyDown(event) {
    if (this.get("visibility") !== HIDDEN) {
      if (KeyCodes.keyPressed(event) === "downArrow") {
        this.highlight("down");
      } else if (KeyCodes.keyPressed(event) === "upArrow") {
        this.highlight("up");
      } else if (KeyCodes.keyPressed(event) === "enter" || KeyCodes.keyPressed(event) === "tab") {
        if (!Ember.isBlank(this.selectableSuggestion)) {
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
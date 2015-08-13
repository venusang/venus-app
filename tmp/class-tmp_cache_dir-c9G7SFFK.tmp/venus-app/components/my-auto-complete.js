define('venus-app/components/my-auto-complete', ['exports', 'ember-cli-auto-complete/components/auto-complete'], function (exports, AutoComplete) {

    'use strict';

    exports['default'] = AutoComplete['default'].extend({
        valueProperty: "code",
        suggestions: (function () {
            var inputVal = this.get("inputVal") || "";
            return this.get("options").filter(function (item) {
                return item.get("code").toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
            });
        }).property("inputVal", "options.@each"),
        optionsToMatch: (function () {
            var caseInsensitiveOptions = [];
            this.get("options").forEach(function (item) {
                var value = item.get("code");
                caseInsensitiveOptions.push(value);
                caseInsensitiveOptions.push(value.toLowerCase());
            });
            return caseInsensitiveOptions;
        }).property("options.@each")
    });

});
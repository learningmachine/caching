"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpers = require("./helpers");

var LocalStorageCache = (function () {
    function LocalStorageCache() {
        _classCallCheck(this, LocalStorageCache);
    }

    _createClass(LocalStorageCache, [{
        key: "set",
        value: function set(key, value, durationMS) {
            var expire = durationMS ? Date.now() + durationMS : null;
            localStorage[key] = JSON.stringify({ value: value, expire: expire });
        }
    }, {
        key: "get",
        value: function get(key) {
            var val = JSON.parse(localStorage[key] || "null");
            if (val) {
                if (!(0, _helpers.isExpired)(val)) {
                    return val.value;
                } else {
                    this.remove(key);
                }
            }
            return null;
        }
    }, {
        key: "remove",
        value: function remove(key) {
            delete localStorage[key];
        }
    }]);

    return LocalStorageCache;
})();

exports.LocalStorageCache = LocalStorageCache;
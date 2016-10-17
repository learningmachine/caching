"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpers = require("./helpers");

var MemoryCache = (function () {
    function MemoryCache() {
        _classCallCheck(this, MemoryCache);

        this.cache = {};
    }

    _createClass(MemoryCache, [{
        key: "set",
        value: function set(key, value) {
            var durationMS = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            var expire = durationMS ? Date.now() + durationMS : null;
            this.cache[key] = { value: value, expire: expire };
        }
    }, {
        key: "get",
        value: function get(key) {
            var val = this.cache[key];
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
            delete this.cache[key];
        }
    }]);

    return MemoryCache;
})();

exports.MemoryCache = MemoryCache;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScopedCache = (function () {
    function ScopedCache(scope, cache) {
        _classCallCheck(this, ScopedCache);

        this.scope = scope;
        this.cache = cache;
    }

    _createClass(ScopedCache, [{
        key: "setScope",
        value: function setScope(scope) {
            this.scope = scope;
        }
    }, {
        key: "set",
        value: function set(key, value) {
            var durationMS = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            return this.cache.set(this.scope + "-" + key, value, durationMS);
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.cache.get(this.scope + "-" + key);
        }
    }, {
        key: "remove",
        value: function remove(key) {
            this.cache.remove(this.scope + "-" + key);
        }
    }]);

    return ScopedCache;
})();

exports.ScopedCache = ScopedCache;
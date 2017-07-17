"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpers = require("./helpers");

var _memoryCache = require("./memory-cache");

var canUseLocalStorage = true;
var fallback = null;
try {
    localStorage.setItem("__testing", "__testing");
    localStorage.removeItem("__testing");
} catch (err) {
    canUseLocalStorage = false;
    fallback = new _memoryCache.MemoryCache();
}

var LocalStorageCache = (function () {
    function LocalStorageCache() {
        _classCallCheck(this, LocalStorageCache);
    }

    _createClass(LocalStorageCache, [{
        key: "set",
        value: function set(key, value, durationMS) {
            if (!canUseLocalStorage) return fallback.set(key, value, durationMS);
            var expire = durationMS ? Date.now() + durationMS : null;
            localStorage[key] = JSON.stringify({ value: value, expire: expire });
        }
    }, {
        key: "get",
        value: function get(key) {
            if (!canUseLocalStorage) return fallback.get(key);
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
            if (!canUseLocalStorage) return fallback.remove(key);
            delete localStorage[key];
        }
    }]);

    return LocalStorageCache;
})();

exports.LocalStorageCache = LocalStorageCache;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpers = require("./helpers");

var CookieCache = (function () {
    function CookieCache() {
        var CookieName = arguments.length <= 0 || arguments[0] === undefined ? "__cookie_cache" : arguments[0];

        _classCallCheck(this, CookieCache);

        this.CookieName = CookieName;
    }

    _createClass(CookieCache, [{
        key: "set",
        value: function set(key, value) {
            var durationMS = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            var expire = durationMS ? Date.now() + durationMS : null;
            var currentEntries = this.getCacheEntries();
            currentEntries[key] = { value: value, expire: expire };
            this.setCacheEntries(currentEntries);
        }
    }, {
        key: "get",
        value: function get(key) {
            var currentEntries = this.getCacheEntries();
            var val = currentEntries[key];
            if (val) {
                if (!(0, _helpers.isExpired)(val)) {
                    return val.value;
                } else {
                    // expired, delete
                    this.remove(key);
                }
            }
            return null;
        }
    }, {
        key: "remove",
        value: function remove(key) {
            var currentEntries = this.getCacheEntries();
            delete currentEntries[key];
            this.setCacheEntries(currentEntries);
        }
    }, {
        key: "getCacheEntries",
        value: function getCacheEntries() {
            var decoded = window.atob(document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + this.CookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"));
            return JSON.parse(decoded || "{}");
        }
    }, {
        key: "setCacheEntries",
        value: function setCacheEntries(entries) {
            var encoded = window.btoa(JSON.stringify(entries));
            document.cookie = this.CookieName + "=" + encoded + ";  expires=0; path=/";
        }
    }]);

    return CookieCache;
})();

exports.CookieCache = CookieCache;
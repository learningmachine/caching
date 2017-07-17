var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Cache = function Cache() {
  classCallCheck(this, Cache);
};

function isExpired(val) {
    if (val.expire == null) return false;
    return val.expire < Date.now();
}
function cacheFor(n) {
    var seconds = n * 1000;
    var minutes = n * 60 * 1000;
    var hours = n * 60 * 60 * 1000;
    return { minutes: minutes, seconds: seconds, hours: hours };
}

var MemoryCache = function () {
    function MemoryCache() {
        classCallCheck(this, MemoryCache);

        this.cache = {};
    }

    createClass(MemoryCache, [{
        key: "set",
        value: function set$$1(key, value) {
            var durationMS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var expire = durationMS ? Date.now() + durationMS : null;
            this.cache[key] = { value: value, expire: expire };
        }
    }, {
        key: "get",
        value: function get$$1(key) {
            var val = this.cache[key];
            if (val) {
                if (!isExpired(val)) {
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
    }, {
        key: "clearAll",
        value: function clearAll() {
            this.cache = {};
        }
    }]);
    return MemoryCache;
}();

var CookieCache = function () {
    function CookieCache() {
        var CookieName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "__cookie_cache";
        classCallCheck(this, CookieCache);

        this.CookieName = CookieName;
    }

    createClass(CookieCache, [{
        key: "set",
        value: function set$$1(key, value) {
            var durationMS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var expire = durationMS ? Date.now() + durationMS : null;
            var currentEntries = this.getCacheEntries();
            currentEntries[key] = { value: value, expire: expire };
            this.setCacheEntries(currentEntries);
        }
    }, {
        key: "get",
        value: function get$$1(key) {
            var currentEntries = this.getCacheEntries();
            var val = currentEntries[key];
            if (val) {
                if (!isExpired(val)) {
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
}();

var canUseLocalStorage = true;
var fallback = null;
try {
    localStorage.setItem("__testing", "__testing");
    localStorage.removeItem("__testing");
} catch (err) {
    canUseLocalStorage = false;
    fallback = new MemoryCache();
}
var LocalStorageCache = function () {
    function LocalStorageCache() {
        classCallCheck(this, LocalStorageCache);
    }

    createClass(LocalStorageCache, [{
        key: "set",
        value: function set$$1(key, value, durationMS) {
            if (!canUseLocalStorage) return fallback.set(key, value, durationMS);
            var expire = durationMS ? Date.now() + durationMS : null;
            localStorage[key] = JSON.stringify({ value: value, expire: expire });
        }
    }, {
        key: "get",
        value: function get$$1(key) {
            if (!canUseLocalStorage) return fallback.get(key);
            var val = JSON.parse(localStorage[key] || "null");
            if (val) {
                if (!isExpired(val)) {
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
}();

var ScopedCache = function () {
    function ScopedCache(scope, cache) {
        classCallCheck(this, ScopedCache);

        this.scope = scope;
        this.cache = cache;
    }

    createClass(ScopedCache, [{
        key: "setScope",
        value: function setScope(scope) {
            this.scope = scope;
        }
    }, {
        key: "set",
        value: function set$$1(key, value) {
            var durationMS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return this.cache.set(this.scope + "-" + key, value, durationMS);
        }
    }, {
        key: "get",
        value: function get$$1(key) {
            return this.cache.get(this.scope + "-" + key);
        }
    }, {
        key: "remove",
        value: function remove(key) {
            this.cache.remove(this.scope + "-" + key);
        }
    }]);
    return ScopedCache;
}();

export { Cache, cacheFor, MemoryCache, CookieCache, LocalStorageCache, ScopedCache };

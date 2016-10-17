"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isExpired = isExpired;
exports.cacheFor = cacheFor;

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
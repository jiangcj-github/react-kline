'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = exports.Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'fromFloat',
        value: function fromFloat(v, fractionDigits) {
            var text = v.toFixed(fractionDigits);
            for (var i = text.length - 1; i >= 0; i--) {
                if (text[i] === '.') return text.substring(0, i);
                if (text[i] !== '0') return text.substring(0, i + 1);
            }
        }
    }, {
        key: 'formatTime',
        value: function formatTime(v) {
            return v < 10 ? "0" + v.toString() : v.toString();
        }
    }, {
        key: 'isInstance',
        value: function isInstance(obj, clazz) {
            if (obj === null || obj === undefined) {
                return false;
            }
            return obj instanceof clazz;
        }
    }]);

    return Util;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MEvent = exports.MEvent = function () {
    function MEvent() {
        _classCallCheck(this, MEvent);

        this._handlers = [];
    }

    _createClass(MEvent, [{
        key: "addHandler",
        value: function addHandler(o, f) {
            if (this.indexOf(o, f) < 0) this._handlers.push({ obj: o, func: f });
        }
    }, {
        key: "removeHandler",
        value: function removeHandler(o, f) {
            var i = this.indexOf(o, f);
            if (i >= 0) this._handlers.splice(i, 1);
        }
    }, {
        key: "raise",
        value: function raise(s, g) {
            var a = this._handlers;
            var e = void 0,
                i = void 0,
                c = a.length;
            for (i = 0; i < c; i++) {
                e = a[i];
                e.func(s, g);
            }
        }
    }, {
        key: "indexOf",
        value: function indexOf(o, f) {
            var a = this._handlers;
            var e = void 0,
                i = void 0,
                c = a.length;
            for (i = 0; i < c; i++) {
                e = a[i];
                if (o === e.obj && f === e.func) return i;
            }
            return -1;
        }
    }]);

    return MEvent;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CName = exports.CName = function () {
    function CName(name) {
        _classCallCheck(this, CName);

        this._names = [];
        this._comps = [];
        if (name instanceof CName) {
            this._names = name._names;
            this._comps = name._comps;
        } else {
            var comps = name.split(".");
            var dotNum = comps.length - 1;
            if (dotNum > 0) {
                this._comps = comps;
                this._names.push(comps[0]);
                for (var i = 1; i <= dotNum; i++) {
                    this._names.push(this._names[i - 1] + "." + comps[i]);
                }
            } else {
                this._comps.push(name);
                this._names.push(name);
            }
        }
    }

    _createClass(CName, [{
        key: "getCompAt",
        value: function getCompAt(index) {
            if (index >= 0 && index < this._comps.length) return this._comps[index];
            return "";
        }
    }, {
        key: "getName",
        value: function getName(index) {
            if (index < 0) {
                if (this._names.length > 0) return this._names[this._names.length - 1];
            } else if (index < this._names.length) {
                return this._names[index];
            }
            return "";
        }
    }]);

    return CName;
}();
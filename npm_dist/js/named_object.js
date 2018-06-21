'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NamedObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cname = require('./cname');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NamedObject = exports.NamedObject = function () {
    function NamedObject(name) {
        _classCallCheck(this, NamedObject);

        this._name = name;
        this._nameObj = new _cname.CName(name);
    }

    _createClass(NamedObject, [{
        key: 'getFrameName',
        value: function getFrameName() {
            return this._nameObj.getName(0);
        }
    }, {
        key: 'getDataSourceName',
        value: function getDataSourceName() {
            return this._nameObj.getName(1);
        }
    }, {
        key: 'getAreaName',
        value: function getAreaName() {
            return this._nameObj.getName(2);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this._nameObj.getName(-1);
        }
    }, {
        key: 'getNameObject',
        value: function getNameObject() {
            return this._nameObj;
        }
    }, {
        key: 'getRectCrossPt',
        value: function getRectCrossPt(rect, startPt, endPt) {
            var crossPt = void 0;
            var firstPt = { x: -1, y: -1 };
            var secondPt = { x: -1, y: -1 };
            var xdiff = endPt.x - startPt.x;
            var ydiff = endPt.y - startPt.y;
            if (Math.abs(xdiff) < 2) {
                firstPt = { x: startPt.x, y: rect.top };
                secondPt = { x: endPt.x, y: rect.bottom };
                crossPt = [firstPt, secondPt];
                return crossPt;
            }
            var k = ydiff / xdiff;
            secondPt.x = rect.right;
            secondPt.y = startPt.y + (rect.right - startPt.x) * k;
            firstPt.x = rect.left;
            firstPt.y = startPt.y + (rect.left - startPt.x) * k;
            crossPt = [firstPt, secondPt];
            return crossPt;
        }
    }]);

    return NamedObject;
}();
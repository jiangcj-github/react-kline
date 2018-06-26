'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CPoint = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chart_manager = require('./chart_manager');

var _named_object = require('./named_object');

var _data_sources = require('./data_sources');

var data_sources = _interopRequireWildcard(_data_sources);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CPoint = exports.CPoint = function (_NamedObject) {
    _inherits(CPoint, _NamedObject);

    function CPoint(name) {
        _classCallCheck(this, CPoint);

        var _this = _possibleConstructorReturn(this, (CPoint.__proto__ || Object.getPrototypeOf(CPoint)).call(this, name));

        _this.pos = { index: -1, value: -1 };

        _this.state = CPoint.state.Hide;
        return _this;
    }

    _createClass(CPoint, [{
        key: 'getChartObjects',
        value: function getChartObjects() {
            var ppMgr = _chart_manager.ChartManager.instance;
            var ppCDS = ppMgr.getDataSource("frame0.k0");
            if (ppCDS === null || !_util.Util.isInstance(ppCDS, data_sources.MainDataSource)) return null;
            var ppTimeline = ppMgr.getTimeline("frame0.k0");
            if (ppTimeline === null) return null;
            var ppRange = ppMgr.getRange("frame0.k0.main");
            if (ppRange === null) return null;
            return { pMgr: ppMgr, pCDS: ppCDS, pTimeline: ppTimeline, pRange: ppRange };
        }
    }, {
        key: 'setPosXY',
        value: function setPosXY(x, y) {
            var pObj = this.getChartObjects();
            var i = pObj.pTimeline.toIndex(x);
            var v = pObj.pRange.toValue(y);
            var result = this.snapValue(i, v);
            if (result !== null) v = result;
            this.setPosIV(i, v);
        }
    }, {
        key: 'setPosXYNoSnap',
        value: function setPosXYNoSnap(x, y) {
            var pObj = this.getChartObjects();
            var i = pObj.pTimeline.toIndex(x);
            var v = pObj.pRange.toValue(y);
            this.setPosIV(i, v);
        }
    }, {
        key: 'setPosIV',
        value: function setPosIV(i, v) {
            this.pos = { index: i, value: v };
        }
    }, {
        key: 'getPosXY',
        value: function getPosXY() {
            var pObj = this.getChartObjects();
            var _x = pObj.pTimeline.toItemCenter(this.pos.index);
            var _y = pObj.pRange.toY(this.pos.value);
            return { x: _x, y: _y };
        }
    }, {
        key: 'getPosIV',
        value: function getPosIV() {
            return { i: this.pos.index, v: this.pos.value };
        }
    }, {
        key: 'setState',
        value: function setState(s) {
            this.state = s;
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            var xy = this.getPosXY();
            if (x < xy.x - 4 || x > xy.x + 4 || y < xy.y - 4 || y > xy.y + 4) return false;
            this.setState(CPoint.state.Highlight);
            return true;
        }
    }, {
        key: 'snapValue',
        value: function snapValue(i, v) {
            var pObj = this.getChartObjects();
            var result = null;
            var first = Math.floor(pObj.pTimeline.getFirstIndex());
            var last = Math.floor(pObj.pTimeline.getLastIndex());
            if (i < first || i > last) return result;
            var y = pObj.pRange.toY(v);
            var pData = pObj.pCDS.getDataAt(i);
            if (pData === null || pData === undefined) return result;
            var pDataPre = null;
            if (i > 0) pDataPre = pObj.pCDS.getDataAt(i - 1);else pDataPre = pObj.pCDS.getDataAt(i);
            var candleStickStyle = pObj.pMgr.getChartStyle(pObj.pCDS.getFrameName());
            var open = pObj.pRange.toY(pData.open);
            var high = pObj.pRange.toY(pData.high);
            var low = pObj.pRange.toY(pData.low);
            var close = pObj.pRange.toY(pData.close);
            if (candleStickStyle === "CandleStickHLC") {
                open = pObj.pRange.toY(pDataPre.close);
            }
            var dif_open = Math.abs(open - y);
            var dif_high = Math.abs(high - y);
            var dif_low = Math.abs(low - y);
            var dif_close = Math.abs(close - y);
            if (dif_open <= dif_high && dif_open <= dif_low && dif_open <= dif_close) {
                if (dif_open < 6) result = pData.open;
            }
            if (dif_high <= dif_open && dif_high <= dif_low && dif_high <= dif_close) {
                if (dif_high < 6) result = pData.high;
            }
            if (dif_low <= dif_open && dif_low <= dif_high && dif_low <= dif_close) {
                if (dif_low < 6) result = pData.low;
            }
            if (dif_close <= dif_open && dif_close <= dif_high && dif_close <= dif_low) {
                if (dif_close < 6) result = pData.close;
            }
            return result;
        }
    }]);

    return CPoint;
}(_named_object.NamedObject);

CPoint.state = {
    Hide: 0,
    Show: 1,
    Highlight: 2
};
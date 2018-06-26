'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PercentageRange = exports.ZeroCenteredRange = exports.MainRange = exports.ZeroBasedPositiveRange = exports.PositiveRange = exports.Range = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _named_object = require('./named_object');

var _chart_manager = require('./chart_manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Range = exports.Range = function (_NamedObject) {
    _inherits(Range, _NamedObject);

    function Range(name) {
        _classCallCheck(this, Range);

        var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, name));

        _this._updated = true;
        _this._minValue = Number.MAX_VALUE;
        _this._maxValue = -Number.MAX_VALUE;
        _this._outerMinValue = Number.MAX_VALUE;
        _this._outerMaxValue = -Number.MAX_VALUE;
        _this._ratio = 0;
        _this._top = 0;
        _this._bottom = 0;
        _this._paddingTop = 0;
        _this._paddingBottom = 0;
        _this._minInterval = 36;
        _this._selectedPosition = -1;
        _this._selectedValue = -Number.MAX_VALUE;
        _this._gradations = [];
        return _this;
    }

    _createClass(Range, [{
        key: 'isUpdated',
        value: function isUpdated() {
            return this._updated;
        }
    }, {
        key: 'setUpdated',
        value: function setUpdated(v) {
            this._updated = v;
        }
    }, {
        key: 'getMinValue',
        value: function getMinValue() {
            return this._minValue;
        }
    }, {
        key: 'getMaxValue',
        value: function getMaxValue() {
            return this._maxValue;
        }
    }, {
        key: 'getRange',
        value: function getRange() {
            return this._maxValue - this._minValue;
        }
    }, {
        key: 'getOuterMinValue',
        value: function getOuterMinValue() {
            return this._outerMinValue;
        }
    }, {
        key: 'getOuterMaxValue',
        value: function getOuterMaxValue() {
            return this._outerMaxValue;
        }
    }, {
        key: 'getOuterRange',
        value: function getOuterRange() {
            return this._outerMaxValue - this._outerMinValue;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return Math.max(0, this._bottom - this._top);
        }
    }, {
        key: 'getGradations',
        value: function getGradations() {
            return this._gradations;
        }
    }, {
        key: 'getMinInterval',
        value: function getMinInterval() {
            return this._minInterval;
        }
    }, {
        key: 'setMinInterval',
        value: function setMinInterval(v) {
            this._minInterval = v;
        }
    }, {
        key: 'getSelectedPosition',
        value: function getSelectedPosition() {
            if (this._selectedPosition >= 0) {
                return this._selectedPosition;
            }
            if (this._selectedValue > -Number.MAX_VALUE) {
                return this.toY(this._selectedValue);
            }
            return -1;
        }
    }, {
        key: 'getSelectedValue',
        value: function getSelectedValue() {
            if (this._selectedValue > -Number.MAX_VALUE) {
                return this._selectedValue;
            }
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            if (area === null) {
                return -Number.MAX_VALUE;
            }
            if (this._selectedPosition < area.getTop() + 12 || this._selectedPosition >= area.getBottom() - 4) {
                return -Number.MAX_VALUE;
            }
            return this.toValue(this._selectedPosition);
        }
    }, {
        key: 'setPaddingTop',
        value: function setPaddingTop(p) {
            this._paddingTop = p;
        }
    }, {
        key: 'setPaddingBottom',
        value: function setPaddingBottom(p) {
            this._paddingBottom = p;
        }
    }, {
        key: 'toValue',
        value: function toValue(y) {
            return this._maxValue - (y - this._top) / this._ratio;
        }
    }, {
        key: 'toY',
        value: function toY(value) {
            if (this._ratio > 0) {
                return this._top + Math.floor((this._maxValue - value) * this._ratio + 0.5);
            }
            return this._top;
        }
    }, {
        key: 'toHeight',
        value: function toHeight(value) {
            if (value == Infinity || this._ratio == 0) {
                return 1.5;
            }
            return Math.floor(value * this._ratio + 1.5);
        }
    }, {
        key: 'update',
        value: function update() {
            var min = Number.MAX_VALUE;
            var max = -Number.MAX_VALUE;
            var mgr = _chart_manager.ChartManager.instance;
            var dp = void 0,
                dpNames = [".main", ".secondary"];
            for (var i = 0; i < dpNames.length; i++) {
                dp = mgr.getDataProvider(this.getName() + dpNames[i]);
                if (dp !== null && dp !== undefined) {
                    min = Math.min(min, dp.getMinValue());
                    max = Math.max(max, dp.getMaxValue());
                }
            }
            var r = { "min": min, "max": max };
            this.preSetRange(r);
            this.setRange(r.min, r.max);
        }
    }, {
        key: 'select',
        value: function select(v) {
            this._selectedValue = v;
            this._selectedPosition = -1;
        }
    }, {
        key: 'selectAt',
        value: function selectAt(y) {
            this._selectedPosition = y;
            this._selectedValue = -Number.MAX_VALUE;
        }
    }, {
        key: 'unselect',
        value: function unselect() {
            this._selectedPosition = -1;
            this._selectedValue = -Number.MAX_VALUE;
        }
    }, {
        key: 'preSetRange',
        value: function preSetRange(r) {
            if (r.min === r.max) {
                r.min = -1.0;
                r.max = 1.0;
            }
        }
    }, {
        key: 'setRange',
        value: function setRange(minValue, maxValue) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            if (this._minValue === minValue && this._maxValue === maxValue && !area.isChanged()) {
                return;
            }
            this._updated = true;
            this._minValue = minValue;
            this._maxValue = maxValue;
            this._gradations = [];
            var top = area.getTop() + this._paddingTop;
            var bottom = area.getBottom() - (this._paddingBottom + 1);
            if (top >= bottom) {
                this._minValue = this._maxValue;
                return;
            }
            this._top = top;
            this._bottom = bottom;
            if (this._maxValue > this._minValue) this._ratio = (bottom - top) / (this._maxValue - this._minValue);else {
                this._ratio = 1;
            }
            this._outerMinValue = this.toValue(area.getBottom());
            this._outerMaxValue = this.toValue(area.getTop());
            this.updateGradations();
        }
    }, {
        key: 'calcInterval',
        value: function calcInterval() {
            var H = this.getHeight();
            var h = this.getMinInterval();
            if (H / h <= 1) {
                h = H >> 1;
            }
            var d = this.getRange();
            var i = 0;
            while (i > -2 && Math.floor(d) < d) {
                d *= 10.0;
                i--;
            }
            var m = void 0,
                c = void 0;
            for (;; i++) {
                c = Math.pow(10.0, i);
                m = c;
                if (this.toHeight(m) > h) break;
                m = 2.0 * c;
                if (this.toHeight(m) > h) break;
                m = 5.0 * c;
                if (this.toHeight(m) > h) break;
            }
            return m;
        }
    }, {
        key: 'updateGradations',
        value: function updateGradations() {
            this._gradations = [];
            var interval = this.calcInterval();
            if (interval <= 0.0) {
                return;
            }
            var v = Math.floor(this.getMaxValue() / interval) * interval;
            do {
                this._gradations.push(v);
                v -= interval;
            } while (v > this.getMinValue());
        }
    }]);

    return Range;
}(_named_object.NamedObject);

var PositiveRange = exports.PositiveRange = function (_Range) {
    _inherits(PositiveRange, _Range);

    function PositiveRange(name) {
        _classCallCheck(this, PositiveRange);

        return _possibleConstructorReturn(this, (PositiveRange.__proto__ || Object.getPrototypeOf(PositiveRange)).call(this, name));
    }

    _createClass(PositiveRange, [{
        key: 'preSetRange',
        value: function preSetRange(r) {
            if (r.min < 0) r.min = 0;
            if (r.max < 0) r.max = 0;
        }
    }]);

    return PositiveRange;
}(Range);

var ZeroBasedPositiveRange = exports.ZeroBasedPositiveRange = function (_Range2) {
    _inherits(ZeroBasedPositiveRange, _Range2);

    function ZeroBasedPositiveRange(name) {
        _classCallCheck(this, ZeroBasedPositiveRange);

        return _possibleConstructorReturn(this, (ZeroBasedPositiveRange.__proto__ || Object.getPrototypeOf(ZeroBasedPositiveRange)).call(this, name));
    }

    _createClass(ZeroBasedPositiveRange, [{
        key: 'preSetRange',
        value: function preSetRange(r) {
            r.min = 0;
            if (r.max < 0) r.max = 0;
        }
    }]);

    return ZeroBasedPositiveRange;
}(Range);

var MainRange = exports.MainRange = function (_Range3) {
    _inherits(MainRange, _Range3);

    function MainRange(name) {
        _classCallCheck(this, MainRange);

        return _possibleConstructorReturn(this, (MainRange.__proto__ || Object.getPrototypeOf(MainRange)).call(this, name));
    }

    _createClass(MainRange, [{
        key: 'preSetRange',
        value: function preSetRange(r) {
            var mgr = _chart_manager.ChartManager.instance;

            var timeline = mgr.getTimeline(this.getDataSourceName());
            var dIndex = timeline.getMaxIndex() - timeline.getLastIndex();
            if (dIndex < 25) {
                var ds = mgr.getDataSource(this.getDataSourceName());

                var data = ds.getDataAt(ds.getDataCount() - 1);
                var d = (r.max - r.min) / 4 * (1 - dIndex / 25);

                r.min = Math.min(r.min, Math.max(data.low - d, 0));
                r.max = Math.max(r.max, data.high + d);
            }

            if (r.min > 0) {
                var a = r.max / r.min;

                if (a < 1.016) {
                    var m = (r.max + r.min) / 2.0;
                    var c = (a - 1.0) * 1.5;
                    r.max = m * (1.0 + c);
                    r.min = m * (1.0 - c);
                } else if (a < 1.048) {
                    var _m = (r.max + r.min) / 2.0;
                    r.max = _m * 1.024;
                    r.min = _m * 0.976;
                }
            }
            if (r.min < 0) r.min = 0;
            if (r.max < 0) r.max = 0;
        }
    }]);

    return MainRange;
}(Range);

var ZeroCenteredRange = exports.ZeroCenteredRange = function (_Range4) {
    _inherits(ZeroCenteredRange, _Range4);

    function ZeroCenteredRange(name) {
        _classCallCheck(this, ZeroCenteredRange);

        return _possibleConstructorReturn(this, (ZeroCenteredRange.__proto__ || Object.getPrototypeOf(ZeroCenteredRange)).call(this, name));
    }

    _createClass(ZeroCenteredRange, [{
        key: 'calcInterval',
        value: function calcInterval(area) {
            var h = this.getMinInterval();
            if (area.getHeight() / h < 2) {
                return 0.0;
            }
            var r = this.getRange();
            var i = void 0;
            for (i = 3;; i += 2) {
                if (this.toHeight(r / i) <= h) break;
            }
            i -= 2;
            return r / i;
        }
    }, {
        key: 'updateGradations',
        value: function updateGradations() {
            this._gradations = [];
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var interval = this.calcInterval(area);
            if (interval <= 0.0) {
                return;
            }
            var v = interval / 2.0;
            do {
                this._gradations.push(v);
                this._gradations.push(-v);
                v += interval;
            } while (v <= this.getMaxValue());
        }
    }, {
        key: 'preSetRange',
        value: function preSetRange(r) {
            var abs = Math.max(Math.abs(r.min), Math.abs(r.max));
            r.min = -abs;
            r.max = abs;
        }
    }]);

    return ZeroCenteredRange;
}(Range);

var PercentageRange = exports.PercentageRange = function (_Range5) {
    _inherits(PercentageRange, _Range5);

    function PercentageRange(name) {
        _classCallCheck(this, PercentageRange);

        return _possibleConstructorReturn(this, (PercentageRange.__proto__ || Object.getPrototypeOf(PercentageRange)).call(this, name));
    }

    _createClass(PercentageRange, [{
        key: 'updateGradations',
        value: function updateGradations() {
            this._gradations = [];
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var interval = 10.0;
            var h = Math.floor(this.toHeight(interval));
            if (h << 2 > area.getHeight()) return;
            var v = Math.ceil(this.getMinValue() / interval) * interval;
            if (v === 0.0) v = 0;
            if (h << 2 < 24) {
                if (h << 1 < 8) return;
                do {
                    if (v === 20.0 || v === 80.0) this._gradations.push(v);
                    v += interval;
                } while (v < this.getMaxValue());
            } else {
                do {
                    if (h < 8) {
                        if (v === 20.0 || v === 50.0 || v === 80.0) this._gradations.push(v);
                    } else {
                        if (v === 0.0 || v === 20.0 || v === 50.0 || v === 80.0 || v === 100.0) this._gradations.push(v);
                    }
                    v += interval;
                } while (v < this.getMaxValue());
            }
        }
    }]);

    return PercentageRange;
}(Range);
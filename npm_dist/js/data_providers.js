'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IndicatorDataProvider = exports.MainDataProvider = exports.DataProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _named_object = require('./named_object');

var _chart_manager = require('./chart_manager');

var _util = require('./util');

var _data_sources = require('./data_sources');

var data_sources = _interopRequireWildcard(_data_sources);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataProvider = exports.DataProvider = function (_NamedObject) {
    _inherits(DataProvider, _NamedObject);

    function DataProvider(name) {
        _classCallCheck(this, DataProvider);

        var _this = _possibleConstructorReturn(this, (DataProvider.__proto__ || Object.getPrototypeOf(DataProvider)).call(this, name));

        _this._minValue = 0;
        _this._maxValue = 0;
        _this._minValueIndex = -1;
        _this._maxValueIndex = -1;
        return _this;
    }

    _createClass(DataProvider, [{
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
        key: 'getMinValueIndex',
        value: function getMinValueIndex() {
            return this._minValueIndex;
        }
    }, {
        key: 'getMaxValueIndex',
        value: function getMaxValueIndex() {
            return this._maxValueIndex;
        }
    }, {
        key: 'getMinMaxAt',
        value: function getMinMaxAt(index, minmax) {
            return true;
        }
    }, {
        key: 'calcRange',
        value: function calcRange(firstIndexes, lastIndex, minmaxes, indexes) {
            var min = Number.MAX_VALUE;
            var max = -Number.MAX_VALUE;
            var minIndex = -1;
            var maxIndex = -1;
            var minmax = {};
            var i = lastIndex - 1;
            var n = firstIndexes.length - 1;
            for (; n >= 0; n--) {
                var first = firstIndexes[n];
                if (i < first) {
                    minmaxes[n] = { "min": min, "max": max };
                } else {
                    for (; i >= first; i--) {
                        if (this.getMinMaxAt(i, minmax) === false) {
                            continue;
                        }
                        if (min > minmax.min) {
                            min = minmax.min;
                            minIndex = i;
                        }
                        if (max < minmax.max) {
                            max = minmax.max;
                            maxIndex = i;
                        }
                    }
                    minmaxes[n] = { "min": min, "max": max };
                }
                if (indexes !== null && indexes !== undefined) {
                    indexes[n] = { "minIndex": minIndex, "maxIndex": maxIndex };
                }
            }
        }
    }, {
        key: 'updateRange',
        value: function updateRange() {
            var mgr = _chart_manager.ChartManager.instance;
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var firstIndexes = [timeline.getFirstIndex()];
            var minmaxes = [{}];
            var indexes = [{}];
            this.calcRange(firstIndexes, timeline.getLastIndex(), minmaxes, indexes);
            this._minValue = minmaxes[0].min;
            this._maxValue = minmaxes[0].max;
            this._minValueIndex = indexes[0].minIndex;
            this._maxValueIndex = indexes[0].maxIndex;
        }
    }]);

    return DataProvider;
}(_named_object.NamedObject);

var MainDataProvider = exports.MainDataProvider = function (_DataProvider) {
    _inherits(MainDataProvider, _DataProvider);

    function MainDataProvider(name) {
        _classCallCheck(this, MainDataProvider);

        var _this2 = _possibleConstructorReturn(this, (MainDataProvider.__proto__ || Object.getPrototypeOf(MainDataProvider)).call(this, name));

        _this2._candlestickDS = null;
        return _this2;
    }

    _createClass(MainDataProvider, [{
        key: 'updateData',
        value: function updateData() {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (!_util.Util.isInstance(ds, data_sources.MainDataSource)) {
                return;
            }
            this._candlestickDS = ds;
        }
    }, {
        key: 'getMinMaxAt',
        value: function getMinMaxAt(index, minmax) {
            var data = this._candlestickDS.getDataAt(index);
            minmax.min = data.low;
            minmax.max = data.high;
            return true;
        }
    }]);

    return MainDataProvider;
}(DataProvider);

var IndicatorDataProvider = exports.IndicatorDataProvider = function (_DataProvider2) {
    _inherits(IndicatorDataProvider, _DataProvider2);

    function IndicatorDataProvider() {
        _classCallCheck(this, IndicatorDataProvider);

        return _possibleConstructorReturn(this, (IndicatorDataProvider.__proto__ || Object.getPrototypeOf(IndicatorDataProvider)).apply(this, arguments));
    }

    _createClass(IndicatorDataProvider, [{
        key: 'getIndicator',
        value: function getIndicator() {
            return this._indicator;
        }
    }, {
        key: 'setIndicator',
        value: function setIndicator(v) {
            this._indicator = v;
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 1) {
                return;
            }
            var indic = this._indicator;
            var i = void 0,
                last = ds.getDataCount();
            indic.clear();
            indic.reserve(last);
            for (i = 0; i < last; i++) {
                indic.execute(ds, i);
            }
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 1) {
                return;
            }
            var indic = this._indicator;
            var mode = ds.getUpdateMode();
            switch (mode) {
                case data_sources.DataSource.UpdateMode.Refresh:
                    {
                        this.refresh();
                        break;
                    }
                case data_sources.DataSource.UpdateMode.Append:
                    {
                        indic.reserve(ds.getAppendedCount());
                        break;
                    }
                case data_sources.DataSource.UpdateMode.Update:
                    {
                        var i = void 0,
                            last = ds.getDataCount();
                        var cnt = ds.getUpdatedCount() + ds.getAppendedCount();
                        for (i = last - cnt; i < last; i++) {
                            indic.execute(ds, i);
                        }
                        break;
                    }
            }
        }
    }, {
        key: 'getMinMaxAt',
        value: function getMinMaxAt(index, minmax) {
            minmax.min = Number.MAX_VALUE;
            minmax.max = -Number.MAX_VALUE;
            var result = void 0,
                valid = false;
            var i = void 0,
                cnt = this._indicator.getOutputCount();
            for (i = 0; i < cnt; i++) {
                result = this._indicator.getOutputAt(i).execute(index);
                if (isNaN(result) === false) {
                    valid = true;
                    if (minmax.min > result) {
                        minmax.min = result;
                    }
                    if (minmax.max < result) {
                        minmax.max = result;
                    }
                }
            }
            return valid;
        }
    }]);

    return IndicatorDataProvider;
}(DataProvider);
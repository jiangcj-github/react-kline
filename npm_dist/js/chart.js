'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chart_manager = require('./chart_manager');

var _control = require('./control');

var _kline = require('./kline');

var _kline2 = _interopRequireDefault(_kline);

var _templates = require('./templates');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chart = exports.Chart = function () {
    function Chart() {
        _classCallCheck(this, Chart);

        this._data = null;
        this._charStyle = "CandleStick";
        this._depthData = {
            array: null,
            asks_count: 0,
            bids_count: 0,
            asks_si: 0,
            asks_ei: 0,
            bids_si: 0,
            bids_ei: 0
        };
        this.strIsLine = false;
        this._range = _kline2.default.instance.range;
        this._symbol = _kline2.default.instance.symbol;
    }

    _createClass(Chart, [{
        key: 'setTitle',
        value: function setTitle() {
            var lang = _chart_manager.ChartManager.instance.getLanguage();
            var title = _kline2.default.instance.symbolName;
            title += ' ';
            title += this.strIsLine ? Chart.strPeriod[lang]['line'] : Chart.strPeriod[lang][this._range];
            title += (this._contract_unit + '/' + this._money_type).toUpperCase();
            _chart_manager.ChartManager.instance.setTitle('frame0.k0', title);
        }
    }, {
        key: 'setSymbol',
        value: function setSymbol(symbol) {
            this._symbol = symbol;
            this.updateDataAndDisplay();
        }
    }, {
        key: 'updateDataAndDisplay',
        value: function updateDataAndDisplay() {
            _kline2.default.instance.symbol = this._symbol;
            _kline2.default.instance.range = this._range;
            _chart_manager.ChartManager.instance.setCurrentDataSource('frame0.k0', this._symbol + '.' + this._range);
            _chart_manager.ChartManager.instance.setNormalMode();
            var f = _kline2.default.instance.chartMgr.getDataSource("frame0.k0").getLastDate();
            if (f === -1) {
                _kline2.default.instance.requestParam = _control.Control.setHttpRequestParam(_kline2.default.instance.symbol, _kline2.default.instance.range, _kline2.default.instance.limit, null);
                _control.Control.requestData(true);
            } else {
                _kline2.default.instance.requestParam = _control.Control.setHttpRequestParam(_kline2.default.instance.symbol, _kline2.default.instance.range, null, f.toString());
                _control.Control.requestData();
            }
            _chart_manager.ChartManager.instance.redraw('All', false);
        }
    }, {
        key: 'setCurrentContractUnit',
        value: function setCurrentContractUnit(contractUnit) {
            this._contract_unit = contractUnit;
            this.updateDataAndDisplay();
        }
    }, {
        key: 'setCurrentMoneyType',
        value: function setCurrentMoneyType(moneyType) {
            this._money_type = moneyType;
            this.updateDataAndDisplay();
        }
    }, {
        key: 'setCurrentPeriod',
        value: function setCurrentPeriod(period) {
            this._range = _kline2.default.instance.periodMap[period];
            if (_kline2.default.instance.type === "stomp" && _kline2.default.instance.stompClient.ws.readyState === 1) {
                _kline2.default.instance.subscribed.unsubscribe();
                _kline2.default.instance.subscribed = _kline2.default.instance.stompClient.subscribe(_kline2.default.instance.subscribePath + '/' + _kline2.default.instance.symbol + '/' + this._range, _control.Control.subscribeCallback);
            }
            this.updateDataAndDisplay();
            _kline2.default.instance.onRangeChangeFunc(this._range);
        }
    }, {
        key: 'updateDataSource',
        value: function updateDataSource(data) {
            this._data = data;
            _chart_manager.ChartManager.instance.updateData("frame0.k0", this._data);
        }
    }, {
        key: 'updateDepth',
        value: function updateDepth(array) {
            if (array == null) {
                this._depthData.array = [];
                _chart_manager.ChartManager.instance.redraw('All', false);
                return;
            }
            if (!array.asks || !array.bids || array.asks === '' || array.bids === '') return;
            var _data = this._depthData;
            _data.array = [];
            for (var i = 0; i < array.asks.length; i++) {
                var data = {};
                data.rate = array.asks[i][0];
                data.amount = array.asks[i][1];
                _data.array.push(data);
            }
            for (var _i = 0; _i < array.bids.length; _i++) {
                var _data2 = {};
                _data2.rate = array.bids[_i][0];
                _data2.amount = array.bids[_i][1];
                _data.array.push(_data2);
            }
            _data.asks_count = array.asks.length;
            _data.bids_count = array.bids.length;
            _data.asks_si = _data.asks_count - 1;
            _data.asks_ei = 0;
            _data.bids_si = _data.asks_count - 1;
            _data.bids_ei = _data.asks_count + _data.bids_count - 2;
            for (var _i2 = _data.asks_si; _i2 >= _data.asks_ei; _i2--) {
                if (_i2 === _data.asks_si && _data.array[_i2] !== undefined) {
                    _data.array[_i2].amounts = _data.array[_i2].amount;
                } else if (_data.array[_i2 + 1] !== undefined) {
                    _data.array[_i2].amounts = _data.array[_i2 + 1].amounts + _data.array[_i2].amount;
                }
            }
            for (var _i3 = _data.bids_si; _i3 <= _data.bids_ei; _i3++) {
                if (_i3 === _data.bids_si && _data.array[_i3] !== undefined) {
                    _data.array[_i3].amounts = _data.array[_i3].amount;
                } else if (_data.array[_i3 - 1] !== undefined) {
                    _data.array[_i3].amounts = _data.array[_i3 - 1].amounts + _data.array[_i3].amount;
                }
            }
            _chart_manager.ChartManager.instance.redraw('All', false);
        }
    }, {
        key: 'setMainIndicator',
        value: function setMainIndicator(indicName) {
            this._mainIndicator = indicName;
            if (indicName === 'NONE') {
                _chart_manager.ChartManager.instance.removeMainIndicator('frame0.k0');
            } else {
                _chart_manager.ChartManager.instance.setMainIndicator('frame0.k0', indicName);
            }
            _chart_manager.ChartManager.instance.redraw('All', true);
        }
    }, {
        key: 'setIndicator',
        value: function setIndicator(index, indicName) {
            if (indicName === 'NONE') {
                /*
                let index = 2;
                if (Template.displayVolume === false)
                    index = 1;
                */
                var _index = 1;
                var areaName = _chart_manager.ChartManager.instance.getIndicatorAreaName('frame0.k0', _index);
                if (areaName !== '') _chart_manager.ChartManager.instance.removeIndicator(areaName);
            } else {
                /*
                let index = 2;
                if (Template.displayVolume === false)
                    index = 1;
                */
                var _index2 = 1;
                var _areaName = _chart_manager.ChartManager.instance.getIndicatorAreaName('frame0.k0', _index2);
                if (_areaName === '') {
                    _templates.Template.createIndicatorChartComps('frame0.k0', indicName);
                } else {
                    _chart_manager.ChartManager.instance.setIndicator(_areaName, indicName);
                }
            }
            _chart_manager.ChartManager.instance.redraw('All', true);
        }
    }, {
        key: 'addIndicator',
        value: function addIndicator(indicName) {
            _chart_manager.ChartManager.instance.addIndicator(indicName);
            _chart_manager.ChartManager.instance.redraw('All', true);
        }
    }, {
        key: 'removeIndicator',
        value: function removeIndicator(indicName) {
            var areaName = _chart_manager.ChartManager.instance.getIndicatorAreaName(2);
            _chart_manager.ChartManager.instance.removeIndicator(areaName);
            _chart_manager.ChartManager.instance.redraw('All', true);
        }
    }]);

    return Chart;
}();

Chart.strPeriod = {
    'zh-cn': {
        'line': '(分时)',
        '1min': '(1分钟)',
        '5min': '(5分钟)',
        '15min': '(15分钟)',
        '30min': '(30分钟)',
        '1hour': '(1小时)',
        '1day': '(日线)',
        '1week': '(周线)',
        '3min': '(3分钟)',
        '2hour': '(2小时)',
        '4hour': '(4小时)',
        '6hour': '(6小时)',
        '12hour': '(12小时)',
        '3day': '(3天)'
    },
    'en-us': {
        'line': '(Line)',
        '1min': '(1m)',
        '5min': '(5m)',
        '15min': '(15m)',
        '30min': '(30m)',
        '1hour': '(1h)',
        '1day': '(1d)',
        '1week': '(1w)',
        '3min': '(3m)',
        '2hour': '(2h)',
        '4hour': '(4h)',
        '6hour': '(6h)',
        '12hour': '(12h)',
        '3day': '(3d)'
    },
    'zh-tw': {
        'line': '(分時)',
        '1min': '(1分鐘)',
        '5min': '(5分鐘)',
        '15min': '(15分鐘)',
        '30min': '(30分鐘)',
        '1hour': '(1小時)',
        '1day': '(日線)',
        '1week': '(周線)',
        '3min': '(3分鐘)',
        '2hour': '(2小時)',
        '4hour': '(4小時)',
        '6hour': '(6小時)',
        '12hour': '(12小時)',
        '3day': '(3天)'
    }
};
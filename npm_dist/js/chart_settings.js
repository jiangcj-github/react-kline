'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChartSettings = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chart_manager = require('./chart_manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChartSettings = exports.ChartSettings = function () {
    function ChartSettings() {
        _classCallCheck(this, ChartSettings);
    }

    _createClass(ChartSettings, null, [{
        key: 'checkVersion',
        value: function checkVersion() {
            if (ChartSettings._data.ver < 2) {
                ChartSettings._data.ver = 2;
                var charts = ChartSettings._data.charts;
                charts.period_weight = {};
                charts.period_weight['line'] = 8;
                charts.period_weight['1min'] = 7;
                charts.period_weight['5min'] = 6;
                charts.period_weight['15min'] = 5;
                charts.period_weight['30min'] = 4;
                charts.period_weight['1hour'] = 3;
                charts.period_weight['1day'] = 2;
                charts.period_weight['1week'] = 1;
                charts.period_weight['3min'] = 0;
                charts.period_weight['2hour'] = 0;
                charts.period_weight['4hour'] = 0;
                charts.period_weight['6hour'] = 0;
                charts.period_weight['12hour'] = 0;
                charts.period_weight['3day'] = 0;
            }
            if (ChartSettings._data.ver < 3) {
                ChartSettings._data.ver = 3;
                var _charts = ChartSettings._data.charts;
                _charts.areaHeight = [];
            }
        }
    }, {
        key: 'get',
        value: function get() {
            if (ChartSettings._data === undefined) {
                ChartSettings.init();
                ChartSettings.load();
                ChartSettings.checkVersion();
            }
            return ChartSettings._data;
        }
    }, {
        key: 'init',
        value: function init() {
            var _indic_param = {};
            var _name = ['MA', 'EMA', 'VOLUME', 'MACD', 'KDJ', 'StochRSI', 'RSI', 'DMI', 'OBV', 'BOLL', 'DMA', 'TRIX', 'BRAR', 'VR', 'EMV', 'WR', 'ROC', 'MTM', 'PSY'];
            for (var i = 0; i < _name.length; i++) {
                var _value = _chart_manager.ChartManager.instance.createIndicatorAndRange('', _name[i], true);
                if (_value === null) continue;
                _indic_param[_name[i]] = [];
                var param = _value.indic.getParameters();
                for (var j = 0; j < param.length; j++) {
                    _indic_param[_name[i]].push(param[j]);
                }
            }
            var _chart_style = 'CandleStick';
            var _m_indic = 'MA';
            var _indic = ['VOLUME', 'MACD'];
            var _range = '15m';
            var _frame = {};
            _frame.chartStyle = _chart_style;
            _frame.mIndic = _m_indic;
            _frame.indics = _indic;
            _frame.indicsStatus = 'close';
            _frame.period = _range;
            _frame.depthStatus = 'close';
            ChartSettings._data = {
                ver: 1,
                charts: _frame,
                indics: _indic_param,
                theme: "Dark"
            };
            ChartSettings.checkVersion();
        }
    }, {
        key: 'load',
        value: function load() {
            if (document.cookie.length <= 0) return;
            var start = document.cookie.indexOf("chartSettings=");
            if (start < 0) return;
            start += "chartSettings=".length;
            var end = document.cookie.indexOf(";", start);
            if (end < 0) end = document.cookie.length;
            var json = unescape(document.cookie.substring(start, end));
            ChartSettings._data = JSON.parse(json);
        }
    }, {
        key: 'save',
        value: function save() {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + 2);
            document.cookie = "chartSettings=" + escape(JSON.stringify(ChartSettings._data)) + ";expires=" + exdate.toGMTString();
        }
    }]);

    return ChartSettings;
}();
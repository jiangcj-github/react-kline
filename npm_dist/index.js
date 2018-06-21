'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./css/main.css');

var _kline = require('./js/kline.js');

var _kline2 = _interopRequireDefault(_kline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactKline = function (_React$Component) {
    _inherits(ReactKline, _React$Component);

    function ReactKline(props) {
        _classCallCheck(this, ReactKline);

        var _this = _possibleConstructorReturn(this, (ReactKline.__proto__ || Object.getPrototypeOf(ReactKline)).call(this, props));

        _this.state = {
            props: props,
            kline: null
        };
        return _this;
    }

    _createClass(ReactKline, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var cfg = {
                element: "#kline_container",
                width: 600,
                height: 400,
                theme: 'dark', // light,dark
                language: 'zh-cn', // zh-cn,en-us,zh-tw
                ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
                symbol: "BTC",
                symbolName: "BTC/USD",
                type: "poll", // poll,socket
                url: "http://127.0.0.1/mock.json",
                limit: 1000,
                intervalTime: 5000,
                debug: false,
                showDepth: false,
                depthWidth: 50
            };
            Object.assign(cfg, this.state.props);
            this.state.kline = new _kline2.default(cfg);
            this.state.kline.draw();
        }
    }, {
        key: 'resize',
        value: function resize(w, h) {
            this.state.kline.resize(w, h);
        }
    }, {
        key: 'setSymbol',
        value: function setSymbol(symbol, symbolName) {
            this.state.kline.setSymbol(symbol, symbolName);
        }
    }, {
        key: 'setTheme',
        value: function setTheme(style) {
            this.state.kline.setTheme(style);
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(lang) {
            this.state.kline.setLanguage(lang);
        }
    }, {
        key: 'setIntervalTime',
        value: function setIntervalTime(intervalTime) {
            this.state.kline.setIntervalTime(intervalTime);
        }
    }, {
        key: 'setDepth',
        value: function setDepth(showDepth, depthWidth) {
            this.state.kline.setDepth(showDepth, depthWidth);
        }
    }, {
        key: 'connect',
        value: function connect() {
            this.state.kline.connect();
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.state.kline.disconnect();
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.state.kline.pause();
        }
    }, {
        key: 'resend',
        value: function resend() {
            this.state.kline.resend();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { id: 'kline_container' });
        }
    }]);

    return ReactKline;
}(_react2.default.Component);

exports.default = ReactKline;
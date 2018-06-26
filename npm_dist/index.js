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
                theme: 'dark',
                language: 'zh-cn',
                ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
                symbol: "BTC",
                symbolName: "BTC/USD",
                limit: 1000,
                intervalTime: 5000,
                debug: true,
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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'kline_container' },
                _react2.default.createElement(
                    'div',
                    { className: 'chart_container dark' },
                    _react2.default.createElement('div', { id: 'chart_dom_elem_cache' }),
                    _react2.default.createElement(
                        'div',
                        { id: 'chart_toolbar' },
                        _react2.default.createElement('div', { className: 'symbol-title', id: 'symbol_title' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_dropdown', id: 'chart_toolbar_periods_vert' },
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_dropdown_t' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'chart_str_period' },
                                    '\u5468\u671F'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_dropdown_data', style: { marginLeft: -58 + "px" } },
                                _react2.default.createElement(
                                    'table',
                                    null,
                                    _react2.default.createElement(
                                        'tbody',
                                        null,
                                        _react2.default.createElement(
                                            'tr',
                                            null,
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_1w_v', style: { display: "none" }, name: '1w' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_1w' },
                                                            '\u5468\u7EBF'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_3d_v', style: { display: "none" }, name: '3d' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_3d' },
                                                            '3\u65E5'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_1d_v', style: { display: "none" }, name: '1d' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_1d' },
                                                            '\u65E5\u7EBF'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_12h_v', style: { display: "none" }, name: '12h' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_12h' },
                                                            '12\u5C0F\u65F6'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_6h_v', style: { display: "none" }, name: '6h' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_6h' },
                                                            '6\u5C0F\u65F6'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_4h_v', style: { display: "none" }, name: '4h' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_4h' },
                                                            '4\u5C0F\u65F6'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_2h_v', style: { display: "none" }, name: '2h' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_2h' },
                                                            '2\u5C0F\u65F6'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_1h_v', style: { display: "none" }, name: '1h' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_1h' },
                                                            '1\u5C0F\u65F6'
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tr',
                                            null,
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_30m_v', style: { display: "none" }, name: '30m' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_30m' },
                                                            '30\u5206\u949F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_15m_v', style: { display: "none" }, name: '15m' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_15m' },
                                                            '15\u5206\u949F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_5m_v', style: { display: "none" }, name: '5m' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_5m' },
                                                            '5\u5206\u949F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_3m_v', style: { display: "none" }, name: '3m' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_3m' },
                                                            '3\u5206\u949F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_1m_v', style: { display: "none" }, name: '1m' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_1m selected' },
                                                            '1\u5206\u949F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        { id: 'chart_period_line_v', style: { display: "none" }, name: 'line' },
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'chart_str_period_line' },
                                                            '\u5206\u65F6'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'chart_toolbar_periods_horz' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'chart_toolbar_tabgroup', style: { paddingLeft: 5 + "px", paddingRight: 11 + "px" } },
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_1w_h', name: '1w', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_1w' },
                                        '\u5468\u7EBF'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_3d_h', name: '3d', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_3d' },
                                        '3\u65E5'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_1d_h', name: '1d', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_1d' },
                                        '\u65E5\u7EBF'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_12h_h', name: '12h', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_12h' },
                                        '12\u5C0F\u65F6'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_6h_h', name: '6h', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_6h' },
                                        '6\u5C0F\u65F6'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_4h_h', name: '4h', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_4h' },
                                        '4\u5C0F\u65F6'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_2h_h', name: '2h', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_2h' },
                                        '2\u5C0F\u65F6'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_1h_h', name: '1h', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_1h' },
                                        '1\u5C0F\u65F6'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_30m_h', name: '30m', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_30m' },
                                        '30\u5206\u949F'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_15m_h', name: '15m', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_15m' },
                                        '15\u5206\u949F'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_5m_h', name: '5m', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_5m' },
                                        '5\u5206\u949F'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_3m_h', name: '3m', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_3m' },
                                        '3\u5206\u949F'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_1m_h', name: '1m', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_1m selected' },
                                        '1\u5206\u949F'
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { id: 'chart_period_line_h', name: 'line', style: { display: "none" } },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'chart_str_period_line' },
                                        '\u5206\u65F6'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'chart_show_indicator', className: 'chart_toolbar_button chart_str_indicator_cap selected' },
                            '\u6280\u672F\u6307\u6807'
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'chart_show_tools', className: 'chart_toolbar_button chart_str_tools_cap' },
                            '\u753B\u7EBF\u5DE5\u5177'
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'chart_toolbar_theme' },
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolbar_label chart_str_theme_cap' },
                                '\u4E3B\u9898\u9009\u62E9'
                            ),
                            _react2.default.createElement('a', { name: 'dark', className: 'chart_icon chart_icon_theme_dark selected' }),
                            _react2.default.createElement('a', { name: 'light', className: 'chart_icon chart_icon_theme_light' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_dropdown', id: 'chart_dropdown_settings' },
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_dropdown_t' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'chart_str_settings' },
                                    '\u66F4\u591A'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_dropdown_data', style: { marginLeft: -142 + "px" } },
                                _react2.default.createElement(
                                    'table',
                                    null,
                                    _react2.default.createElement(
                                        'tbody',
                                        null,
                                        _react2.default.createElement(
                                            'tr',
                                            { id: 'chart_select_main_indicator' },
                                            _react2.default.createElement(
                                                'td',
                                                { className: 'chart_str_main_indicator' },
                                                '\u4E3B\u6307\u6807'
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'MA', className: 'selected' },
                                                            'MA'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'EMA', className: '' },
                                                            'EMA'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'BOLL', className: '' },
                                                            'BOLL'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'SAR', className: '' },
                                                            'SAR'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'NONE', className: '' },
                                                            'None'
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tr',
                                            { id: 'chart_select_chart_style' },
                                            _react2.default.createElement(
                                                'td',
                                                { className: 'chart_str_chart_style' },
                                                '\u4E3B\u56FE\u6837\u5F0F'
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: 'selected' },
                                                            'CandleStick'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: '' },
                                                            'CandleStickHLC'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { className: '' },
                                                            'OHLC'
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tr',
                                            { id: 'chart_select_theme', style: { display: "none" } },
                                            _react2.default.createElement(
                                                'td',
                                                { className: 'chart_str_theme' },
                                                '\u4E3B\u9898\u9009\u62E9'
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement('a', { name: 'dark', className: 'chart_icon chart_icon_theme_dark selected' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement('a', { name: 'light', className: 'chart_icon chart_icon_theme_light' })
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tr',
                                            { id: 'chart_enable_tools', style: { display: "none" } },
                                            _react2.default.createElement(
                                                'td',
                                                { className: 'chart_str_tools' },
                                                '\u753B\u7EBF\u5DE5\u5177'
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'on', className: 'chart_str_on' },
                                                            '\u5F00\u542F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'off', className: 'chart_str_off selected' },
                                                            '\u5173\u95ED'
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tr',
                                            { id: 'chart_enable_indicator', style: { display: "none" } },
                                            _react2.default.createElement(
                                                'td',
                                                { className: 'chart_str_indicator' },
                                                '\u6280\u672F\u6307\u6807'
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'on', className: 'chart_str_on selected' },
                                                            '\u5F00\u542F'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { name: 'off', className: 'chart_str_off' },
                                                            '\u5173\u95ED'
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tr',
                                            null,
                                            _react2.default.createElement('td', null),
                                            _react2.default.createElement(
                                                'td',
                                                null,
                                                _react2.default.createElement(
                                                    'ul',
                                                    null,
                                                    _react2.default.createElement(
                                                        'li',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { id: 'chart_btn_parameter_settings', className: 'chart_str_indicator_parameters' },
                                                            '\u6307\u6807\u53C2\u6570\u8BBE\u7F6E'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_dropdown', id: 'chart_language_setting_div', style: { paddingLeft: 5 + "px" } },
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_dropdown_t' },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'chart_language_setting' },
                                    '\u8BED\u8A00(LANG)'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_dropdown_data', style: { paddingTop: 15 + "px", marginLeft: -12 + "px" } },
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        { style: { height: 25 + "px" } },
                                        _react2.default.createElement(
                                            'a',
                                            { name: 'zh-cn', className: 'selected' },
                                            '\u7B80\u4F53\u4E2D\u6587(zh-CN)'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { style: { height: 25 + "px" } },
                                        _react2.default.createElement(
                                            'a',
                                            { name: 'en-us' },
                                            'English(en-US)'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { style: { height: 25 + "px" } },
                                        _react2.default.createElement(
                                            'a',
                                            { name: 'zh-tw' },
                                            '\u7E41\u9AD4\u4E2D\u6587(zh-HK)'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'chart_updated_time' },
                            _react2.default.createElement('div', { id: 'sizeIcon', className: 'chart_BoxSize' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'chart_show_depth', className: 'chart_toolbar_button chart_str_depth_cap' },
                            '\u6DF1\u5EA6\u56FE'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'chart_toolpanel' },
                        _react2.default.createElement('div', { className: 'chart_toolpanel_separator' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'clear_all' },
                            _react2.default.createElement('div', { className: 'clear_all_icon', id: 'clearCanvas' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_clear_all' },
                                '\u6E05\u9664\u5168\u90E8'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_Cursor', name: 'Cursor' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_cursor' },
                                '\u5149\u6807'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_CrossCursor', name: 'CrossCursor' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_cross_cursor' },
                                '\u5341\u5B57\u5149\u6807'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_SegLine', name: 'SegLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_seg_line' },
                                '\u7EBF\u6BB5'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_StraightLine', name: 'StraightLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_straight_line' },
                                '\u76F4\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_RayLine', name: 'RayLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_ray_line' },
                                '\u5C04\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_ArrowLine', name: 'ArrowLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_arrow_line' },
                                '\u7BAD\u5934'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_HoriSegLine', name: 'HoriSegLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_horz_seg_line' },
                                '\u6C34\u5E73\u7EBF\u6BB5'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_HoriStraightLine', name: 'HoriStraightLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_horz_straight_line' },
                                '\u6C34\u5E73\u76F4\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_HoriRayLine', name: 'HoriRayLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_horz_ray_line' },
                                '\u6C34\u5E73\u5C04\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_VertiStraightLine', name: 'VertiStraightLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_vert_straight_line' },
                                '\u5782\u76F4\u76F4\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_PriceLine', name: 'PriceLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_price_line' },
                                '\u4EF7\u683C\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_TriParallelLine', name: 'TriParallelLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_tri_parallel_line' },
                                '\u4EF7\u683C\u901A\u9053\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_BiParallelLine', name: 'BiParallelLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_bi_parallel_line' },
                                '\u5E73\u884C\u76F4\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_BiParallelRayLine', name: 'BiParallelRayLine' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_bi_parallel_ray' },
                                '\u5E73\u884C\u5C04\u7EBF'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_DrawFibRetrace', name: 'DrawFibRetrace' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_fib_retrace' },
                                '\u6590\u6CE2\u7EB3\u5951\u56DE\u8C03'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'chart_toolpanel_button' },
                            _react2.default.createElement('div', { className: 'chart_toolpanel_icon', id: 'chart_DrawFibFans', name: 'DrawFibFans' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'chart_toolpanel_tip chart_str_fib_fans' },
                                '\u6590\u6CE2\u7EB3\u5951\u6247\u5F62'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'chart_canvasGroup', className: 'temp' },
                        _react2.default.createElement('canvas', { className: 'chart_canvas', id: 'chart_mainCanvas', style: { cursor: "default" } }),
                        _react2.default.createElement('canvas', { className: 'chart_canvas', id: 'chart_overlayCanvas', style: { cursor: "default" } })
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'chart_tabbar' },
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'VOLUME', className: '' },
                                    'VOLUME'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'MACD', className: '' },
                                    'MACD'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'KDJ', className: '' },
                                    'KDJ'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'StochRSI', className: '' },
                                    'StochRSI'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'RSI', className: '' },
                                    'RSI'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'DMI', className: '' },
                                    'DMI'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'OBV', className: '' },
                                    'OBV'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'BOLL', className: '' },
                                    'BOLL'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'SAR', className: '' },
                                    'SAR'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'DMA', className: '' },
                                    'DMA'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'TRIX', className: '' },
                                    'TRIX'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'BRAR', className: '' },
                                    'BRAR'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'VR', className: '' },
                                    'VR'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'EMV', className: '' },
                                    'EMV'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'WR', className: '' },
                                    'WR'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'ROC', className: '' },
                                    'ROC'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'MTM', className: '' },
                                    'MTM'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { name: 'PSY' },
                                    'PSY'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'chart_parameter_settings' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'chart_str_indicator_parameters' },
                            '\u6307\u6807\u53C2\u6570\u8BBE\u7F6E'
                        ),
                        _react2.default.createElement(
                            'table',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'MA'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'MA' }),
                                        _react2.default.createElement('input', { name: 'MA' }),
                                        _react2.default.createElement('input', { name: 'MA' }),
                                        _react2.default.createElement('input', { name: 'MA' }),
                                        _react2.default.createElement('input', { name: 'MA' }),
                                        _react2.default.createElement('input', { name: 'MA' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'DMA'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'DMA' }),
                                        _react2.default.createElement('input', { name: 'DMA' }),
                                        _react2.default.createElement('input', { name: 'DMA' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'EMA'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'EMA' }),
                                        _react2.default.createElement('input', { name: 'EMA' }),
                                        _react2.default.createElement('input', { name: 'EMA' }),
                                        _react2.default.createElement('input', { name: 'EMA' }),
                                        _react2.default.createElement('input', { name: 'EMA' }),
                                        _react2.default.createElement('input', { name: 'EMA' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'TRIX'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'TRIX' }),
                                        _react2.default.createElement('input', { name: 'TRIX' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'VOLUME'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'VOLUME' }),
                                        _react2.default.createElement('input', { name: 'VOLUME' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'BRAR'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'BRAR' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'MACD'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'MACD' }),
                                        _react2.default.createElement('input', { name: 'MACD' }),
                                        _react2.default.createElement('input', { name: 'MACD' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'VR'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'VR' }),
                                        _react2.default.createElement('input', { name: 'VR' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'KDJ'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'KDJ' }),
                                        _react2.default.createElement('input', { name: 'KDJ' }),
                                        _react2.default.createElement('input', { name: 'KDJ' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'EMV'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'EMV' }),
                                        _react2.default.createElement('input', { name: 'EMV' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'StochRSI'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'StochRSI' }),
                                        _react2.default.createElement('input', { name: 'StochRSI' }),
                                        _react2.default.createElement('input', { name: 'StochRSI' }),
                                        _react2.default.createElement('input', { name: 'StochRSI' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'WR'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'WR' }),
                                        _react2.default.createElement('input', { name: 'WR' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'RSI'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'RSI' }),
                                        _react2.default.createElement('input', { name: 'RSI' }),
                                        _react2.default.createElement('input', { name: 'RSI' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'ROC'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'ROC' }),
                                        _react2.default.createElement('input', { name: 'ROC' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'DMI'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'DMI' }),
                                        _react2.default.createElement('input', { name: 'DMI' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'MTM'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'MTM' }),
                                        _react2.default.createElement('input', { name: 'MTM' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'OBV'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'OBV' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'PSY'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'PSY' }),
                                        _react2.default.createElement('input', { name: 'PSY' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        'BOLL'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', { name: 'BOLL' })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'chart_str_default' },
                                            '\u9ED8\u8BA4\u503C'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'close_settings' },
                            _react2.default.createElement(
                                'a',
                                { className: 'chart_str_close' },
                                '\u5173\u95ED'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'chart_loading', className: 'chart_str_loading' },
                        '\u6B63\u5728\u8BFB\u53D6\u6570\u636E...'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { display: "none" }, id: 'chart_language_switch_tmp' },
                    _react2.default.createElement('span', { name: 'chart_str_period', zh_tw: '\u9031\u671F', zh_cn: '\u5468\u671F', en_us: 'TIME' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_line', zh_tw: '\u5206\u6642', zh_cn: '\u5206\u65F6', en_us: 'Line' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_1m', zh_tw: '1\u5206\u9418', zh_cn: '1\u5206\u949F', en_us: '1m' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_3m', zh_tw: '3\u5206\u9418', zh_cn: '3\u5206\u949F', en_us: '3m' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_5m', zh_tw: '5\u5206\u9418', zh_cn: '5\u5206\u949F', en_us: '5m' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_15m', zh_tw: '15\u5206\u9418', zh_cn: '15\u5206\u949F', en_us: '15m' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_30m', zh_tw: '30\u5206\u9418', zh_cn: '30\u5206\u949F', en_us: '30m' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_1h', zh_tw: '1\u5C0F\u6642', zh_cn: '1\u5C0F\u65F6', en_us: '1h' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_2h', zh_tw: '2\u5C0F\u6642', zh_cn: '2\u5C0F\u65F6', en_us: '2h' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_4h', zh_tw: '4\u5C0F\u6642', zh_cn: '4\u5C0F\u65F6', en_us: '4h' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_6h', zh_tw: '6\u5C0F\u6642', zh_cn: '6\u5C0F\u65F6', en_us: '6h' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_12h', zh_tw: '12\u5C0F\u6642', zh_cn: '12\u5C0F\u65F6', en_us: '12h' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_1d', zh_tw: '\u65E5\u7DDA', zh_cn: '\u65E5\u7EBF', en_us: '1d' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_3d', zh_tw: '3\u65E5', zh_cn: '3\u65E5', en_us: '3d' }),
                    _react2.default.createElement('span', { name: 'chart_str_period_1w', zh_tw: '\u5468\u7DDA', zh_cn: '\u5468\u7EBF', en_us: '1w' }),
                    _react2.default.createElement('span', { name: 'chart_str_settings', zh_tw: '\u66F4\u591A', zh_cn: '\u66F4\u591A', en_us: 'MORE' }),
                    _react2.default.createElement('span', { name: 'chart_setting_main_indicator', zh_tw: '\u5747\u7DDA\u8A2D\u7F6E', zh_cn: '\u5747\u7EBF\u8BBE\u7F6E', en_us: 'Main Indicator' }),
                    _react2.default.createElement('span', { name: 'chart_setting_main_indicator_none', zh_tw: '\u95DC\u9589\u5747\u7DDA', zh_cn: '\u5173\u95ED\u5747\u7EBF', en_us: 'None' }),
                    _react2.default.createElement('span', { name: 'chart_setting_indicator_parameters', zh_tw: '\u6307\u6A19\u53C3\u6578\u8A2D\u7F6E', zh_cn: '\u6307\u6807\u53C2\u6570\u8BBE\u7F6E', en_us: 'Indicator Parameters' }),
                    _react2.default.createElement('span', { name: 'chart_str_chart_style', zh_tw: '\u4E3B\u5716\u6A23\u5F0F', zh_cn: '\u4E3B\u56FE\u6837\u5F0F', en_us: 'Chart Style' }),
                    _react2.default.createElement('span', { name: 'chart_str_main_indicator', zh_tw: '\u4E3B\u6307\u6A19', zh_cn: '\u4E3B\u6307\u6807', en_us: 'Main Indicator' }),
                    _react2.default.createElement('span', { name: 'chart_str_indicator', zh_tw: '\u6280\u8853\u6307\u6A19', zh_cn: '\u6280\u672F\u6307\u6807', en_us: 'Indicator' }),
                    _react2.default.createElement('span', { name: 'chart_str_indicator_cap', zh_tw: '\u6280\u8853\u6307\u6A19', zh_cn: '\u6280\u672F\u6307\u6807', en_us: 'INDICATOR' }),
                    _react2.default.createElement('span', { name: 'chart_str_tools', zh_tw: '\u756B\u7DDA\u5DE5\u5177', zh_cn: '\u753B\u7EBF\u5DE5\u5177', en_us: 'Tools' }),
                    _react2.default.createElement('span', { name: 'chart_str_tools_cap', zh_tw: '\u756B\u7DDA\u5DE5\u5177', zh_cn: '\u753B\u7EBF\u5DE5\u5177', en_us: 'TOOLS' }),
                    _react2.default.createElement('span', { name: 'chart_str_theme', zh_tw: '\u4E3B\u984C\u9078\u64C7', zh_cn: '\u4E3B\u9898\u9009\u62E9', en_us: 'Theme' }),
                    _react2.default.createElement('span', { name: 'chart_str_theme_cap', zh_tw: '\u4E3B\u984C\u9078\u64C7', zh_cn: '\u4E3B\u9898\u9009\u62E9', en_us: 'THEME' }),
                    _react2.default.createElement('span', { name: 'chart_language_setting', zh_tw: '\u8A9E\u8A00(LANG)', zh_cn: '\u8BED\u8A00(LANG)', en_us: 'LANGUAGE' }),
                    _react2.default.createElement('span', { name: 'chart_str_depth_cap', zh_tw: '\u6DF1\u5EA6\u5716', zh_cn: '\u6DF1\u5EA6\u56FE', en_us: 'DEPTH' }),
                    _react2.default.createElement('span', { name: 'chart_str_none', zh_tw: '\u95DC\u9589', zh_cn: '\u5173\u95ED', en_us: 'None' }),
                    _react2.default.createElement('span', { name: 'chart_str_theme_dark', zh_tw: '\u6DF1\u8272\u4E3B\u984C', zh_cn: '\u6DF1\u8272\u4E3B\u9898', en_us: 'Dark' }),
                    _react2.default.createElement('span', { name: 'chart_str_theme_light', zh_tw: '\u6DFA\u8272\u4E3B\u984C', zh_cn: '\u6D45\u8272\u4E3B\u9898', en_us: 'Light' }),
                    _react2.default.createElement('span', { name: 'chart_str_on', zh_tw: '\u958B\u555F', zh_cn: '\u5F00\u542F', en_us: 'On' }),
                    _react2.default.createElement('span', { name: 'chart_str_off', zh_tw: '\u95DC\u9589', zh_cn: '\u5173\u95ED', en_us: 'Off' }),
                    _react2.default.createElement('span', { name: 'chart_str_close', zh_tw: '\u95DC\u9589', zh_cn: '\u5173\u95ED', en_us: 'CLOSE' }),
                    _react2.default.createElement('span', { name: 'chart_str_default', zh_tw: '\u9ED8\u8A8D\u503C', zh_cn: '\u9ED8\u8BA4\u503C', en_us: 'default' }),
                    _react2.default.createElement('span', { name: 'chart_str_loading', zh_tw: '\u6B63\u5728\u8B80\u53D6\u6578\u64DA...', zh_cn: '\u6B63\u5728\u8BFB\u53D6\u6570\u636E...', en_us: 'Loading...' }),
                    _react2.default.createElement('span', { name: 'chart_str_indicator_parameters', zh_tw: '\u6307\u6A19\u53C3\u6578\u8A2D\u7F6E', zh_cn: '\u6307\u6807\u53C2\u6570\u8BBE\u7F6E', en_us: 'Indicator Parameters' }),
                    _react2.default.createElement('span', { name: 'chart_str_cursor', zh_tw: '\u5149\u6A19', zh_cn: '\u5149\u6807', en_us: 'Cursor' }),
                    _react2.default.createElement('span', { name: 'chart_str_cross_cursor', zh_tw: '\u5341\u5B57\u5149\u6A19', zh_cn: '\u5341\u5B57\u5149\u6807', en_us: 'Cross Cursor' }),
                    _react2.default.createElement('span', { name: 'chart_str_seg_line', zh_tw: '\u7DDA\u6BB5', zh_cn: '\u7EBF\u6BB5', en_us: 'Trend Line' }),
                    _react2.default.createElement('span', { name: 'chart_str_straight_line', zh_tw: '\u76F4\u7DDA', zh_cn: '\u76F4\u7EBF', en_us: 'Extended' }),
                    _react2.default.createElement('span', { name: 'chart_str_ray_line', zh_tw: '\u5C04\u7DDA', zh_cn: '\u5C04\u7EBF', en_us: 'Ray' }),
                    _react2.default.createElement('span', { name: 'chart_str_arrow_line', zh_tw: '\u7BAD\u982D', zh_cn: '\u7BAD\u5934', en_us: 'Arrow' }),
                    _react2.default.createElement('span', { name: 'chart_str_horz_seg_line', zh_tw: '\u6C34\u5E73\u7DDA\u6BB5', zh_cn: '\u6C34\u5E73\u7EBF\u6BB5', en_us: 'Horizontal Line' }),
                    _react2.default.createElement('span', { name: 'chart_str_horz_straight_line', zh_tw: '\u6C34\u5E73\u76F4\u7DDA', zh_cn: '\u6C34\u5E73\u76F4\u7EBF', en_us: 'Horizontal Extended' }),
                    _react2.default.createElement('span', { name: 'chart_str_horz_ray_line', zh_tw: '\u6C34\u5E73\u5C04\u7DDA', zh_cn: '\u6C34\u5E73\u5C04\u7EBF', en_us: 'Horizontal Ray' }),
                    _react2.default.createElement('span', { name: 'chart_str_vert_straight_line', zh_tw: '\u5782\u76F4\u76F4\u7DDA', zh_cn: '\u5782\u76F4\u76F4\u7EBF', en_us: 'Vertical Extended' }),
                    _react2.default.createElement('span', { name: 'chart_str_price_line', zh_tw: '\u50F9\u683C\u7DDA', zh_cn: '\u4EF7\u683C\u7EBF', en_us: 'Price Line' }),
                    _react2.default.createElement('span', { name: 'chart_str_tri_parallel_line', zh_tw: '\u50F9\u683C\u901A\u9053\u7DDA', zh_cn: '\u4EF7\u683C\u901A\u9053\u7EBF', en_us: 'Parallel Channel' }),
                    _react2.default.createElement('span', { name: 'chart_str_bi_parallel_line', zh_tw: '\u5E73\u884C\u76F4\u7DDA', zh_cn: '\u5E73\u884C\u76F4\u7EBF', en_us: 'Parallel Lines' }),
                    _react2.default.createElement('span', { name: 'chart_str_bi_parallel_ray', zh_tw: '\u5E73\u884C\u5C04\u7DDA', zh_cn: '\u5E73\u884C\u5C04\u7EBF', en_us: 'Parallel Rays' }),
                    _react2.default.createElement('span', { name: 'chart_str_fib_retrace', zh_tw: '\u6590\u6CE2\u7D0D\u5951\u56DE\u8ABF', zh_cn: '\u6590\u6CE2\u7EB3\u5951\u56DE\u8C03', en_us: 'Fibonacci Retracements' }),
                    _react2.default.createElement('span', { name: 'chart_str_fib_fans', zh_tw: '\u6590\u6CE2\u7D0D\u5951\u6247\u5F62', zh_cn: '\u6590\u6CE2\u7EB3\u5951\u6247\u5F62', en_us: 'Fibonacci Fans' }),
                    _react2.default.createElement('span', { name: 'chart_str_clear_all', zh_tw: '\u6E05\u9664\u5168\u90E8', zh_cn: '\u6E05\u9664\u5168\u90E8', en_us: 'Clear All' })
                )
            );
        }
    }]);

    return ReactKline;
}(_react2.default.Component);

exports.default = ReactKline;
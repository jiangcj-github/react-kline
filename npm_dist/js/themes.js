"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LightTheme = exports.DarkTheme = exports.Theme = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kline = require("./kline");

var _kline2 = _interopRequireDefault(_kline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = exports.Theme = function () {
    function Theme() {
        _classCallCheck(this, Theme);

        this._colors = [];
        this._fonts = [];
    }

    _createClass(Theme, [{
        key: "getColor",
        value: function getColor(which) {
            return this._colors[which];
        }
    }, {
        key: "getFont",
        value: function getFont(which) {
            return this._fonts[which];
        }
    }]);

    return Theme;
}();

Theme.theme_color_id = 0;
Theme.theme_font_id = 0;
Theme.Color = {
    Positive: Theme.theme_color_id++,
    Negative: Theme.theme_color_id++,
    PositiveDark: Theme.theme_color_id++,
    NegativeDark: Theme.theme_color_id++,
    Unchanged: Theme.theme_color_id++,
    Background: Theme.theme_color_id++,
    Cursor: Theme.theme_color_id++,
    RangeMark: Theme.theme_color_id++,
    Indicator0: Theme.theme_color_id++,
    Indicator1: Theme.theme_color_id++,
    Indicator2: Theme.theme_color_id++,
    Indicator3: Theme.theme_color_id++,
    Indicator4: Theme.theme_color_id++,
    Indicator5: Theme.theme_color_id++,
    Grid0: Theme.theme_color_id++,
    Grid1: Theme.theme_color_id++,
    Grid2: Theme.theme_color_id++,
    Grid3: Theme.theme_color_id++,
    Grid4: Theme.theme_color_id++,
    TextPositive: Theme.theme_color_id++,
    TextNegative: Theme.theme_color_id++,
    Text0: Theme.theme_color_id++,
    Text1: Theme.theme_color_id++,
    Text2: Theme.theme_color_id++,
    Text3: Theme.theme_color_id++,
    Text4: Theme.theme_color_id++,
    LineColorNormal: Theme.theme_color_id++,
    LineColorSelected: Theme.theme_color_id++,
    CircleColorFill: Theme.theme_color_id++,
    CircleColorStroke: Theme.theme_color_id++
};
Theme.Font = {
    Default: Theme.theme_font_id++
};

var DarkTheme = exports.DarkTheme = function (_Theme) {
    _inherits(DarkTheme, _Theme);

    function DarkTheme() {
        _classCallCheck(this, DarkTheme);

        var _this = _possibleConstructorReturn(this, (DarkTheme.__proto__ || Object.getPrototypeOf(DarkTheme)).call(this));

        _this._colors = [];

        _this._colors[Theme.Color.Positive] = "#19b34c";
        _this._colors[Theme.Color.Negative] = "#990e0e";
        _this._colors[Theme.Color.PositiveDark] = "#004718";
        _this._colors[Theme.Color.NegativeDark] = "#3b0e08";

        _this._colors[Theme.Color.Unchanged] = "#fff";
        _this._colors[Theme.Color.Background] = "#161616";
        _this._colors[Theme.Color.Cursor] = "#aaa";
        _this._colors[Theme.Color.RangeMark] = "#f9ee30";
        _this._colors[Theme.Color.Indicator0] = "#ddd";
        _this._colors[Theme.Color.Indicator1] = "#f9ee30";
        _this._colors[Theme.Color.Indicator2] = "#f600ff";
        _this._colors[Theme.Color.Indicator3] = "#6bf";
        _this._colors[Theme.Color.Indicator4] = "#a5cf81";
        _this._colors[Theme.Color.Indicator5] = "#e18b89";
        _this._colors[Theme.Color.Grid0] = "#555";
        _this._colors[Theme.Color.Grid1] = "#555";
        _this._colors[Theme.Color.Grid3] = "#888";
        _this._colors[Theme.Color.Grid4] = "#aaa";
        _this._colors[Theme.Color.TextPositive] = "#1bd357";
        _this._colors[Theme.Color.TextNegative] = "#ff6f5e";
        _this._colors[Theme.Color.Text0] = "#444";
        _this._colors[Theme.Color.Text1] = "#666";
        _this._colors[Theme.Color.Text2] = "#888";
        _this._colors[Theme.Color.Text3] = "#aaa";
        _this._colors[Theme.Color.Text4] = "#ccc";
        _this._colors[Theme.Color.LineColorNormal] = "#a6a6a6";
        _this._colors[Theme.Color.LineColorSelected] = "#ffffff";
        _this._colors[Theme.Color.CircleColorFill] = "#161616";
        _this._colors[Theme.Color.CircleColorStroke] = "#ffffff";
        _this._fonts = [];
        _this._fonts[Theme.Font.Default] = "12px Tahoma";
        return _this;
    }

    return DarkTheme;
}(Theme);

var LightTheme = exports.LightTheme = function (_Theme2) {
    _inherits(LightTheme, _Theme2);

    function LightTheme() {
        _classCallCheck(this, LightTheme);

        var _this2 = _possibleConstructorReturn(this, (LightTheme.__proto__ || Object.getPrototypeOf(LightTheme)).call(this));

        _this2._colors = [];

        _this2._colors[Theme.Color.Positive] = "#53b37b";
        _this2._colors[Theme.Color.Negative] = "#db5542";
        _this2._colors[Theme.Color.PositiveDark] = "#66d293";
        _this2._colors[Theme.Color.NegativeDark] = "#ffadaa";

        _this2._colors[Theme.Color.Unchanged] = "#fff";
        _this2._colors[Theme.Color.Background] = "#f6f6f6";
        _this2._colors[Theme.Color.Cursor] = "#aaa";
        _this2._colors[Theme.Color.RangeMark] = "#f27935";
        _this2._colors[Theme.Color.Indicator0] = "#d27972";
        _this2._colors[Theme.Color.Indicator1] = "#ffb400";
        _this2._colors[Theme.Color.Indicator2] = "#e849b9";
        _this2._colors[Theme.Color.Indicator3] = "#1478c8";
        _this2._colors[Theme.Color.Grid0] = "#aaa";
        _this2._colors[Theme.Color.Grid1] = "#aaa";
        _this2._colors[Theme.Color.Grid3] = "#bbb";
        _this2._colors[Theme.Color.Grid4] = "#aaa";
        _this2._colors[Theme.Color.TextPositive] = "#53b37b";
        _this2._colors[Theme.Color.TextNegative] = "#db5542";
        _this2._colors[Theme.Color.Text0] = "#ccc";
        _this2._colors[Theme.Color.Text1] = "#aaa";
        _this2._colors[Theme.Color.Text2] = "#888";
        _this2._colors[Theme.Color.Text3] = "#666";
        _this2._colors[Theme.Color.Text4] = "#444";
        _this2._colors[Theme.Color.LineColorNormal] = "#8c8c8c";
        _this2._colors[Theme.Color.LineColorSelected] = "#393c40";
        _this2._colors[Theme.Color.CircleColorFill] = "#f6f6f6";
        _this2._colors[Theme.Color.CircleColorStroke] = "#393c40";
        _this2._fonts = [];
        _this2._fonts[Theme.Font.Default] = "12px Tahoma";
        return _this2;
    }

    return LightTheme;
}(Theme);
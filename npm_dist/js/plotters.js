'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CDynamicLinePlotter = exports.DrawFibFansPlotter = exports.DrawBandLinesPlotter = exports.DrawFibRetracePlotter = exports.BandLinesPlotter = exports.DrawTriParallelLinesPlotter = exports.DrawBiParallelRayLinesPlotter = exports.DrawBiParallelLinesPlotter = exports.ParallelLinesPlotter = exports.DrawPriceLinesPlotter = exports.DrawVertiStraightLinesPlotter = exports.DrawHoriSegLinesPlotter = exports.DrawHoriRayLinesPlotter = exports.DrawHoriStraightLinesPlotter = exports.DrawArrowLinesPlotter = exports.DrawRayLinesPlotter = exports.DrawSegLinesPlotter = exports.DrawStraightLinesPlotter = exports.CToolPlotter = exports.RangeSelectionPlotter = exports.TimelineSelectionPlotter = exports.SelectionPlotter = exports.LastClosePlotter = exports.LastVolumePlotter = exports.COrderGraphPlotter = exports.RangePlotter = exports.TimelinePlotter = exports.MinMaxPlotter = exports.IndicatorInfoPlotter = exports.IndicatorPlotter = exports.MainInfoPlotter = exports.OHLCPlotter = exports.CandlestickHLCPlotter = exports.CandlestickPlotter = exports.CGridPlotter = exports.TimelineAreaBackgroundPlotter = exports.RangeAreaBackgroundPlotter = exports.MainAreaBackgroundPlotter = exports.BackgroundPlotter = exports.Plotter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kline = require('./kline');

var _kline2 = _interopRequireDefault(_kline);

var _named_object = require('./named_object');

var _chart_manager = require('./chart_manager');

var _util = require('./util');

var _cpoint = require('./cpoint');

var _exprs = require('./exprs');

var exprs = _interopRequireWildcard(_exprs);

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

var _data_providers = require('./data_providers');

var data_providers = _interopRequireWildcard(_data_providers);

var _data_sources = require('./data_sources');

var data_sources = _interopRequireWildcard(_data_sources);

var _ctools = require('./ctools');

var ctools = _interopRequireWildcard(_ctools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plotter = exports.Plotter = function (_NamedObject) {
    _inherits(Plotter, _NamedObject);

    function Plotter(name) {
        _classCallCheck(this, Plotter);

        return _possibleConstructorReturn(this, (Plotter.__proto__ || Object.getPrototypeOf(Plotter)).call(this, name));
    }

    _createClass(Plotter, null, [{
        key: 'drawLine',
        value: function drawLine(context, x1, y1, x2, y2) {
            context.beginPath();
            context.moveTo((x1 << 0) + 0.5, (y1 << 0) + 0.5);
            context.lineTo((x2 << 0) + 0.5, (y2 << 0) + 0.5);
            context.stroke();
        }
    }, {
        key: 'drawLines',
        value: function drawLines(context, points) {
            var i = void 0,
                cnt = points.length;
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            for (i = 1; i < cnt; i++) {
                context.lineTo(points[i].x, points[i].y);
            }if (Plotter.isChrome) {
                context.moveTo(points[0].x, points[0].y);
                for (i = 1; i < cnt; i++) {
                    context.lineTo(points[i].x, points[i].y);
                }
            }
            context.stroke();
        }
    }, {
        key: 'drawDashedLine',
        value: function drawDashedLine(context, x1, y1, x2, y2, dashLen, dashSolid) {
            if (dashLen < 2) {
                dashLen = 2;
            }
            var dX = x2 - x1;
            var dY = y2 - y1;
            context.beginPath();
            if (dY === 0) {
                var count = dX / dashLen + 0.5 << 0;
                for (var i = 0; i < count; i++) {
                    context.rect(x1, y1, dashSolid, 1);
                    x1 += dashLen;
                }
                context.fill();
            } else {
                var _count = Math.sqrt(dX * dX + dY * dY) / dashLen + 0.5 << 0;
                dX = dX / _count;
                dY = dY / _count;
                var dashX = dX * dashSolid / dashLen;
                var dashY = dY * dashSolid / dashLen;
                for (var _i = 0; _i < _count; _i++) {
                    context.moveTo(x1 + 0.5, y1 + 0.5);
                    context.lineTo(x1 + 0.5 + dashX, y1 + 0.5 + dashY);
                    x1 += dX;
                    y1 += dY;
                }
                context.stroke();
            }
        }
    }, {
        key: 'createHorzDashedLine',
        value: function createHorzDashedLine(context, x1, x2, y, dashLen, dashSolid) {
            if (dashLen < 2) {
                dashLen = 2;
            }
            var dX = x2 - x1;
            var count = dX / dashLen + 0.5 << 0;
            for (var i = 0; i < count; i++) {
                context.rect(x1, y, dashSolid, 1);
                x1 += dashLen;
            }
        }
    }, {
        key: 'createRectangles',
        value: function createRectangles(context, rects) {
            context.beginPath();
            var e = void 0,
                i = void 0,
                cnt = rects.length;
            for (i = 0; i < cnt; i++) {
                e = rects[i];
                context.rect(e.x, e.y, e.w, e.h);
            }
        }
    }, {
        key: 'createPolygon',
        value: function createPolygon(context, points) {
            context.beginPath();
            context.moveTo(points[0].x + 0.5, points[0].y + 0.5);
            var i = void 0,
                cnt = points.length;
            for (i = 1; i < cnt; i++) {
                context.lineTo(points[i].x + 0.5, points[i].y + 0.5);
            }context.closePath();
        }
    }, {
        key: 'drawString',
        value: function drawString(context, str, rect) {
            var w = context.measureText(str).width;
            if (rect.w < w) {
                return false;
            }
            context.fillText(str, rect.x, rect.y);
            rect.x += w;
            rect.w -= w;
            return true;
        }
    }]);

    return Plotter;
}(_named_object.NamedObject);

Plotter.isChrome = navigator.userAgent.toLowerCase().match(/chrome/) !== null;

var BackgroundPlotter = exports.BackgroundPlotter = function (_Plotter) {
    _inherits(BackgroundPlotter, _Plotter);

    function BackgroundPlotter(name) {
        _classCallCheck(this, BackgroundPlotter);

        var _this2 = _possibleConstructorReturn(this, (BackgroundPlotter.__proto__ || Object.getPrototypeOf(BackgroundPlotter)).call(this, name));

        _this2._color = themes.Theme.Color.Background;
        return _this2;
    }

    _createClass(BackgroundPlotter, [{
        key: 'getColor',
        value: function getColor() {
            return this._color;
        }
    }, {
        key: 'setColor',
        value: function setColor(c) {
            this._color = c;
        }
    }, {
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var theme = mgr.getTheme(this.getFrameName());
            context.fillStyle = theme.getColor(this._color);
            context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
        }
    }]);

    return BackgroundPlotter;
}(Plotter);

var MainAreaBackgroundPlotter = exports.MainAreaBackgroundPlotter = function (_BackgroundPlotter) {
    _inherits(MainAreaBackgroundPlotter, _BackgroundPlotter);

    function MainAreaBackgroundPlotter(name) {
        _classCallCheck(this, MainAreaBackgroundPlotter);

        return _possibleConstructorReturn(this, (MainAreaBackgroundPlotter.__proto__ || Object.getPrototypeOf(MainAreaBackgroundPlotter)).call(this, name));
    }

    _createClass(MainAreaBackgroundPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var range = mgr.getRange(this.getAreaName());
            var theme = mgr.getTheme(this.getFrameName());
            var rect = area.getRect();
            if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
                var first = timeline.getFirstIndex();
                var last = timeline.getLastIndex() - 2;
                var start = Math.max(first, last);
                rect.X = timeline.toColumnLeft(start);
                rect.Width = area.getRight() - rect.X;
            }
            context.fillStyle = theme.getColor(this._color);
            context.fillRect(rect.X, rect.Y, rect.Width, rect.Height);
        }
    }]);

    return MainAreaBackgroundPlotter;
}(BackgroundPlotter);

var RangeAreaBackgroundPlotter = exports.RangeAreaBackgroundPlotter = function (_BackgroundPlotter2) {
    _inherits(RangeAreaBackgroundPlotter, _BackgroundPlotter2);

    function RangeAreaBackgroundPlotter(name) {
        _classCallCheck(this, RangeAreaBackgroundPlotter);

        return _possibleConstructorReturn(this, (RangeAreaBackgroundPlotter.__proto__ || Object.getPrototypeOf(RangeAreaBackgroundPlotter)).call(this, name));
    }

    _createClass(RangeAreaBackgroundPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var areaName = this.getAreaName();
            var area = mgr.getArea(areaName);
            var range = mgr.getRange(areaName.substring(0, areaName.lastIndexOf("Range")));
            var isMainRange = range.getNameObject().getCompAt(2) === "main";
            if (!isMainRange && !area.isChanged() && !range.isUpdated()) {
                return;
            }
            var theme = mgr.getTheme(this.getFrameName());
            context.fillStyle = theme.getColor(this._color);
            context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
        }
    }]);

    return RangeAreaBackgroundPlotter;
}(BackgroundPlotter);

var TimelineAreaBackgroundPlotter = exports.TimelineAreaBackgroundPlotter = function (_BackgroundPlotter3) {
    _inherits(TimelineAreaBackgroundPlotter, _BackgroundPlotter3);

    function TimelineAreaBackgroundPlotter(name) {
        _classCallCheck(this, TimelineAreaBackgroundPlotter);

        return _possibleConstructorReturn(this, (TimelineAreaBackgroundPlotter.__proto__ || Object.getPrototypeOf(TimelineAreaBackgroundPlotter)).call(this, name));
    }

    _createClass(TimelineAreaBackgroundPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (!area.isChanged() && !timeline.isUpdated()) return;
            var theme = mgr.getTheme(this.getFrameName());
            context.fillStyle = theme.getColor(this._color);
            context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
        }
    }]);

    return TimelineAreaBackgroundPlotter;
}(BackgroundPlotter);

var CGridPlotter = exports.CGridPlotter = function (_NamedObject2) {
    _inherits(CGridPlotter, _NamedObject2);

    function CGridPlotter(name) {
        _classCallCheck(this, CGridPlotter);

        return _possibleConstructorReturn(this, (CGridPlotter.__proto__ || Object.getPrototypeOf(CGridPlotter)).call(this, name));
    }

    _createClass(CGridPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var range = mgr.getRange(this.getAreaName());
            var clipped = false;
            if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
                var first = timeline.getFirstIndex();
                var last = timeline.getLastIndex();
                var start = Math.max(first, last - 2);
                var left = timeline.toColumnLeft(start);
                context.save();
                context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
                context.clip();
                clipped = true;
            }
            var theme = mgr.getTheme(this.getFrameName());
            context.fillStyle = theme.getColor(themes.Theme.Color.Grid0);
            context.beginPath();
            var dashLen = 4,
                dashSolid = 1;
            if (Plotter.isChrome) {
                dashLen = 4;
                dashSolid = 1;
            }
            var gradations = range.getGradations();
            for (var n in gradations) {
                Plotter.createHorzDashedLine(context, area.getLeft(), area.getRight(), range.toY(gradations[n]), dashLen, dashSolid);
            }
            context.fill();
            if (clipped) {
                context.restore();
            }
        }
    }]);

    return CGridPlotter;
}(_named_object.NamedObject);

var CandlestickPlotter = exports.CandlestickPlotter = function (_NamedObject3) {
    _inherits(CandlestickPlotter, _NamedObject3);

    function CandlestickPlotter(name) {
        _classCallCheck(this, CandlestickPlotter);

        return _possibleConstructorReturn(this, (CandlestickPlotter.__proto__ || Object.getPrototypeOf(CandlestickPlotter)).call(this, name));
    }

    _createClass(CandlestickPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 1) {
                return;
            }
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var range = mgr.getRange(this.getAreaName());
            if (range.getRange() === 0.0) {
                return;
            }
            var theme = mgr.getTheme(this.getFrameName());
            var dark = _util.Util.isInstance(theme, themes.DarkTheme);
            var first = timeline.getFirstIndex();
            var last = timeline.getLastIndex();
            var start = void 0;
            if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) start = first;else start = Math.max(first, last - 2);
            var cW = timeline.getColumnWidth();
            var iW = timeline.getItemWidth();
            var left = timeline.toItemLeft(start);
            var center = timeline.toItemCenter(start);
            var strokePosRects = [];
            var fillPosRects = [];
            var fillUchRects = [];
            var fillNegRects = [];
            for (var i = start; i < last; i++) {
                var data = ds.getDataAt(i);
                var high = range.toY(data.high);
                var low = range.toY(data.low);
                var open = data.open;
                var close = data.close;
                if (close > open) {
                    var top = range.toY(close);
                    var bottom = range.toY(open);
                    var iH = Math.max(bottom - top, 1);
                    if (iH > 1 && iW > 1 && dark) strokePosRects.push({ x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1 });else fillPosRects.push({ x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                    if (data.high > close) {
                        high = Math.min(high, top - 1);
                        fillPosRects.push({ x: center, y: high, w: 1, h: top - high });
                    }
                    if (open > data.low) {
                        low = Math.max(low, bottom + 1);
                        fillPosRects.push({ x: center, y: bottom, w: 1, h: low - bottom });
                    }
                } else if (close === open) {
                    var _top = range.toY(close);
                    fillUchRects.push({ x: left, y: _top, w: Math.max(iW, 1), h: 1 });
                    if (data.high > close) high = Math.min(high, _top - 1);
                    if (open > data.low) low = Math.max(low, _top + 1);
                    if (high < low) fillUchRects.push({ x: center, y: high, w: 1, h: low - high });
                } else {
                    var _top2 = range.toY(open);
                    var _bottom = range.toY(close);
                    var _iH = Math.max(_bottom - _top2, 1);
                    fillNegRects.push({ x: left, y: _top2, w: Math.max(iW, 1), h: Math.max(_iH, 1) });
                    if (data.high > open) high = Math.min(high, _top2 - 1);
                    if (close > data.low) low = Math.max(low, _bottom + 1);
                    if (high < low) fillNegRects.push({ x: center, y: high, w: 1, h: low - high });
                }
                left += cW;
                center += cW;
            }
            if (strokePosRects.length > 0) {
                context.strokeStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, strokePosRects);
                context.stroke();
            }
            if (fillPosRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, fillPosRects);
                context.fill();
            }
            if (fillUchRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillUchRects);
                context.fill();
            }
            if (fillNegRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillNegRects);
                context.fill();
            }
        }
    }]);

    return CandlestickPlotter;
}(_named_object.NamedObject);

var CandlestickHLCPlotter = exports.CandlestickHLCPlotter = function (_Plotter2) {
    _inherits(CandlestickHLCPlotter, _Plotter2);

    function CandlestickHLCPlotter(name) {
        _classCallCheck(this, CandlestickHLCPlotter);

        return _possibleConstructorReturn(this, (CandlestickHLCPlotter.__proto__ || Object.getPrototypeOf(CandlestickHLCPlotter)).call(this, name));
    }

    _createClass(CandlestickHLCPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (!_util.Util.isInstance(ds, data_sources.MainDataSource) || ds.getDataCount() < 1) {
                return;
            }
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var range = mgr.getRange(this.getAreaName());
            if (range.getRange() === 0.0) {
                return;
            }
            var theme = mgr.getTheme(this.getFrameName());
            var dark = _util.Util.isInstance(theme, themes.DarkTheme);
            var first = timeline.getFirstIndex();
            var last = timeline.getLastIndex();
            var start = void 0;
            if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
                start = first;
            } else {
                start = Math.max(first, last - 2);
            }
            var cW = timeline.getColumnWidth();
            var iW = timeline.getItemWidth();
            var left = timeline.toItemLeft(start);
            var center = timeline.toItemCenter(start);
            var strokePosRects = [];
            var fillPosRects = [];
            var fillUchRects = [];
            var fillNegRects = [];
            for (var i = start; i < last; i++) {
                var data = ds.getDataAt(i);
                var high = range.toY(data.high);
                var low = range.toY(data.low);
                var open = data.open;
                if (i > 0) {
                    open = ds.getDataAt(i - 1).close;
                }
                var close = data.close;
                if (close > open) {
                    var top = range.toY(close);
                    var bottom = range.toY(open);
                    var iH = Math.max(bottom - top, 1);
                    if (iH > 1 && iW > 1 && dark) {
                        strokePosRects.push({ x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1 });
                    } else {
                        fillPosRects.push({ x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                    }
                    if (data.high > close) {
                        high = Math.min(high, top - 1);
                        fillPosRects.push({ x: center, y: high, w: 1, h: top - high });
                    }
                    if (open > data.low) {
                        low = Math.max(low, bottom + 1);
                        fillPosRects.push({ x: center, y: bottom, w: 1, h: low - bottom });
                    }
                } else if (close === open) {
                    var _top3 = range.toY(close);
                    fillUchRects.push({ x: left, y: _top3, w: Math.max(iW, 1), h: 1 });
                    if (data.high > close) {
                        high = Math.min(high, _top3 - 1);
                    }
                    if (open > data.low) {
                        low = Math.max(low, _top3 + 1);
                    }
                    if (high < low) {
                        fillUchRects.push({ x: center, y: high, w: 1, h: low - high });
                    }
                } else {
                    var _top4 = range.toY(open);
                    var _bottom2 = range.toY(close);
                    var _iH2 = Math.max(_bottom2 - _top4, 1);
                    fillNegRects.push({ x: left, y: _top4, w: Math.max(iW, 1), h: Math.max(_iH2, 1) });
                    if (data.high > open) {
                        high = Math.min(high, _top4 - 1);
                    }
                    if (close > data.low) {
                        low = Math.max(low, _bottom2 + 1);
                    }
                    if (high < low) {
                        fillNegRects.push({ x: center, y: high, w: 1, h: low - high });
                    }
                }
                left += cW;
                center += cW;
            }
            if (strokePosRects.length > 0) {
                context.strokeStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, strokePosRects);
                context.stroke();
            }
            if (fillPosRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, fillPosRects);
                context.fill();
            }
            if (fillUchRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillUchRects);
                context.fill();
            }
            if (fillNegRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillNegRects);
                context.fill();
            }
        }
    }]);

    return CandlestickHLCPlotter;
}(Plotter);

var OHLCPlotter = exports.OHLCPlotter = function (_Plotter3) {
    _inherits(OHLCPlotter, _Plotter3);

    function OHLCPlotter(name) {
        _classCallCheck(this, OHLCPlotter);

        return _possibleConstructorReturn(this, (OHLCPlotter.__proto__ || Object.getPrototypeOf(OHLCPlotter)).call(this, name));
    }

    _createClass(OHLCPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (!_util.Util.isInstance(ds, data_sources.MainDataSource) || ds.getDataCount() < 1) {
                return;
            }
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var range = mgr.getRange(this.getAreaName());
            if (range.getRange() === 0.0) {
                return;
            }
            var theme = mgr.getTheme(this.getFrameName());
            var first = timeline.getFirstIndex();
            var last = timeline.getLastIndex();
            var start = void 0;
            if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
                start = first;
            } else {
                start = Math.max(first, last - 2);
            }
            var cW = timeline.getColumnWidth();
            var iW = timeline.getItemWidth() >> 1;
            var left = timeline.toItemLeft(start);
            var center = timeline.toItemCenter(start);
            var right = left + timeline.getItemWidth();
            var fillPosRects = [];
            var fillUchRects = [];
            var fillNegRects = [];
            for (var i = start; i < last; i++) {
                var data = ds.getDataAt(i);
                var high = range.toY(data.high);
                var low = range.toY(data.low);
                var iH = Math.max(low - high, 1);
                if (data.close > data.open) {
                    var top = range.toY(data.close);
                    var bottom = range.toY(data.open);
                    fillPosRects.push({ x: center, y: high, w: 1, h: iH });
                    fillPosRects.push({ x: left, y: top, w: iW, h: 1 });
                    fillPosRects.push({ x: center, y: bottom, w: iW, h: 1 });
                } else if (data.close === data.open) {
                    var y = range.toY(data.close);
                    fillUchRects.push({ x: center, y: high, w: 1, h: iH });
                    fillUchRects.push({ x: left, y: y, w: iW, h: 1 });
                    fillUchRects.push({ x: center, y: y, w: iW, h: 1 });
                } else {
                    var _top5 = range.toY(data.open);
                    var _bottom3 = range.toY(data.close);
                    fillNegRects.push({ x: center, y: high, w: 1, h: iH });
                    fillNegRects.push({ x: left, y: _top5, w: iW, h: 1 });
                    fillNegRects.push({ x: center, y: _bottom3, w: iW, h: 1 });
                }
                left += cW;
                center += cW;
                right += cW;
            }
            if (fillPosRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, fillPosRects);
                context.fill();
            }
            if (fillUchRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillUchRects);
                context.fill();
            }
            if (fillNegRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillNegRects);
                context.fill();
            }
        }
    }]);

    return OHLCPlotter;
}(Plotter);

var MainInfoPlotter = exports.MainInfoPlotter = function (_Plotter4) {
    _inherits(MainInfoPlotter, _Plotter4);

    function MainInfoPlotter(name) {
        _classCallCheck(this, MainInfoPlotter);

        return _possibleConstructorReturn(this, (MainInfoPlotter.__proto__ || Object.getPrototypeOf(MainInfoPlotter)).call(this, name));
    }

    _createClass(MainInfoPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var ds = mgr.getDataSource(this.getDataSourceName());
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "left";
            context.textBaseline = "top";
            context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
            var rect = {
                x: area.getLeft() + 4,
                y: area.getTop() + 2,
                w: area.getWidth() - 8,
                h: 20
            };
            var selIndex = timeline.getSelectedIndex();
            if (selIndex < 0) return;
            var data = ds.getDataAt(selIndex);
            var digits = ds.getDecimalDigits();
            var time = new Date(data.date);
            var year = time.getFullYear();
            var month = _util.Util.formatTime(time.getMonth() + 1);
            var date = _util.Util.formatTime(time.getDate());
            var hour = _util.Util.formatTime(time.getHours());
            var minute = _util.Util.formatTime(time.getMinutes());
            var lang = mgr.getLanguage();
            if (lang === "zh-cn") {
                // if (!Plotter.drawString(context, '时间: ' +
                //         year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect))
                //     return;
                if (!Plotter.drawString(context, '  开: ' + data.open.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  高: ' + data.high.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  低: ' + data.low.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  收: ' + data.close.toFixed(digits), rect)) return;
            } else if (lang === "en-us") {
                // if (!Plotter.drawString(context, 'DATE: ' +
                //         year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect))
                //     return;
                if (!Plotter.drawString(context, '  O: ' + data.open.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  H: ' + data.high.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  L: ' + data.low.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  C: ' + data.close.toFixed(digits), rect)) return;
            } else if (lang === "zh-tw") {
                // if (!Plotter.drawString(context, '時間: ' +
                //         year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect))
                //     return;
                if (!Plotter.drawString(context, '  開: ' + data.open.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  高: ' + data.high.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  低: ' + data.low.toFixed(digits), rect)) return;
                if (!Plotter.drawString(context, '  收: ' + data.close.toFixed(digits), rect)) return;
            }
            if (selIndex > 0) {
                if (lang === "zh-cn") {
                    if (!Plotter.drawString(context, '  涨幅: ', rect)) return;
                } else if (lang === "en-us") {
                    if (!Plotter.drawString(context, '  CHANGE: ', rect)) return;
                } else if (lang === "zh-tw") {
                    if (!Plotter.drawString(context, '  漲幅: ', rect)) return;
                }
                var prev = ds.getDataAt(selIndex - 1);
                var change = void 0;
                if ((data.close - prev.close) / prev.close * 100.0) {
                    change = (data.close - prev.close) / prev.close * 100.0;
                } else {
                    change = 0.00;
                }

                if (change >= 0) {
                    change = ' ' + change.toFixed(2);
                    context.fillStyle = theme.getColor(themes.Theme.Color.TextPositive);
                } else {
                    change = change.toFixed(2);
                    context.fillStyle = theme.getColor(themes.Theme.Color.TextNegative);
                }
                if (!Plotter.drawString(context, change, rect)) return;
                context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
                if (!Plotter.drawString(context, ' %', rect)) return;
            }

            var amplitude = void 0;
            if ((data.high - data.low) / data.low * 100.0) {
                amplitude = (data.high - data.low) / data.low * 100.0;
            } else {
                amplitude = 0.00;
            }

            if (lang === "zh-cn") {
                if (!Plotter.drawString(context, '  振幅: ' + amplitude.toFixed(2) + ' %', rect)) {
                    return;
                }
                // if (!Plotter.drawString(context, '  量: ' + data.volume.toFixed(2), rect)) {
                //     return;
                // }
            } else if (lang === "en-us") {
                if (!Plotter.drawString(context, '  AMPLITUDE: ' + amplitude.toFixed(2) + ' %', rect)) {
                    return;
                }
                // if (!Plotter.drawString(context, '  V: ' + data.volume.toFixed(2), rect)) {
                //     return;
                // }
            } else if (lang === "zh-tw") {
                if (!Plotter.drawString(context, '  振幅: ' + amplitude.toFixed(2) + ' %', rect)) {
                    return;
                }
                // if (!Plotter.drawString(context, '  量: ' + data.volume.toFixed(2), rect)) {
                //     return;
                // }
            }
            var dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
            if (dp === undefined) {
                return;
            }
            var indic = dp.getIndicator();
            var n = void 0,
                cnt = indic.getOutputCount();
            for (n = 0; n < cnt; n++) {
                var out = indic.getOutputAt(n);
                var v = out.execute(selIndex);
                if (isNaN(v)) {
                    continue;
                }
                var info = "  " + out.getName() + ": " + v.toFixed(digits);
                var color = out.getColor();
                if (color === undefined) {
                    color = themes.Theme.Color.Indicator0 + n;
                }
                context.fillStyle = theme.getColor(color);
                if (!Plotter.drawString(context, info, rect)) {
                    return;
                }
            }
        }
    }]);

    return MainInfoPlotter;
}(Plotter);

var IndicatorPlotter = exports.IndicatorPlotter = function (_NamedObject4) {
    _inherits(IndicatorPlotter, _NamedObject4);

    function IndicatorPlotter(name) {
        _classCallCheck(this, IndicatorPlotter);

        return _possibleConstructorReturn(this, (IndicatorPlotter.__proto__ || Object.getPrototypeOf(IndicatorPlotter)).call(this, name));
    }

    _createClass(IndicatorPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var range = mgr.getRange(this.getAreaName());
            if (range.getRange() === 0.0) return;
            var dp = mgr.getDataProvider(this.getName());
            if (!_util.Util.isInstance(dp, data_providers.IndicatorDataProvider)) return;
            var theme = mgr.getTheme(this.getFrameName());
            var cW = timeline.getColumnWidth();
            var first = timeline.getFirstIndex();
            var last = timeline.getLastIndex();
            var start = void 0;
            if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) start = first;else start = Math.max(first, last - 2);
            var indic = dp.getIndicator();
            var out = void 0,
                n = void 0,
                outCount = indic.getOutputCount();
            for (n = 0; n < outCount; n++) {
                out = indic.getOutputAt(n);
                var style = out.getStyle();
                if (style === exprs.OutputExpr.outputStyle.VolumeStick) {
                    this.drawVolumeStick(context, theme, mgr.getDataSource(this.getDataSourceName()), start, last, timeline.toItemLeft(start), cW, timeline.getItemWidth(), range);
                } else if (style === exprs.OutputExpr.outputStyle.MACDStick) {
                    this.drawMACDStick(context, theme, out, start, last, timeline.toItemLeft(start), cW, timeline.getItemWidth(), range);
                } else if (style === exprs.OutputExpr.outputStyle.SARPoint) {
                    this.drawSARPoint(context, theme, out, start, last, timeline.toItemCenter(start), cW, timeline.getItemWidth(), range);
                }
            }
            var left = timeline.toColumnLeft(start);
            var center = timeline.toItemCenter(start);
            context.save();
            context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
            context.clip();
            context.translate(0.5, 0.5);
            for (n = 0; n < outCount; n++) {
                var x = center;
                out = indic.getOutputAt(n);
                if (out.getStyle() === exprs.OutputExpr.outputStyle.Line) {
                    var v = void 0,
                        points = [];
                    if (start > first) {
                        v = out.execute(start - 1);
                        if (isNaN(v) === false) points.push({ "x": x - cW, "y": range.toY(v) });
                    }
                    for (var i = start; i < last; i++, x += cW) {
                        v = out.execute(i);
                        if (isNaN(v) === false) points.push({ "x": x, "y": range.toY(v) });
                    }
                    if (points.length > 0) {
                        var color = out.getColor();
                        if (color === undefined) color = themes.Theme.Color.Indicator0 + n;
                        context.strokeStyle = theme.getColor(color);
                        Plotter.drawLines(context, points);
                    }
                }
            }
            context.restore();
        }
    }, {
        key: 'drawVolumeStick',
        value: function drawVolumeStick(context, theme, ds, first, last, startX, cW, iW, range) {
            var dark = _util.Util.isInstance(theme, themes.DarkTheme);
            var left = startX;
            var bottom = range.toY(0);
            var strokePosRects = [];
            var fillPosRects = [];
            var fillNegRects = [];
            for (var i = first; i < last; i++) {
                var data = ds.getDataAt(i);
                var top = range.toY(data.volume);
                var iH = range.toHeight(data.volume);
                if (data.close > data.open) {
                    if (iH > 1 && iW > 1 && dark) {
                        strokePosRects.push({ x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1 });
                    } else {
                        fillPosRects.push({ x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                    }
                } else if (data.close === data.open) {
                    if (i > 0 && data.close >= ds.getDataAt(i - 1).close) {
                        if (iH > 1 && iW > 1 && dark) {
                            strokePosRects.push({ x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1 });
                        } else {
                            fillPosRects.push({ x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                        }
                    } else {
                        fillNegRects.push({ x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                    }
                } else {
                    fillNegRects.push({ x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                }
                left += cW;
            }
            if (strokePosRects.length > 0) {
                context.strokeStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, strokePosRects);
                context.stroke();
            }
            if (fillPosRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, fillPosRects);
                context.fill();
            }
            if (fillNegRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillNegRects);
                context.fill();
            }
        }
    }, {
        key: 'drawMACDStick',
        value: function drawMACDStick(context, theme, output, first, last, startX, cW, iW, range) {
            var left = startX;
            var middle = range.toY(0);
            var strokePosRects = [];
            var strokeNegRects = [];
            var fillPosRects = [];
            var fillNegRects = [];
            var prevMACD = first > 0 ? output.execute(first - 1) : NaN;
            for (var i = first; i < last; i++) {
                var MACD = output.execute(i);
                if (MACD >= 0) {
                    var iH = range.toHeight(MACD);
                    if ((i === 0 || MACD >= prevMACD) && iH > 1 && iW > 1) strokePosRects.push({ x: left + 0.5, y: middle - iH + 0.5, w: iW - 1, h: iH - 1 });else fillPosRects.push({ x: left, y: middle - iH, w: Math.max(iW, 1), h: Math.max(iH, 1) });
                } else {
                    var _iH3 = range.toHeight(-MACD);
                    if ((i === 0 || MACD >= prevMACD) && _iH3 > 1 && iW > 1) strokeNegRects.push({ x: left + 0.5, y: middle + 0.5, w: iW - 1, h: _iH3 - 1 });else fillNegRects.push({ x: left, y: middle, w: Math.max(iW, 1), h: Math.max(_iH3, 1) });
                }
                prevMACD = MACD;
                left += cW;
            }
            if (strokePosRects.length > 0) {
                context.strokeStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, strokePosRects);
                context.stroke();
            }
            if (strokeNegRects.length > 0) {
                context.strokeStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, strokeNegRects);
                context.stroke();
            }
            if (fillPosRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Positive);
                Plotter.createRectangles(context, fillPosRects);
                context.fill();
            }
            if (fillNegRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Negative);
                Plotter.createRectangles(context, fillNegRects);
                context.fill();
            }
        }
    }, {
        key: 'drawSARPoint',
        value: function drawSARPoint(context, theme, output, first, last, startX, cW, iW, range) {
            var r = iW >> 1;
            if (r < 0.5) r = 0.5;
            if (r > 4) r = 4;
            var center = startX;
            var right = center + r;
            var endAngle = 2 * Math.PI;
            context.save();
            context.translate(0.5, 0.5);
            context.strokeStyle = theme.getColor(themes.Theme.Color.Indicator3);
            context.beginPath();
            for (var i = first; i < last; i++) {
                var y = range.toY(output.execute(i));
                context.moveTo(right, y);
                context.arc(center, y, r, 0, endAngle);
                center += cW;
                right += cW;
            }
            context.stroke();
            context.restore();
        }
    }]);

    return IndicatorPlotter;
}(_named_object.NamedObject);

var IndicatorInfoPlotter = exports.IndicatorInfoPlotter = function (_Plotter5) {
    _inherits(IndicatorInfoPlotter, _Plotter5);

    function IndicatorInfoPlotter(name) {
        _classCallCheck(this, IndicatorInfoPlotter);

        return _possibleConstructorReturn(this, (IndicatorInfoPlotter.__proto__ || Object.getPrototypeOf(IndicatorInfoPlotter)).call(this, name));
    }

    _createClass(IndicatorInfoPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "left";
            context.textBaseline = "top";
            context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
            var rect = {
                x: area.getLeft() + 4,
                y: area.getTop() + 2,
                w: area.getWidth() - 8,
                h: 20
            };
            var indic = dp.getIndicator();
            var title = void 0;
            switch (indic.getParameterCount()) {
                case 0:
                    title = indic.getName();
                    break;
                case 1:
                    title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + ")";
                    break;
                case 2:
                    title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + ")";
                    break;
                case 3:
                    title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + "," + indic.getParameterAt(2).getValue() + ")";
                    break;
                case 4:
                    title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + "," + indic.getParameterAt(2).getValue() + "," + indic.getParameterAt(3).getValue() + ")";
                    break;
                default:
                    return;
            }
            if (!Plotter.drawString(context, title, rect)) return;
            var selIndex = timeline.getSelectedIndex();
            if (selIndex < 0) return;
            var out = void 0,
                v = void 0,
                info = void 0,
                color = void 0;
            var n = void 0,
                cnt = indic.getOutputCount();
            for (n = 0; n < cnt; n++) {
                out = indic.getOutputAt(n);
                v = out.execute(selIndex);
                if (isNaN(v)) continue;
                info = "  " + out.getName() + ": " + v.toFixed(2);
                color = out.getColor();
                if (color === undefined) color = themes.Theme.Color.Indicator0 + n;
                context.fillStyle = theme.getColor(color);
                if (!Plotter.drawString(context, info, rect)) return;
            }
        }
    }]);

    return IndicatorInfoPlotter;
}(Plotter);

var MinMaxPlotter = exports.MinMaxPlotter = function (_NamedObject5) {
    _inherits(MinMaxPlotter, _NamedObject5);

    function MinMaxPlotter(name) {
        _classCallCheck(this, MinMaxPlotter);

        return _possibleConstructorReturn(this, (MinMaxPlotter.__proto__ || Object.getPrototypeOf(MinMaxPlotter)).call(this, name));
    }

    _createClass(MinMaxPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 1) return;
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (timeline.getInnerWidth() < timeline.getColumnWidth()) return;
            var range = mgr.getRange(this.getAreaName());
            if (range.getRange() === 0) return;
            var dp = mgr.getDataProvider(this.getAreaName() + ".main");
            var first = timeline.getFirstIndex();
            var center = first + timeline.getLastIndex() >> 1;
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textBaseline = "middle";
            context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
            context.strokeStyle = theme.getColor(themes.Theme.Color.Text4);
            var digits = ds.getDecimalDigits();
            this.drawMark(context, dp.getMinValue(), digits, range.toY(dp.getMinValue()), first, center, dp.getMinValueIndex(), timeline);
            this.drawMark(context, dp.getMaxValue(), digits, range.toY(dp.getMaxValue()), first, center, dp.getMaxValueIndex(), timeline);
        }
    }, {
        key: 'drawMark',
        value: function drawMark(context, v, digits, y, first, center, index, timeline) {
            var arrowStart = void 0,
                arrowStop = void 0,
                _arrowStop = void 0;
            var textStart = void 0;
            if (index > center) {
                context.textAlign = "right";
                arrowStart = timeline.toItemCenter(index) - 4;
                arrowStop = arrowStart - 7;
                _arrowStop = arrowStart - 3;
                textStart = arrowStop - 4;
            } else {
                context.textAlign = "left";
                arrowStart = timeline.toItemCenter(index) + 4;
                arrowStop = arrowStart + 7;
                _arrowStop = arrowStart + 3;
                textStart = arrowStop + 4;
            }
            Plotter.drawLine(context, arrowStart, y, arrowStop, y);
            Plotter.drawLine(context, arrowStart, y, _arrowStop, y + 2);
            Plotter.drawLine(context, arrowStart, y, _arrowStop, y - 2);
            context.fillText(_util.Util.fromFloat(v, digits), textStart, y);
        }
    }]);

    return MinMaxPlotter;
}(_named_object.NamedObject);

var TimelinePlotter = exports.TimelinePlotter = function (_Plotter6) {
    _inherits(TimelinePlotter, _Plotter6);

    function TimelinePlotter(name) {
        _classCallCheck(this, TimelinePlotter);

        return _possibleConstructorReturn(this, (TimelinePlotter.__proto__ || Object.getPrototypeOf(TimelinePlotter)).call(this, name));
    }

    _createClass(TimelinePlotter, [{
        key: 'Draw',
        value: function Draw(context) {

            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (!area.isChanged() && !timeline.isUpdated()) return;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 2) return;
            var timeInterval = ds.getDataAt(1).date - ds.getDataAt(0).date;
            var n = void 0,
                cnt = TimelinePlotter.TIME_INTERVAL.length;
            for (n = 0; n < cnt; n++) {
                if (timeInterval < TimelinePlotter.TIME_INTERVAL[n]) break;
            }
            for (; n < cnt; n++) {
                if (TimelinePlotter.TIME_INTERVAL[n] % timeInterval === 0) if (TimelinePlotter.TIME_INTERVAL[n] / timeInterval * timeline.getColumnWidth() > 60) break;
            }
            var first = timeline.getFirstIndex();
            var last = timeline.getLastIndex();
            var d = new Date();
            var local_utc_diff = d.getTimezoneOffset() * 60 * 1000;
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "center";
            context.textBaseline = "middle";
            var lang = mgr.getLanguage();
            var gridRects = [];
            var top = area.getTop();
            var middle = area.getMiddle();
            for (var i = first; i < last; i++) {
                var utcDate = ds.getDataAt(i).date;
                var localDate = utcDate - local_utc_diff;
                var time = new Date(utcDate);
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var date = time.getDate();
                var hour = time.getHours();
                var minute = time.getMinutes();
                var text = "";
                if (n < cnt) {
                    var m = Math.max(TimelinePlotter.TP_DAY, TimelinePlotter.TIME_INTERVAL[n]);
                    if (localDate % m === 0) {
                        if (lang === "zh-cn") text = month.toString() + "月" + date.toString() + "日";else if (lang === "zh-tw") text = month.toString() + "月" + date.toString() + "日";else if (lang === "en-us") text = TimelinePlotter.MonthConvert[month] + " " + date.toString();
                        context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
                    } else if (localDate % TimelinePlotter.TIME_INTERVAL[n] === 0) {
                        var strMinute = minute.toString();
                        if (minute < 10) strMinute = "0" + strMinute;
                        text = hour.toString() + ":" + strMinute;
                        context.fillStyle = theme.getColor(themes.Theme.Color.Text2);
                    }
                } else if (date === 1 && hour < timeInterval / TimelinePlotter.TP_HOUR) {
                    if (month === 1) {
                        text = year.toString();
                        if (lang === "zh-cn") text += "年";else if (lang === "zh-tw") text += "年";
                    } else {
                        if (lang === "zh-cn") text = month.toString() + "月";else if (lang === "zh-tw") text = month.toString() + "月";else if (lang === "en-us") text = TimelinePlotter.MonthConvert[month];
                    }
                    context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
                }
                if (text.length > 0) {
                    var x = timeline.toItemCenter(i);
                    gridRects.push({ x: x, y: top, w: 1, h: 4 });
                    context.fillText(text, x, middle);
                }
            }
            if (gridRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Grid1);
                Plotter.createRectangles(context, gridRects);
                context.fill();
            }
        }
    }]);

    return TimelinePlotter;
}(Plotter);

TimelinePlotter.TP_MINUTE = 60 * 1000;
TimelinePlotter.TP_HOUR = 60 * TimelinePlotter.TP_MINUTE;
TimelinePlotter.TP_DAY = 24 * TimelinePlotter.TP_HOUR;
TimelinePlotter.TIME_INTERVAL = [5 * TimelinePlotter.TP_MINUTE, 10 * TimelinePlotter.TP_MINUTE, 15 * TimelinePlotter.TP_MINUTE, 30 * TimelinePlotter.TP_MINUTE, TimelinePlotter.TP_HOUR, 2 * TimelinePlotter.TP_HOUR, 3 * TimelinePlotter.TP_HOUR, 6 * TimelinePlotter.TP_HOUR, 12 * TimelinePlotter.TP_HOUR, TimelinePlotter.TP_DAY, 2 * TimelinePlotter.TP_DAY];
TimelinePlotter.MonthConvert = {
    1: "Jan.",
    2: "Feb.",
    3: "Mar.",
    4: "Apr.",
    5: "May.",
    6: "Jun.",
    7: "Jul.",
    8: "Aug.",
    9: "Sep.",
    10: "Oct.",
    11: "Nov.",
    12: "Dec."
};

var RangePlotter = exports.RangePlotter = function (_NamedObject6) {
    _inherits(RangePlotter, _NamedObject6);

    function RangePlotter(name) {
        _classCallCheck(this, RangePlotter);

        return _possibleConstructorReturn(this, (RangePlotter.__proto__ || Object.getPrototypeOf(RangePlotter)).call(this, name));
    }

    _createClass(RangePlotter, [{
        key: 'getRequiredWidth',
        value: function getRequiredWidth(context, v) {
            var mgr = _chart_manager.ChartManager.instance;
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            return context.measureText((Math.floor(v) + 0.88).toString()).width + 16;
        }
    }, {
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var areaName = this.getAreaName();
            var area = mgr.getArea(areaName);
            var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
            var range = mgr.getRange(rangeName);
            if (range.getRange() === 0.0) return;
            var isMainRange = range.getNameObject().getCompAt(2) === "main";
            if (isMainRange) {} else {
                if (!area.isChanged() && !range.isUpdated()) return;
            }
            var gradations = range.getGradations();
            if (gradations.length === 0) return;
            var left = area.getLeft();
            var right = area.getRight();
            var center = area.getCenter();
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = theme.getColor(themes.Theme.Color.Text2);
            var gridRects = [];
            for (var n in gradations) {
                var y = range.toY(gradations[n]);
                gridRects.push({ x: left, y: y, w: 6, h: 1 });
                gridRects.push({ x: right - 6, y: y, w: 6, h: 1 });
                context.fillText(_util.Util.fromFloat(gradations[n], 2), center, y);
            }
            if (gridRects.length > 0) {
                context.fillStyle = theme.getColor(themes.Theme.Color.Grid1);
                Plotter.createRectangles(context, gridRects);
                context.fill();
            }
        }
    }]);

    return RangePlotter;
}(_named_object.NamedObject);

var COrderGraphPlotter = exports.COrderGraphPlotter = function (_NamedObject7) {
    _inherits(COrderGraphPlotter, _NamedObject7);

    function COrderGraphPlotter(name) {
        _classCallCheck(this, COrderGraphPlotter);

        return _possibleConstructorReturn(this, (COrderGraphPlotter.__proto__ || Object.getPrototypeOf(COrderGraphPlotter)).call(this, name));
    }

    _createClass(COrderGraphPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            return this._Draw_(context);
        }
    }, {
        key: '_Draw_',
        value: function _Draw_(context) {
            if (this.Update() === false) return;
            if (this.updateData() === false) return;
            this.m_top = this.m_pArea.getTop();
            this.m_bottom = this.m_pArea.getBottom();
            this.m_left = this.m_pArea.getLeft();
            this.m_right = this.m_pArea.getRight();
            context.save();
            context.rect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
            context.clip();
            var all = _chart_manager.ChartManager.instance.getChart()._depthData;
            this.x_offset = 0;
            this.y_offset = 0;
            var ask_tmp = {};
            var bid_tmp = {};
            ask_tmp.x = this.m_left + all.array[this.m_ask_si].amounts * this.m_Step;
            ask_tmp.y = this.m_pRange.toY(all.array[this.m_ask_si].rate);
            bid_tmp.x = this.m_left + all.array[this.m_bid_si].amounts * this.m_Step;
            bid_tmp.y = this.m_pRange.toY(all.array[this.m_bid_si].rate);
            if (Math.abs(ask_tmp.y - bid_tmp.y) < 1) {
                this.y_offset = 1;
            }
            this.x_offset = 1;
            this.DrawBackground(context);
            this.UpdatePoints();
            this.FillBlack(context);
            this.DrawGradations(context);
            this.DrawLine(context);
            context.restore();
        }
    }, {
        key: 'DrawBackground',
        value: function DrawBackground(context) {
            context.fillStyle = this.m_pTheme.getColor(themes.Theme.Color.Background);
            context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
            var all = _chart_manager.ChartManager.instance.getChart()._depthData;
            if (this.m_mode === 0) {
                var ask_bottom = this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset;
                var bid_top = this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset;
                var ask_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
                ask_gradient.addColorStop(0, this.m_pTheme.getColor(themes.Theme.Color.Background));
                ask_gradient.addColorStop(1, this.m_pTheme.getColor(themes.Theme.Color.PositiveDark));
                context.fillStyle = ask_gradient;
                context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, ask_bottom - this.m_top);
                var bid_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
                bid_gradient.addColorStop(0, this.m_pTheme.getColor(themes.Theme.Color.Background));
                bid_gradient.addColorStop(1, this.m_pTheme.getColor(themes.Theme.Color.NegativeDark));
                context.fillStyle = bid_gradient;
                context.fillRect(this.m_left, bid_top, this.m_right - this.m_left, this.m_bottom - bid_top);
            } else if (this.m_mode === 1) {
                var _ask_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
                _ask_gradient.addColorStop(0, this.m_pTheme.getColor(themes.Theme.Color.Background));
                _ask_gradient.addColorStop(1, this.m_pTheme.getColor(themes.Theme.Color.PositiveDark));
                context.fillStyle = _ask_gradient;
                context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
            } else if (this.m_mode === 2) {
                var _bid_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
                _bid_gradient.addColorStop(0, this.m_pTheme.getColor(themes.Theme.Color.Background));
                _bid_gradient.addColorStop(1, this.m_pTheme.getColor(themes.Theme.Color.NegativeDark));
                context.fillStyle = _bid_gradient;
                context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
            }
        }
    }, {
        key: 'DrawLine',
        value: function DrawLine(context) {
            if (this.m_mode === 0 || this.m_mode === 1) {
                context.strokeStyle = this.m_pTheme.getColor(themes.Theme.Color.Positive);
                context.beginPath();
                context.moveTo(Math.floor(this.m_ask_points[0].x) + 0.5, Math.floor(this.m_ask_points[0].y) + 0.5);
                for (var i = 1; i < this.m_ask_points.length; i++) {
                    context.lineTo(Math.floor(this.m_ask_points[i].x) + 0.5, Math.floor(this.m_ask_points[i].y) + 0.5);
                }
                context.stroke();
            }
            if (this.m_mode === 0 || this.m_mode === 2) {
                context.strokeStyle = this.m_pTheme.getColor(themes.Theme.Color.Negative);
                context.beginPath();
                context.moveTo(this.m_bid_points[0].x + 0.5, this.m_bid_points[0].y + 0.5);
                for (var _i2 = 1; _i2 < this.m_bid_points.length; _i2++) {
                    context.lineTo(this.m_bid_points[_i2].x + 0.5, this.m_bid_points[_i2].y + 0.5);
                }
                context.stroke();
            }
        }
    }, {
        key: 'UpdatePoints',
        value: function UpdatePoints() {
            var all = _chart_manager.ChartManager.instance.getChart()._depthData;
            this.m_ask_points = [];
            var index_ask = {};
            index_ask.x = Math.floor(this.m_left);
            index_ask.y = Math.floor(this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset);
            this.m_ask_points.push(index_ask);
            var ask_p_i = 0;
            for (var i = this.m_ask_si; i >= this.m_ask_ei; i--) {
                var index0 = {};
                var index1 = {};
                if (i === this.m_ask_si) {
                    index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
                    index0.y = Math.floor(this.m_pRange.toY(all.array[i].rate) - this.y_offset);
                    this.m_ask_points.push(index0);
                    ask_p_i = 1;
                } else {
                    index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
                    index0.y = Math.floor(this.m_ask_points[ask_p_i].y);
                    index1.x = Math.floor(index0.x);
                    index1.y = Math.floor(this.m_pRange.toY(all.array[i].rate) - this.y_offset);
                    this.m_ask_points.push(index0);
                    ask_p_i++;
                    this.m_ask_points.push(index1);
                    ask_p_i++;
                }
            }
            this.m_bid_points = [];
            var index_bid = {};
            index_bid.x = Math.floor(this.m_left);
            index_bid.y = Math.ceil(this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset);
            this.m_bid_points.push(index_bid);
            var bid_p_i = 0;
            for (var _i3 = this.m_bid_si; _i3 <= this.m_bid_ei; _i3++) {
                var _index = {};
                var _index2 = {};
                if (_i3 === this.m_bid_si) {
                    _index.x = Math.floor(this.m_left + all.array[_i3].amounts * this.m_Step + this.x_offset);
                    _index.y = Math.ceil(this.m_pRange.toY(all.array[_i3].rate) + this.y_offset);
                    this.m_bid_points.push(_index);
                    bid_p_i = 1;
                } else {
                    _index.x = Math.floor(this.m_left + all.array[_i3].amounts * this.m_Step + this.x_offset);
                    _index.y = Math.ceil(this.m_bid_points[bid_p_i].y);
                    _index2.x = Math.floor(_index.x);
                    _index2.y = Math.ceil(this.m_pRange.toY(all.array[_i3].rate) + this.x_offset);
                    this.m_bid_points.push(_index);
                    bid_p_i++;
                    this.m_bid_points.push(_index2);
                    bid_p_i++;
                }
            }
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var all = _chart_manager.ChartManager.instance.getChart()._depthData;
            if (all.array === null) return false;
            if (all.array.length <= 50) return false;
            var minRange = this.m_pRange.getOuterMinValue();
            var maxRange = this.m_pRange.getOuterMaxValue();
            this.m_ask_si = all.asks_si;
            this.m_ask_ei = all.asks_si;
            for (var i = all.asks_si; i >= all.asks_ei; i--) {
                if (all.array[i].rate < maxRange) this.m_ask_ei = i;else break;
            }
            this.m_bid_si = all.bids_si;
            this.m_bid_ei = all.bids_si;
            for (var _i4 = all.bids_si; _i4 <= all.bids_ei; _i4++) {
                if (all.array[_i4].rate > minRange) this.m_bid_ei = _i4;else break;
            }
            if (this.m_ask_ei === this.m_ask_si) this.m_mode = 2;else if (this.m_bid_ei === this.m_bid_si) this.m_mode = 1;else this.m_mode = 0;
            this.m_Step = this.m_pArea.getWidth();
            if (this.m_mode === 0) {
                /*
                 * View: B     --------    T
                 * Data: Lo      -----     Hi
                 */
                if (this.m_ask_ei === all.asks_ei && this.m_bid_ei === all.bids_ei) {
                    this.m_Step /= Math.min(all.array[this.m_ask_ei].amounts, all.array[this.m_bid_ei].amounts);
                }
                /*
                 * View: B     --------     T
                 * Data: Lo         -----   Hi
                 */
                else if (this.m_ask_ei !== all.asks_ei && this.m_bid_ei === all.bids_ei) {
                        this.m_Step /= all.array[this.m_bid_ei].amounts;
                    }
                    /*
                     * View: B     --------    T
                     * Data: Lo  -----         Hi
                     */
                    else if (this.m_ask_ei === all.asks_ei && this.m_bid_ei !== all.bids_ei) {
                            this.m_Step /= all.array[this.m_ask_ei].amounts;
                        }
                        /*
                         * View: B     --------    T
                         * Data: Lo  ------------  Hi
                         */
                        else if (this.m_ask_ei !== all.asks_ei && this.m_bid_ei !== all.bids_ei) {
                                this.m_Step /= Math.max(all.array[this.m_ask_ei].amounts, all.array[this.m_bid_ei].amounts);
                            }
            } else if (this.m_mode === 1) {
                this.m_Step /= all.array[this.m_ask_ei].amounts;
            } else if (this.m_mode === 2) {
                this.m_Step /= all.array[this.m_bid_ei].amounts;
            }
            return true;
        }
    }, {
        key: 'Update',
        value: function Update() {
            this.m_pMgr = _chart_manager.ChartManager.instance;
            var areaName = this.getAreaName();
            this.m_pArea = this.m_pMgr.getArea(areaName);
            if (this.m_pArea === null) return false;
            var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
            this.m_pRange = this.m_pMgr.getRange(rangeName);
            if (this.m_pRange === null || this.m_pRange.getRange() === 0.0) return false;
            this.m_pTheme = this.m_pMgr.getTheme(this.getFrameName());
            if (this.m_pTheme === null) {
                return false;
            }
            return true;
        }
    }, {
        key: 'DrawGradations',
        value: function DrawGradations(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var areaName = this.getAreaName();
            var area = mgr.getArea(areaName);
            var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
            var range = mgr.getRange(rangeName);
            if (range.getRange() === 0.0) return;
            var gradations = range.getGradations();
            if (gradations.length === 0) return;
            var left = area.getLeft();
            var right = area.getRight();
            var gridRects = [];
            for (var n in gradations) {
                var y = range.toY(gradations[n]);
                gridRects.push({ x: left, y: y, w: 6, h: 1 });
                gridRects.push({ x: right - 6, y: y, w: 6, h: 1 });
            }
            if (gridRects.length > 0) {
                var theme = mgr.getTheme(this.getFrameName());
                context.fillStyle = theme.getColor(themes.Theme.Color.Grid1);
                Plotter.createRectangles(context, gridRects);
                context.fill();
            }
        }
    }, {
        key: 'FillBlack',
        value: function FillBlack(context) {
            var ask_point = this.m_ask_points;
            var bid_point = this.m_bid_points;
            var ask_first_add = {};
            var ask_last_add = {};
            ask_first_add.x = this.m_right;
            ask_first_add.y = ask_point[0].y;
            ask_last_add.x = this.m_right;
            ask_last_add.y = ask_point[ask_point.length - 1].y;
            var bid_first_add = {};
            var bid_last_add = {};
            bid_first_add.x = this.m_right;
            bid_first_add.y = bid_point[0].y - 1;
            bid_last_add.x = this.m_right;
            bid_last_add.y = bid_point[bid_point.length - 1].y;
            ask_point.unshift(ask_first_add);
            ask_point.push(ask_last_add);
            bid_point.unshift(bid_first_add);
            bid_point.push(bid_last_add);
            context.fillStyle = this.m_pTheme.getColor(themes.Theme.Color.Background);
            context.beginPath();
            context.moveTo(Math.floor(ask_point[0].x) + 0.5, Math.floor(ask_point[0].y) + 0.5);
            for (var i = 1; i < ask_point.length; i++) {
                context.lineTo(Math.floor(ask_point[i].x) + 0.5, Math.floor(ask_point[i].y) + 0.5);
            }
            context.fill();
            context.beginPath();
            context.moveTo(Math.floor(bid_point[0].x) + 0.5, Math.floor(bid_point[0].y) + 0.5);
            for (var _i5 = 1; _i5 < bid_point.length; _i5++) {
                context.lineTo(Math.floor(bid_point[_i5].x) + 0.5, Math.floor(bid_point[_i5].y) + 0.5);
            }
            context.fill();
            ask_point.shift();
            ask_point.pop();
            bid_point.shift();
            bid_point.pop();
        }
    }, {
        key: 'DrawTickerGraph',
        value: function DrawTickerGraph(context) {
            // return;
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            var ticker = ds._dataItems[ds._dataItems.length - 1].close;
            var p1x = this.m_left + 1;
            var p1y = this.m_pRange.toY(ticker);
            var p2x = p1x + 5;
            var p2y = p1y + 2.5;
            var p3x = p1x + 5;
            var p3y = p1y - 2.5;
            context.fillStyle = this.m_pTheme.getColor(themes.Theme.Color.Mark);
            context.strokeStyle = this.m_pTheme.getColor(themes.Theme.Color.Mark);
        }
    }]);

    return COrderGraphPlotter;
}(_named_object.NamedObject);

var LastVolumePlotter = exports.LastVolumePlotter = function (_Plotter7) {
    _inherits(LastVolumePlotter, _Plotter7);

    function LastVolumePlotter(name) {
        _classCallCheck(this, LastVolumePlotter);

        return _possibleConstructorReturn(this, (LastVolumePlotter.__proto__ || Object.getPrototypeOf(LastVolumePlotter)).call(this, name));
    }

    _createClass(LastVolumePlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var areaName = this.getAreaName();
            var area = mgr.getArea(areaName);
            var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
            var range = mgr.getRange(rangeName);
            if (range.getRange() === 0.0) return;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 1) return;
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillStyle = theme.getColor(themes.Theme.Color.RangeMark);
            context.strokeStyle = theme.getColor(themes.Theme.Color.RangeMark);
            var v = ds.getDataAt(ds.getDataCount() - 1).volume;
            var y = range.toY(v);
            var left = area.getLeft() + 1;
            Plotter.drawLine(context, left, y, left + 7, y);
            Plotter.drawLine(context, left, y, left + 3, y + 2);
            Plotter.drawLine(context, left, y, left + 3, y - 2);
            context.fillText(_util.Util.fromFloat(v, 2), left + 10, y);
        }
    }]);

    return LastVolumePlotter;
}(Plotter);

var LastClosePlotter = exports.LastClosePlotter = function (_Plotter8) {
    _inherits(LastClosePlotter, _Plotter8);

    function LastClosePlotter(name) {
        _classCallCheck(this, LastClosePlotter);

        return _possibleConstructorReturn(this, (LastClosePlotter.__proto__ || Object.getPrototypeOf(LastClosePlotter)).call(this, name));
    }

    _createClass(LastClosePlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var timeline = mgr.getTimeline(this.getDataSourceName());
            var areaName = this.getAreaName();
            var area = mgr.getArea(areaName);
            var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
            var range = mgr.getRange(rangeName);
            if (range.getRange() === 0.0) return;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (ds.getDataCount() < 1) return;
            var v = ds._dataItems[ds._dataItems.length - 1].close;
            if (v <= range.getMinValue() || v >= range.getMaxValue()) return;
            var theme = mgr.getTheme(this.getFrameName());
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillStyle = theme.getColor(themes.Theme.Color.RangeMark);
            context.strokeStyle = theme.getColor(themes.Theme.Color.RangeMark);
            var y = range.toY(v);
            var left = area.getLeft() + 1;
            Plotter.drawLine(context, left, y, left + 7, y);
            Plotter.drawLine(context, left, y, left + 3, y + 2);
            Plotter.drawLine(context, left, y, left + 3, y - 2);
            context.fillText(_util.Util.fromFloat(v, ds.getDecimalDigits()), left + 10, y);
        }
    }]);

    return LastClosePlotter;
}(Plotter);

var SelectionPlotter = exports.SelectionPlotter = function (_Plotter9) {
    _inherits(SelectionPlotter, _Plotter9);

    function SelectionPlotter(name) {
        _classCallCheck(this, SelectionPlotter);

        return _possibleConstructorReturn(this, (SelectionPlotter.__proto__ || Object.getPrototypeOf(SelectionPlotter)).call(this, name));
    }

    _createClass(SelectionPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            if (mgr._drawingTool !== _chart_manager.ChartManager.DrawingTool.CrossCursor) {
                return;
            }
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (timeline.getSelectedIndex() < 0) {
                return;
            }
            var range = mgr.getRange(this.getAreaName());
            var theme = mgr.getTheme(this.getFrameName());
            context.strokeStyle = theme.getColor(themes.Theme.Color.Cursor);
            var x = timeline.toItemCenter(timeline.getSelectedIndex());
            Plotter.drawLine(context, x, area.getTop() - 1, x, area.getBottom());
            var pos = range.getSelectedPosition();
            if (pos >= 0) {
                Plotter.drawLine(context, area.getLeft(), pos, area.getRight(), pos);
            }
        }
    }]);

    return SelectionPlotter;
}(Plotter);

var TimelineSelectionPlotter = exports.TimelineSelectionPlotter = function (_Plotter10) {
    _inherits(TimelineSelectionPlotter, _Plotter10);

    function TimelineSelectionPlotter(name) {
        _classCallCheck(this, TimelineSelectionPlotter);

        return _possibleConstructorReturn(this, (TimelineSelectionPlotter.__proto__ || Object.getPrototypeOf(TimelineSelectionPlotter)).call(this, name));
    }

    _createClass(TimelineSelectionPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getAreaName());
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (timeline.getSelectedIndex() < 0) return;
            var ds = mgr.getDataSource(this.getDataSourceName());
            if (!_util.Util.isInstance(ds, data_sources.MainDataSource)) return;
            var theme = mgr.getTheme(this.getFrameName());
            var lang = mgr.getLanguage();
            var x = timeline.toItemCenter(timeline.getSelectedIndex());
            context.fillStyle = theme.getColor(themes.Theme.Color.Background);
            context.fillRect(x - 52.5, area.getTop() + 2.5, 106, 18);
            context.strokeStyle = theme.getColor(themes.Theme.Color.Grid3);
            context.strokeRect(x - 52.5, area.getTop() + 2.5, 106, 18);
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = theme.getColor(themes.Theme.Color.Text4);
            var time = new Date(ds.getDataAt(timeline.getSelectedIndex()).date);
            var month = time.getMonth() + 1;
            var date = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            var strMonth = month.toString();
            var strDate = date.toString();
            var strHour = hour.toString();
            var strMinute = minute.toString();
            var strSecond = second.toString();
            if (minute < 10) {
                strMinute = "0" + strMinute;
            }
            if (second < 10) {
                strSecond = "0" + strSecond;
            }
            var text = "";
            if (lang === "zh-cn") {
                text = strMonth + "月" + strDate + "日  " + strHour + ":" + strMinute;
            } else if (lang === "zh-tw") {
                text = strMonth + "月" + strDate + "日  " + strHour + ":" + strMinute;
            } else if (lang === "en-us") {
                text = TimelineSelectionPlotter.MonthConvert[month] + " " + strDate + "  " + strHour + ":" + strMinute;
            }
            if (_kline2.default.instance.range < 60000) {
                text += ":" + strSecond;
            }
            context.fillText(text, x, area.getMiddle());
        }
    }]);

    return TimelineSelectionPlotter;
}(Plotter);

TimelineSelectionPlotter.MonthConvert = {
    1: "Jan.",
    2: "Feb.",
    3: "Mar.",
    4: "Apr.",
    5: "May.",
    6: "Jun.",
    7: "Jul.",
    8: "Aug.",
    9: "Sep.",
    10: "Oct.",
    11: "Nov.",
    12: "Dec."
};

var RangeSelectionPlotter = exports.RangeSelectionPlotter = function (_NamedObject8) {
    _inherits(RangeSelectionPlotter, _NamedObject8);

    function RangeSelectionPlotter(name) {
        _classCallCheck(this, RangeSelectionPlotter);

        return _possibleConstructorReturn(this, (RangeSelectionPlotter.__proto__ || Object.getPrototypeOf(RangeSelectionPlotter)).call(this, name));
    }

    _createClass(RangeSelectionPlotter, [{
        key: 'Draw',
        value: function Draw(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var areaName = this.getAreaName();
            var area = mgr.getArea(areaName);
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (timeline.getSelectedIndex() < 0) {
                return;
            }
            var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
            var range = mgr.getRange(rangeName);
            if (range.getRange() === 0.0 || range.getSelectedPosition() < 0) {
                return;
            }
            var v = range.getSelectedValue();
            if (v === -Number.MAX_VALUE) {
                return;
            }
            var y = range.getSelectedPosition();
            Plotter.createPolygon(context, [{ "x": area.getLeft(), "y": y }, { "x": area.getLeft() + 5, "y": y + 10 }, { "x": area.getRight() - 3, "y": y + 10 }, { "x": area.getRight() - 3, "y": y - 10 }, { "x": area.getLeft() + 5, "y": y - 10 }]);
            var theme = mgr.getTheme(this.getFrameName());
            context.fillStyle = theme.getColor(themes.Theme.Color.Background);
            context.fill();
            context.strokeStyle = theme.getColor(themes.Theme.Color.Grid4);
            context.stroke();
            context.font = theme.getFont(themes.Theme.Font.Default);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = theme.getColor(themes.Theme.Color.Text3);
            var digits = 2;
            if (range.getNameObject().getCompAt(2) === "main") {
                digits = mgr.getDataSource(this.getDataSourceName()).getDecimalDigits();
            }
            context.fillText(_util.Util.fromFloat(v, digits), area.getCenter(), y);
        }
    }]);

    return RangeSelectionPlotter;
}(_named_object.NamedObject);

var CToolPlotter = exports.CToolPlotter = function (_NamedObject9) {
    _inherits(CToolPlotter, _NamedObject9);

    function CToolPlotter(name, toolObject) {
        _classCallCheck(this, CToolPlotter);

        var _this22 = _possibleConstructorReturn(this, (CToolPlotter.__proto__ || Object.getPrototypeOf(CToolPlotter)).call(this, name));

        _this22.toolObject = toolObject;
        var pMgr = _chart_manager.ChartManager.instance;
        var pArea = pMgr.getArea('frame0.k0.main');
        if (pArea === null) {
            _this22.areaPos = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            return _possibleConstructorReturn(_this22);
        }
        _this22.areaPos = {
            left: pArea.getLeft(),
            top: pArea.getTop(),
            right: pArea.getRight(),
            bottom: pArea.getBottom()
        };
        _this22.crossPt = {};
        _this22.normalSize = 4;
        _this22.selectedSize = 6;
        _this22.cursorLen = 4;
        _this22.cursorGapLen = 3;
        _this22.theme = _chart_manager.ChartManager.instance.getTheme(_this22.getFrameName());
        return _this22;
    }

    _createClass(CToolPlotter, [{
        key: 'drawCursor',
        value: function drawCursor(context) {
            this.drawCrossCursor(context);
        }
    }, {
        key: 'drawCrossCursor',
        value: function drawCrossCursor(context) {
            context.strokeStyle = this.theme.getColor(themes.Theme.Color.LineColorNormal);
            context.fillStyle = this.theme.getColor(themes.Theme.Color.LineColorNormal);
            var tempPt = this.toolObject.getPoint(0).getPosXY();
            if (tempPt === null) {
                return;
            }
            var x = tempPt.x;
            var y = tempPt.y;
            var cursorLen = this.cursorLen;
            var cursorGapLen = this.cursorGapLen;
            context.fillRect(x, y, 1, 1);
            Plotter.drawLine(context, x - cursorLen - cursorGapLen, y, x - cursorGapLen, y);
            Plotter.drawLine(context, x + cursorLen + cursorGapLen, y, x + cursorGapLen, y);
            Plotter.drawLine(context, x, y - cursorLen - cursorGapLen, x, y - cursorGapLen);
            Plotter.drawLine(context, x, y + cursorLen + cursorGapLen, x, y + cursorGapLen);
        }
    }, {
        key: 'drawCircle',
        value: function drawCircle(context, center, radius) {
            var centerX = center.x;
            var centerY = center.y;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = this.theme.getColor(themes.Theme.Color.CircleColorFill);
            context.fill();
            context.stroke();
        }
    }, {
        key: 'drawCtrlPt',
        value: function drawCtrlPt(context) {
            context.strokeStyle = this.theme.getColor(themes.Theme.Color.CircleColorStroke);
            for (var i = 0; i < this.ctrlPtsNum; i++) {
                this.drawCircle(context, this.ctrlPts[1][i], this.normalSize);
            }
        }
    }, {
        key: 'highlightCtrlPt',
        value: function highlightCtrlPt(context) {
            context.strokeStyle = this.theme.getColor(themes.Theme.Color.CircleColorStroke);
            for (var i = 0; i < this.ctrlPtsNum; i++) {
                if (this.toolObject.getPoint(i).getState() === _cpoint.CPoint.state.Highlight) this.drawCircle(context, this.ctrlPts[1][i], this.selectedSize);
            }
        }
    }, {
        key: 'drawFibRayLines',
        value: function drawFibRayLines(context, startPoint, endPoint) {
            for (var i = 0; i < this.fiboFansSequence.length; i++) {
                var stageY = startPoint.y + (100 - this.fiboFansSequence[i]) / 100 * (endPoint.y - startPoint.y);
                var tempStartPt = { x: startPoint.x, y: startPoint.y };
                var tempEndPt = { x: endPoint.x, y: stageY };
                this.drawRayLines(context, tempStartPt, tempEndPt);
            }
        }
    }, {
        key: 'drawRayLines',
        value: function drawRayLines(context, startPoint, endPoint) {
            this.getAreaPos();
            var tempStartPt = { x: startPoint.x, y: startPoint.y };
            var tempEndPt = { x: endPoint.x, y: endPoint.y };
            var crossPt = this.getRectCrossPt(this.areaPos, tempStartPt, tempEndPt);
            var tempCrossPt = void 0;
            if (endPoint.x === startPoint.x) {
                if (endPoint.y === startPoint.y) {
                    tempCrossPt = endPoint;
                } else {
                    tempCrossPt = endPoint.y > startPoint.y ? { x: crossPt[1].x, y: crossPt[1].y } : {
                        x: crossPt[0].x,
                        y: crossPt[0].y
                    };
                }
            } else {
                tempCrossPt = endPoint.x > startPoint.x ? { x: crossPt[1].x, y: crossPt[1].y } : {
                    x: crossPt[0].x,
                    y: crossPt[0].y
                };
            }
            Plotter.drawLine(context, startPoint.x, startPoint.y, tempCrossPt.x, tempCrossPt.y);
        }
    }, {
        key: 'lenBetweenPts',
        value: function lenBetweenPts(pt1, pt2) {
            return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
        }
    }, {
        key: 'getCtrlPts',
        value: function getCtrlPts() {
            for (var i = 0; i < this.ctrlPtsNum; i++) {
                this.ctrlPts[0][i] = this.toolObject.getPoint(i);
            }
        }
    }, {
        key: 'updateCtrlPtPos',
        value: function updateCtrlPtPos() {
            for (var i = 0; i < this.ctrlPtsNum; i++) {
                this.ctrlPts[1][i] = this.ctrlPts[0][i].getPosXY();
            }
        }
    }, {
        key: 'getAreaPos',
        value: function getAreaPos() {
            var pMgr = _chart_manager.ChartManager.instance;
            var pArea = pMgr.getArea('frame0.k0.main');
            if (pArea === null) {
                this.areaPos = {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                };
                return;
            }
            this.areaPos = {
                left: Math.floor(pArea.getLeft()),
                top: Math.floor(pArea.getTop()),
                right: Math.floor(pArea.getRight()),
                bottom: Math.floor(pArea.getBottom())
            };
        }
    }, {
        key: 'updateDraw',
        value: function updateDraw(context) {
            context.strokeStyle = this.theme.getColor(themes.Theme.Color.LineColorNormal);
            this.draw(context);
            this.drawCtrlPt(context);
        }
    }, {
        key: 'finishDraw',
        value: function finishDraw(context) {
            context.strokeStyle = this.theme.getColor(themes.Theme.Color.LineColorNormal);
            this.draw(context);
        }
    }, {
        key: 'highlight',
        value: function highlight(context) {
            context.strokeStyle = this.theme.getColor(themes.Theme.Color.LineColorSelected);
            this.draw(context);
            this.drawCtrlPt(context);
            this.highlightCtrlPt(context);
        }
    }]);

    return CToolPlotter;
}(_named_object.NamedObject);

var DrawStraightLinesPlotter = exports.DrawStraightLinesPlotter = function (_CToolPlotter) {
    _inherits(DrawStraightLinesPlotter, _CToolPlotter);

    function DrawStraightLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawStraightLinesPlotter);

        var _this23 = _possibleConstructorReturn(this, (DrawStraightLinesPlotter.__proto__ || Object.getPrototypeOf(DrawStraightLinesPlotter)).call(this, name, toolObject));

        _this23.toolObject = toolObject;
        _this23.ctrlPtsNum = 2;
        _this23.ctrlPts = [new Array(_this23.ctrlPtsNum), new Array(2)];
        _this23.getCtrlPts();
        return _this23;
    }

    _createClass(DrawStraightLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                Plotter.drawLine(context, this.areaPos.left, this.startPoint.y, this.areaPos.right, this.startPoint.y);
            } else {
                this.crossPt = this.getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
                Plotter.drawLine(context, this.crossPt[0].x, this.crossPt[0].y, this.crossPt[1].x, this.crossPt[1].y);
            }
        }
    }]);

    return DrawStraightLinesPlotter;
}(CToolPlotter);

var DrawSegLinesPlotter = exports.DrawSegLinesPlotter = function (_CToolPlotter2) {
    _inherits(DrawSegLinesPlotter, _CToolPlotter2);

    function DrawSegLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawSegLinesPlotter);

        var _this24 = _possibleConstructorReturn(this, (DrawSegLinesPlotter.__proto__ || Object.getPrototypeOf(DrawSegLinesPlotter)).call(this, name, toolObject));

        _this24.toolObject = toolObject;
        _this24.ctrlPtsNum = 2;
        _this24.ctrlPts = [new Array(_this24.ctrlPtsNum), new Array(2)];
        _this24.getCtrlPts();
        return _this24;
    }

    _createClass(DrawSegLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                this.endPoint.x += 1;
            }
            Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        }
    }]);

    return DrawSegLinesPlotter;
}(CToolPlotter);

var DrawRayLinesPlotter = exports.DrawRayLinesPlotter = function (_CToolPlotter3) {
    _inherits(DrawRayLinesPlotter, _CToolPlotter3);

    function DrawRayLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawRayLinesPlotter);

        var _this25 = _possibleConstructorReturn(this, (DrawRayLinesPlotter.__proto__ || Object.getPrototypeOf(DrawRayLinesPlotter)).call(this, name));

        _this25.toolObject = toolObject;
        _this25.ctrlPtsNum = 2;
        _this25.ctrlPts = [new Array(_this25.ctrlPtsNum), new Array(2)];
        _this25.getCtrlPts();
        return _this25;
    }

    _createClass(DrawRayLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                this.endPoint.x += 1;
            }
            this.drawRayLines(context, this.startPoint, this.endPoint);
        }
    }]);

    return DrawRayLinesPlotter;
}(CToolPlotter);

var DrawArrowLinesPlotter = exports.DrawArrowLinesPlotter = function (_CToolPlotter4) {
    _inherits(DrawArrowLinesPlotter, _CToolPlotter4);

    function DrawArrowLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawArrowLinesPlotter);

        var _this26 = _possibleConstructorReturn(this, (DrawArrowLinesPlotter.__proto__ || Object.getPrototypeOf(DrawArrowLinesPlotter)).call(this, name, toolObject));

        _this26.toolObject = toolObject;
        _this26.arrowSizeRatio = 0.03;
        _this26.arrowSize = 4;
        _this26.crossPt = { x: -1, y: -1 };
        _this26.ctrlPtsNum = 2;
        _this26.ctrlPts = [new Array(_this26.ctrlPtsNum), new Array(2)];
        _this26.getCtrlPts();
        return _this26;
    }

    _createClass(DrawArrowLinesPlotter, [{
        key: 'drawArrow',
        value: function drawArrow(context, startPoint, endPoint) {
            var len = this.lenBetweenPts(startPoint, endPoint);
            var vectorA = [endPoint.x - startPoint.x, endPoint.y - startPoint.y];
            this.crossPt.x = startPoint.x + (1 - this.arrowSize / len) * vectorA[0];
            this.crossPt.y = startPoint.y + (1 - this.arrowSize / len) * vectorA[1];
            var vectorAautho = [-vectorA[1], vectorA[0]];
            var Aautho = { x: vectorAautho[0], y: vectorAautho[1] };
            var origin = { x: 0, y: 0 };
            vectorAautho[0] = this.arrowSize * Aautho.x / this.lenBetweenPts(Aautho, origin);
            vectorAautho[1] = this.arrowSize * Aautho.y / this.lenBetweenPts(Aautho, origin);
            var arrowEndPt = [this.crossPt.x + vectorAautho[0], this.crossPt.y + vectorAautho[1]];
            Plotter.drawLine(context, endPoint.x, endPoint.y, arrowEndPt[0], arrowEndPt[1]);
            arrowEndPt = [this.crossPt.x - vectorAautho[0], this.crossPt.y - vectorAautho[1]];
            Plotter.drawLine(context, endPoint.x, endPoint.y, arrowEndPt[0], arrowEndPt[1]);
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                this.endPoint.x += 1;
            }
            Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
            this.drawArrow(context, this.startPoint, this.endPoint);
        }
    }]);

    return DrawArrowLinesPlotter;
}(CToolPlotter);

var DrawHoriStraightLinesPlotter = exports.DrawHoriStraightLinesPlotter = function (_CToolPlotter5) {
    _inherits(DrawHoriStraightLinesPlotter, _CToolPlotter5);

    function DrawHoriStraightLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawHoriStraightLinesPlotter);

        var _this27 = _possibleConstructorReturn(this, (DrawHoriStraightLinesPlotter.__proto__ || Object.getPrototypeOf(DrawHoriStraightLinesPlotter)).call(this, name));

        _this27.toolObject = toolObject;
        _this27.ctrlPtsNum = 1;
        _this27.ctrlPts = [new Array(_this27.ctrlPtsNum), new Array(2)];
        _this27.getCtrlPts();
        return _this27;
    }

    _createClass(DrawHoriStraightLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            Plotter.drawLine(context, this.areaPos.left, this.startPoint.y, this.areaPos.right, this.startPoint.y);
        }
    }]);

    return DrawHoriStraightLinesPlotter;
}(CToolPlotter);

var DrawHoriRayLinesPlotter = exports.DrawHoriRayLinesPlotter = function (_CToolPlotter6) {
    _inherits(DrawHoriRayLinesPlotter, _CToolPlotter6);

    function DrawHoriRayLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawHoriRayLinesPlotter);

        var _this28 = _possibleConstructorReturn(this, (DrawHoriRayLinesPlotter.__proto__ || Object.getPrototypeOf(DrawHoriRayLinesPlotter)).call(this, name));

        _this28.toolObject = toolObject;
        _this28.ctrlPtsNum = 2;
        _this28.ctrlPts = [new Array(_this28.ctrlPtsNum), new Array(2)];
        _this28.getCtrlPts();
        return _this28;
    }

    _createClass(DrawHoriRayLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            if (this.startPoint.x === this.endPoint.x) {
                Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.areaPos.right, this.startPoint.y);
            } else {
                var tempEndPt = { x: this.endPoint.x, y: this.startPoint.y };
                this.drawRayLines(context, this.startPoint, tempEndPt);
            }
        }
    }]);

    return DrawHoriRayLinesPlotter;
}(CToolPlotter);

var DrawHoriSegLinesPlotter = exports.DrawHoriSegLinesPlotter = function (_CToolPlotter7) {
    _inherits(DrawHoriSegLinesPlotter, _CToolPlotter7);

    function DrawHoriSegLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawHoriSegLinesPlotter);

        var _this29 = _possibleConstructorReturn(this, (DrawHoriSegLinesPlotter.__proto__ || Object.getPrototypeOf(DrawHoriSegLinesPlotter)).call(this, name, toolObject));

        _this29.toolObject = toolObject;
        _this29.ctrlPtsNum = 2;
        _this29.ctrlPts = [new Array(_this29.ctrlPtsNum), new Array(2)];
        _this29.getCtrlPts();
        return _this29;
    }

    _createClass(DrawHoriSegLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            this.endPoint.y = this.startPoint.y;
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x + 1, this.startPoint.y);
            } else {
                Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.startPoint.y);
            }
        }
    }]);

    return DrawHoriSegLinesPlotter;
}(CToolPlotter);

var DrawVertiStraightLinesPlotter = exports.DrawVertiStraightLinesPlotter = function (_CToolPlotter8) {
    _inherits(DrawVertiStraightLinesPlotter, _CToolPlotter8);

    function DrawVertiStraightLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawVertiStraightLinesPlotter);

        var _this30 = _possibleConstructorReturn(this, (DrawVertiStraightLinesPlotter.__proto__ || Object.getPrototypeOf(DrawVertiStraightLinesPlotter)).call(this, name));

        _this30.toolObject = toolObject;
        _this30.ctrlPtsNum = 1;
        _this30.ctrlPts = [new Array(_this30.ctrlPtsNum), new Array(2)];
        _this30.getCtrlPts();
        return _this30;
    }

    _createClass(DrawVertiStraightLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            Plotter.drawLine(context, this.startPoint.x, this.areaPos.top, this.startPoint.x, this.areaPos.bottom);
        }
    }]);

    return DrawVertiStraightLinesPlotter;
}(CToolPlotter);

var DrawPriceLinesPlotter = exports.DrawPriceLinesPlotter = function (_CToolPlotter9) {
    _inherits(DrawPriceLinesPlotter, _CToolPlotter9);

    function DrawPriceLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawPriceLinesPlotter);

        var _this31 = _possibleConstructorReturn(this, (DrawPriceLinesPlotter.__proto__ || Object.getPrototypeOf(DrawPriceLinesPlotter)).call(this, name));

        _this31.toolObject = toolObject;
        _this31.ctrlPtsNum = 1;
        _this31.ctrlPts = [new Array(_this31.ctrlPtsNum), new Array(2)];
        _this31.getCtrlPts();
        return _this31;
    }

    _createClass(DrawPriceLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            context.font = "12px Tahoma";
            context.textAlign = "left";
            context.fillStyle = this.theme.getColor(themes.Theme.Color.LineColorNormal);
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            var text = this.ctrlPts[0][0].getPosIV().v;
            Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.areaPos.right, this.startPoint.y);
            context.fillText(text.toFixed(2), this.startPoint.x + 2, this.startPoint.y - 15);
        }
    }]);

    return DrawPriceLinesPlotter;
}(CToolPlotter);

var ParallelLinesPlotter = exports.ParallelLinesPlotter = function (_CToolPlotter10) {
    _inherits(ParallelLinesPlotter, _CToolPlotter10);

    function ParallelLinesPlotter(name, toolObject) {
        _classCallCheck(this, ParallelLinesPlotter);

        var _this32 = _possibleConstructorReturn(this, (ParallelLinesPlotter.__proto__ || Object.getPrototypeOf(ParallelLinesPlotter)).call(this, name));

        _this32.toolObject = toolObject;
        return _this32;
    }

    _createClass(ParallelLinesPlotter, [{
        key: 'getParaPt',
        value: function getParaPt() {
            var vectorA = [];
            vectorA[0] = this.endPoint.x - this.startPoint.x;
            vectorA[1] = this.endPoint.y - this.startPoint.y;
            var vectorB = [];
            vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
            vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
            this.paraEndPoint = { x: -1, y: -1 };
            this.paraEndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
            this.paraEndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
        }
    }]);

    return ParallelLinesPlotter;
}(CToolPlotter);

var DrawBiParallelLinesPlotter = exports.DrawBiParallelLinesPlotter = function (_ParallelLinesPlotter) {
    _inherits(DrawBiParallelLinesPlotter, _ParallelLinesPlotter);

    function DrawBiParallelLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawBiParallelLinesPlotter);

        var _this33 = _possibleConstructorReturn(this, (DrawBiParallelLinesPlotter.__proto__ || Object.getPrototypeOf(DrawBiParallelLinesPlotter)).call(this, name, toolObject));

        _this33.toolObject = toolObject;
        _this33.ctrlPtsNum = 3;
        _this33.ctrlPts = [new Array(_this33.ctrlPtsNum), new Array(2)];
        _this33.getCtrlPts();
        return _this33;
    }

    _createClass(DrawBiParallelLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.paraStartPoint = this.ctrlPts[1][1];
            this.endPoint = this.ctrlPts[1][2];
            this.getParaPt();
            this.getAreaPos();
            this.crossPt0 = this.getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
            Plotter.drawLine(context, this.crossPt0[0].x, this.crossPt0[0].y, this.crossPt0[1].x, this.crossPt0[1].y);
            this.crossPt1 = this.getRectCrossPt(this.areaPos, this.paraStartPoint, this.paraEndPoint);
            Plotter.drawLine(context, this.crossPt1[0].x, this.crossPt1[0].y, this.crossPt1[1].x, this.crossPt1[1].y);
        }
    }]);

    return DrawBiParallelLinesPlotter;
}(ParallelLinesPlotter);

var DrawBiParallelRayLinesPlotter = exports.DrawBiParallelRayLinesPlotter = function (_ParallelLinesPlotter2) {
    _inherits(DrawBiParallelRayLinesPlotter, _ParallelLinesPlotter2);

    function DrawBiParallelRayLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawBiParallelRayLinesPlotter);

        var _this34 = _possibleConstructorReturn(this, (DrawBiParallelRayLinesPlotter.__proto__ || Object.getPrototypeOf(DrawBiParallelRayLinesPlotter)).call(this, name, toolObject));

        _this34.toolObject = toolObject;
        _this34.ctrlPtsNum = 3;
        _this34.ctrlPts = [new Array(_this34.ctrlPtsNum), new Array(2)];
        _this34.getCtrlPts();
        return _this34;
    }

    _createClass(DrawBiParallelRayLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.paraStartPoint = this.ctrlPts[1][1];
            this.endPoint = this.ctrlPts[1][2];
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                this.endPoint.x += 1;
            }
            this.getParaPt();
            this.drawRayLines(context, this.startPoint, this.endPoint);
            this.drawRayLines(context, this.paraStartPoint, this.paraEndPoint);
        }
    }]);

    return DrawBiParallelRayLinesPlotter;
}(ParallelLinesPlotter);

var DrawTriParallelLinesPlotter = exports.DrawTriParallelLinesPlotter = function (_ParallelLinesPlotter3) {
    _inherits(DrawTriParallelLinesPlotter, _ParallelLinesPlotter3);

    function DrawTriParallelLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawTriParallelLinesPlotter);

        var _this35 = _possibleConstructorReturn(this, (DrawTriParallelLinesPlotter.__proto__ || Object.getPrototypeOf(DrawTriParallelLinesPlotter)).call(this, name, toolObject));

        _this35.toolObject = toolObject;
        _this35.ctrlPtsNum = 3;
        _this35.ctrlPts = [new Array(_this35.ctrlPtsNum), new Array(2)];
        _this35.getCtrlPts();
        return _this35;
    }

    _createClass(DrawTriParallelLinesPlotter, [{
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.paraStartPoint = this.ctrlPts[1][1];
            this.endPoint = this.ctrlPts[1][2];
            var vectorA = [];
            vectorA[0] = this.endPoint.x - this.startPoint.x;
            vectorA[1] = this.endPoint.y - this.startPoint.y;
            var vectorB = [];
            vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
            vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
            this.para1EndPoint = { x: -1, y: -1 };
            this.para2EndPoint = { x: -1, y: -1 };
            this.para2StartPoint = { x: -1, y: -1 };
            this.para1EndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
            this.para1EndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
            this.para2StartPoint.x = this.startPoint.x - vectorB[0];
            this.para2StartPoint.y = this.startPoint.y - vectorB[1];
            this.para2EndPoint.x = this.endPoint.x - vectorB[0];
            this.para2EndPoint.y = this.endPoint.y - vectorB[1];
            this.getAreaPos();
            this.crossPt0 = this.getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
            Plotter.drawLine(context, this.crossPt0[0].x, this.crossPt0[0].y, this.crossPt0[1].x, this.crossPt0[1].y);
            this.crossPt1 = this.getRectCrossPt(this.areaPos, this.paraStartPoint, this.para1EndPoint);
            Plotter.drawLine(context, this.crossPt1[0].x, this.crossPt1[0].y, this.crossPt1[1].x, this.crossPt1[1].y);
            this.crossPt2 = this.getRectCrossPt(this.areaPos, this.para2StartPoint, this.para2EndPoint);
            Plotter.drawLine(context, this.crossPt2[0].x, this.crossPt2[0].y, this.crossPt2[1].x, this.crossPt2[1].y);
        }
    }]);

    return DrawTriParallelLinesPlotter;
}(ParallelLinesPlotter);

var BandLinesPlotter = exports.BandLinesPlotter = function (_CToolPlotter11) {
    _inherits(BandLinesPlotter, _CToolPlotter11);

    function BandLinesPlotter(name, toolObject) {
        _classCallCheck(this, BandLinesPlotter);

        var _this36 = _possibleConstructorReturn(this, (BandLinesPlotter.__proto__ || Object.getPrototypeOf(BandLinesPlotter)).call(this, name));

        _this36.toolObject = toolObject;
        _this36.ctrlPtsNum = 2;
        _this36.ctrlPts = [new Array(_this36.ctrlPtsNum), new Array(2)];
        _this36.getCtrlPts();
        return _this36;
    }

    _createClass(BandLinesPlotter, [{
        key: 'drawLinesAndInfo',
        value: function drawLinesAndInfo(context, startPoint, endPoint) {
            context.font = "12px Tahoma";
            context.textAlign = "left";
            context.fillStyle = this.theme.getColor(themes.Theme.Color.LineColorNormal);
            var text = void 0;
            if (this.toolObject.state === ctools.CToolObject.state.Draw) {
                this.startPtValue = this.toolObject.getPoint(0).getPosIV().v;
                this.endPtValue = this.toolObject.getPoint(1).getPosIV().v;
            }
            this.getAreaPos();
            for (var i = 0; i < this.fiboSequence.length; i++) {
                var stageY = startPoint.y + (100 - this.fiboSequence[i]) / 100 * (endPoint.y - startPoint.y);
                if (stageY > this.areaPos.bottom) continue;
                var stageYvalue = this.startPtValue + (100 - this.fiboSequence[i]) / 100 * (this.endPtValue - this.startPtValue);
                Plotter.drawLine(context, this.areaPos.left, stageY, this.areaPos.right, stageY);
                text = this.fiboSequence[i].toFixed(1) + '% ' + stageYvalue.toFixed(1);
                context.fillText(text, this.areaPos.left + 2, stageY - 15);
            }
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
        }
    }]);

    return BandLinesPlotter;
}(CToolPlotter);

var DrawFibRetracePlotter = exports.DrawFibRetracePlotter = function (_BandLinesPlotter) {
    _inherits(DrawFibRetracePlotter, _BandLinesPlotter);

    function DrawFibRetracePlotter(name, toolObject) {
        _classCallCheck(this, DrawFibRetracePlotter);

        var _this37 = _possibleConstructorReturn(this, (DrawFibRetracePlotter.__proto__ || Object.getPrototypeOf(DrawFibRetracePlotter)).call(this, name, toolObject));

        _this37.toolObject = toolObject;
        _this37.fiboSequence = [100.0, 78.6, 61.8, 50.0, 38.2, 23.6, 0.0];
        return _this37;
    }

    return DrawFibRetracePlotter;
}(BandLinesPlotter);

var DrawBandLinesPlotter = exports.DrawBandLinesPlotter = function (_BandLinesPlotter2) {
    _inherits(DrawBandLinesPlotter, _BandLinesPlotter2);

    function DrawBandLinesPlotter(name, toolObject) {
        _classCallCheck(this, DrawBandLinesPlotter);

        var _this38 = _possibleConstructorReturn(this, (DrawBandLinesPlotter.__proto__ || Object.getPrototypeOf(DrawBandLinesPlotter)).call(this, name, toolObject));

        _this38.toolObject = toolObject;
        _this38.fiboSequence = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
        return _this38;
    }

    return DrawBandLinesPlotter;
}(BandLinesPlotter);

var DrawFibFansPlotter = exports.DrawFibFansPlotter = function (_CToolPlotter12) {
    _inherits(DrawFibFansPlotter, _CToolPlotter12);

    function DrawFibFansPlotter(name, toolObject) {
        _classCallCheck(this, DrawFibFansPlotter);

        var _this39 = _possibleConstructorReturn(this, (DrawFibFansPlotter.__proto__ || Object.getPrototypeOf(DrawFibFansPlotter)).call(this, name));

        _this39.toolObject = toolObject;
        _this39.fiboFansSequence = [0, 38.2, 50, 61.8];
        _this39.ctrlPtsNum = 2;
        _this39.ctrlPts = [new Array(_this39.ctrlPtsNum), new Array(2)];
        _this39.getCtrlPts();
        return _this39;
    }

    _createClass(DrawFibFansPlotter, [{
        key: 'drawLinesAndInfo',
        value: function drawLinesAndInfo(context, startPoint, endPoint) {
            this.drawFibRayLines(context, startPoint, endPoint);
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            this.updateCtrlPtPos();
            this.getAreaPos();
            this.startPoint = this.ctrlPts[1][0];
            this.endPoint = this.ctrlPts[1][1];
            if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                this.endPoint.x += 1;
            }
            this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
        }
    }]);

    return DrawFibFansPlotter;
}(CToolPlotter);

var CDynamicLinePlotter = exports.CDynamicLinePlotter = function (_NamedObject10) {
    _inherits(CDynamicLinePlotter, _NamedObject10);

    function CDynamicLinePlotter(name) {
        _classCallCheck(this, CDynamicLinePlotter);

        var _this40 = _possibleConstructorReturn(this, (CDynamicLinePlotter.__proto__ || Object.getPrototypeOf(CDynamicLinePlotter)).call(this, name));

        _this40.flag = true;
        _this40.context = _chart_manager.ChartManager.instance._overlayContext;
        return _this40;
    }

    _createClass(CDynamicLinePlotter, [{
        key: 'getAreaPos',
        value: function getAreaPos() {
            var pMgr = _chart_manager.ChartManager.instance;
            var pArea = pMgr.getArea('frame0.k0.main');
            if (pArea === null) {
                this.areaPos = {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                };
                return;
            }
            this.areaPos = {
                left: Math.floor(pArea.getLeft()),
                top: Math.floor(pArea.getTop()),
                right: Math.floor(pArea.getRight()),
                bottom: Math.floor(pArea.getBottom())
            };
        }
    }, {
        key: 'Draw',
        value: function Draw(context) {
            this.getAreaPos();
            var pMgr = _chart_manager.ChartManager.instance;
            var pTDP = pMgr.getDataSource(this.getDataSourceName());
            if (pTDP === null || !_util.Util.isInstance(pTDP, data_sources.MainDataSource)) return;
            this.context.save();
            this.context.rect(this.areaPos.left, this.areaPos.top, this.areaPos.right - this.areaPos.left, this.areaPos.bottom - this.areaPos.top);
            this.context.clip();
            var count = pTDP.getToolObjectCount();
            for (var i = 0; i < count; i++) {
                var toolObject = pTDP.getToolObject(i);
                var state = toolObject.getState();
                switch (state) {
                    case ctools.CToolObject.state.BeforeDraw:
                        toolObject.getPlotter().theme = _chart_manager.ChartManager.instance.getTheme(this.getFrameName());
                        toolObject.getPlotter().drawCursor(this.context);
                        break;
                    case ctools.CToolObject.state.Draw:
                        toolObject.getPlotter().theme = _chart_manager.ChartManager.instance.getTheme(this.getFrameName());
                        toolObject.getPlotter().updateDraw(this.context);
                        break;
                    case ctools.CToolObject.state.AfterDraw:
                        toolObject.getPlotter().theme = _chart_manager.ChartManager.instance.getTheme(this.getFrameName());
                        toolObject.getPlotter().finishDraw(this.context);
                        break;
                    default:
                        break;
                }
            }
            var sel = pTDP.getSelectToolObjcet();
            if (sel !== null && sel !== ctools.CToolObject.state.Draw) sel.getPlotter().highlight(this.context);
            this.context.restore();
        }
    }]);

    return CDynamicLinePlotter;
}(_named_object.NamedObject);
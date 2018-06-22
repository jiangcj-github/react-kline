'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DockableLayout = exports.TableLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _areas = require('./areas');

var areas = _interopRequireWildcard(_areas);

var _chart_manager = require('./chart_manager');

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

var _chart_settings = require('./chart_settings');

var _kline = require('./kline');

var _kline2 = _interopRequireDefault(_kline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableLayout = exports.TableLayout = function (_areas$ChartAreaGroup) {
    _inherits(TableLayout, _areas$ChartAreaGroup);

    function TableLayout(name) {
        _classCallCheck(this, TableLayout);

        var _this = _possibleConstructorReturn(this, (TableLayout.__proto__ || Object.getPrototypeOf(TableLayout)).call(this, name));

        _this._nextRowId = 0;
        _this._focusedRowIndex = -1;
        return _this;
    }

    _createClass(TableLayout, [{
        key: 'getNextRowId',
        value: function getNextRowId() {
            return this._nextRowId++;
        }
    }, {
        key: 'measure',
        value: function measure(context, width, height) {
            this.setMeasuredDimension(width, height);
            var rowH = void 0,
                prevH = 0,
                totalH = 0;
            var h = void 0,
                rows = void 0;
            var rh = [];
            var i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i += 2) {
                rowH = this._areas[i].getHeight();
                if (rowH === 0) {
                    if (i === 0) {
                        rows = cnt + 1 >> 1;
                        var n = rows * 2 + 5;
                        var nh = height / n * 2 << 0;
                        h = height;
                        for (i = rows - 1; i > 0; i--) {
                            rh.unshift(nh);
                            h -= nh;
                        }
                        rh.unshift(h);
                        break;
                    } else if (i === 2) {
                        rowH = prevH / 3;
                    } else {
                        rowH = prevH;
                    }
                }
                totalH += rowH;
                prevH = rowH;
                rh.push(rowH);
            }
            if (totalH > 0) {
                var rate = height / totalH;
                rows = cnt + 1 >> 1;
                h = height;
                for (i = rows - 1; i > 0; i--) {
                    rh[i] *= rate;
                    h -= rh[i];
                }
                rh[0] = h;
            }
            var nw = 8;
            // chart depths sidebar (深度图侧边栏宽度)
            var tmp = _chart_settings.ChartSettings.get();
            var minRW = tmp.charts.depthStatus === "open" ? _kline2.default.instance.depthWidth : 50;
            var maxRW = Math.min(240, width >> 1);
            var rw = minRW;
            var mgr = _chart_manager.ChartManager.instance;
            var timeline = mgr.getTimeline(this.getDataSourceName());
            if (timeline.getFirstIndex() >= 0) {
                var firstIndexes = [];
                for (rw = minRW; rw < maxRW; rw += nw) {
                    firstIndexes.push(timeline.calcFirstIndex(timeline.calcColumnCount(width - rw)));
                }
                var lastIndex = timeline.getLastIndex();
                var dpNames = [".main", ".secondary"];
                var minmaxes = new Array(firstIndexes.length);
                var iArea = void 0,
                    iIndex = void 0;
                for (iArea = 0, iIndex = 0, rw = minRW; iArea < this._areas.length && iIndex < firstIndexes.length; iArea += 2) {
                    var area = this._areas[iArea];
                    var plotter = mgr.getPlotter(area.getName() + "Range.main");
                    for (var iDp in dpNames) {
                        var dp = mgr.getDataProvider(area.getName() + dpNames[iDp]);
                        if (dp === undefined) {
                            continue;
                        }
                        dp.calcRange(firstIndexes, lastIndex, minmaxes, null);
                        while (iIndex < firstIndexes.length) {
                            var minW = plotter.getRequiredWidth(context, minmaxes[iIndex].min);
                            var maxW = plotter.getRequiredWidth(context, minmaxes[iIndex].max);
                            if (Math.max(minW, maxW) < rw) {
                                break;
                            }
                            iIndex++;
                            rw += nw;
                        }
                    }
                }
            }
            for (i = 1; i < this._areas.length; i += 2) {
                this._areas[i].measure(context, rw, rh[i >> 1]);
            }
            var lw = width - rw;
            for (i = 0; i < this._areas.length; i += 2) {
                this._areas[i].measure(context, lw, rh[i >> 1]);
            }
        }
    }, {
        key: 'layout',
        value: function layout(left, top, right, bottom, forceChange) {
            _get(TableLayout.prototype.__proto__ || Object.getPrototypeOf(TableLayout.prototype), 'layout', this).call(this, left, top, right, bottom, forceChange);
            if (this._areas.length < 1) return;
            var area = void 0;
            var center = left + this._areas[0].getMeasuredWidth();
            var t = top,
                b = void 0;
            if (!forceChange) forceChange = this.isChanged();
            var i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                area = this._areas[i];
                b = t + area.getMeasuredHeight();
                area.layout(left, t, center, b, forceChange);
                i++;
                area = this._areas[i];
                area.layout(center, t, this.getRight(), b, forceChange);
                t = b;
            }
            this.setChanged(false);
        }
    }, {
        key: 'drawGrid',
        value: function drawGrid(context) {
            if (this._areas.length < 1) {
                return;
            }
            var mgr = _chart_manager.ChartManager.instance;
            var theme = mgr.getTheme(this.getFrameName());
            context.fillStyle = theme.getColor(themes.Theme.Color.Grid1);
            context.fillRect(this._areas[0].getRight(), this.getTop(), 1, this.getHeight());
            var i = void 0,
                cnt = this._areas.length - 2;
            for (i = 0; i < cnt; i += 2) {
                context.fillRect(this.getLeft(), this._areas[i].getBottom(), this.getWidth(), 1);
            }if (!mgr.getCaptureMouseWheelDirectly()) {
                for (i = 0, cnt += 2; i < cnt; i += 2) {
                    if (this._areas[i].isSelected()) {
                        context.strokeStyle = theme.getColor(themes.Theme.Color.Indicator1);
                        context.strokeRect(this.getLeft() + 0.5, this.getTop() + 0.5, this.getWidth() - 1, this.getHeight() - 1);
                        break;
                    }
                }
            }
        }
    }, {
        key: 'highlight',
        value: function highlight(area) {
            this._highlightedArea = null;
            var e = void 0,
                i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                e = this._areas[i];
                if (e === area) {
                    i &= ~1;
                    e = this._areas[i];
                    e.highlight(e);
                    this._highlightedArea = e;
                    i++;
                    e = this._areas[i];
                    e.highlight(null);
                    e.highlight(e);
                } else {
                    e.highlight(null);
                }
            }
            return this._highlightedArea !== null ? this : null;
        }
    }, {
        key: 'select',
        value: function select(area) {
            this._selectedArea = null;
            var e = void 0,
                i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                e = this._areas[i];
                if (e === area) {
                    i &= ~1;
                    e = this._areas[i];
                    e.select(e);
                    this._selectedArea = e;
                    i++;
                    e = this._areas[i];
                    e.select(e);
                } else {
                    e.select(null);
                }
            }
            return this._selectedArea !== null ? this : null;
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            if (this._focusedRowIndex >= 0) {
                var upper = this._areas[this._focusedRowIndex];
                var lower = this._areas[this._focusedRowIndex + 2];
                var d = y - this._oldY;
                if (d === 0) return this;
                var upperBottom = this._oldUpperBottom + d;
                var lowerTop = this._oldLowerTop + d;
                if (upperBottom - upper.getTop() >= 60 && lower.getBottom() - lowerTop >= 60) {
                    upper.setBottom(upperBottom);
                    lower.setTop(lowerTop);
                }
                return this;
            }
            var i = void 0,
                cnt = this._areas.length - 2;
            for (i = 0; i < cnt; i += 2) {
                var b = this._areas[i].getBottom();
                if (y >= b - 4 && y < b + 4) {
                    _chart_manager.ChartManager.instance.showCursor('n-resize');
                    return this;
                }
            }
            return null;
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(x, y) {
            this._focusedRowIndex = -1;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(x, y) {
            var i = void 0,
                cnt = this._areas.length - 2;
            for (i = 0; i < cnt; i += 2) {
                var b = this._areas[i].getBottom();
                if (y >= b - 4 && y < b + 4) {
                    this._focusedRowIndex = i;
                    this._oldY = y;
                    this._oldUpperBottom = b;
                    this._oldLowerTop = this._areas[i + 2].getTop();
                    return this;
                }
            }
            return null;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(x, y) {
            if (this._focusedRowIndex >= 0) {
                this._focusedRowIndex = -1;
                var i = void 0,
                    cnt = this._areas.length;
                var height = [];
                for (i = 0; i < cnt; i += 2) {
                    height.push(this._areas[i].getHeight());
                }
                _chart_settings.ChartSettings.get().charts.areaHeight = height;
                _chart_settings.ChartSettings.save();
            }
            return this;
        }
    }]);

    return TableLayout;
}(areas.ChartAreaGroup);

var DockableLayout = exports.DockableLayout = function (_areas$ChartAreaGroup2) {
    _inherits(DockableLayout, _areas$ChartAreaGroup2);

    function DockableLayout(name) {
        _classCallCheck(this, DockableLayout);

        return _possibleConstructorReturn(this, (DockableLayout.__proto__ || Object.getPrototypeOf(DockableLayout)).call(this, name));
    }

    _createClass(DockableLayout, [{
        key: 'measure',
        value: function measure(context, width, height) {
            _get(DockableLayout.prototype.__proto__ || Object.getPrototypeOf(DockableLayout.prototype), 'measure', this).call(this, context, width, height);
            width = this.getMeasuredWidth();
            height = this.getMeasuredHeight();
            for (var i in this._areas) {
                var area = this._areas[i];
                area.measure(context, width, height);
                switch (area.getDockStyle()) {
                    case areas.ChartArea.DockStyle.left:
                    case areas.ChartArea.DockStyle.Right:
                        width -= area.getMeasuredWidth();
                        break;
                    case areas.ChartArea.DockStyle.Top:
                    case areas.ChartArea.DockStyle.Bottom:
                        height -= area.getMeasuredHeight();
                        break;
                    case areas.ChartArea.DockStyle.Fill:
                        width = 0;
                        height = 0;
                        break;
                }
            }
        }
    }, {
        key: 'layout',
        value: function layout(left, top, right, bottom, forceChange) {
            _get(DockableLayout.prototype.__proto__ || Object.getPrototypeOf(DockableLayout.prototype), 'layout', this).call(this, left, top, right, bottom, forceChange);
            left = this.getLeft();
            top = this.getTop();
            right = this.getRight();
            bottom = this.getBottom();
            var w = void 0,
                h = void 0;
            if (!forceChange) {
                forceChange = this.isChanged();
            }
            for (var i in this._areas) {
                var area = this._areas[i];
                switch (area.getDockStyle()) {
                    case areas.ChartArea.DockStyle.left:
                        w = area.getMeasuredWidth();
                        area.layout(left, top, left + w, bottom, forceChange);
                        left += w;
                        break;
                    case areas.ChartArea.DockStyle.Top:
                        h = area.getMeasuredHeight();
                        area.layout(left, top, right, top + h, forceChange);
                        top += h;
                        break;
                    case areas.ChartArea.DockStyle.Right:
                        w = area.getMeasuredWidth();
                        area.layout(right - w, top, right, bottom, forceChange);
                        right -= w;
                        break;
                    case areas.ChartArea.DockStyle.Bottom:
                        h = area.getMeasuredHeight();
                        area.layout(left, bottom - h, right, bottom, forceChange);
                        bottom -= h;
                        break;
                    case areas.ChartArea.DockStyle.Fill:
                        area.layout(left, top, right, bottom, forceChange);
                        left = right;
                        top = bottom;
                        break;
                }
            }
            this.setChanged(false);
        }
    }, {
        key: 'drawGrid',
        value: function drawGrid(context) {
            var mgr = _chart_manager.ChartManager.instance;
            var theme = mgr.getTheme(this.getFrameName());
            var left = this.getLeft();
            var top = this.getTop();
            var right = this.getRight();
            var bottom = this.getBottom();
            context.fillStyle = theme.getColor(this._gridColor);
            for (var i in this._areas) {
                var area = this._areas[i];
                switch (area.getDockStyle()) {
                    case areas.ChartArea.DockStyle.Left:
                        context.fillRect(area.getRight(), top, 1, bottom - top);
                        left += area.getWidth();
                        break;
                    case areas.ChartArea.DockStyle.Top:
                        context.fillRect(left, area.getBottom(), right - left, 1);
                        top += area.getHeight();
                        break;
                    case areas.ChartArea.DockStyle.Right:
                        context.fillRect(area.getLeft(), top, 1, bottom - top);
                        right -= area.getWidth();
                        break;
                    case areas.ChartArea.DockStyle.Bottom:
                        context.fillRect(left, area.getTop(), right - left, 1);
                        bottom -= area.getHeight();
                        break;
                }
            }
        }
    }]);

    return DockableLayout;
}(areas.ChartAreaGroup);
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChartAreaGroup = exports.TimelineArea = exports.IndicatorRangeArea = exports.MainRangeArea = exports.IndicatorArea = exports.MainArea = exports.ChartArea = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _named_object = require('./named_object');

var _chart_manager = require('./chart_manager');

var _mevent = require('./mevent');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartArea = exports.ChartArea = function (_NamedObject) {
    _inherits(ChartArea, _NamedObject);

    function ChartArea(name) {
        _classCallCheck(this, ChartArea);

        var _this = _possibleConstructorReturn(this, (ChartArea.__proto__ || Object.getPrototypeOf(ChartArea)).call(this, name));

        _this._left = 0;
        _this._top = 0;
        _this._right = 0;
        _this._bottom = 0;
        _this._changed = false;
        _this._highlighted = false;
        _this._pressed = false;
        _this._selected = false;
        _this.Measuring = new _mevent.MEvent();
        return _this;
    }

    _createClass(ChartArea, [{
        key: 'getDockStyle',
        value: function getDockStyle() {
            return this._dockStyle;
        }
    }, {
        key: 'setDockStyle',
        value: function setDockStyle(dockStyle) {
            this._dockStyle = dockStyle;
        }
    }, {
        key: 'getLeft',
        value: function getLeft() {
            return this._left;
        }
    }, {
        key: 'getTop',
        value: function getTop() {
            return this._top;
        }
    }, {
        key: 'setTop',
        value: function setTop(v) {
            if (this._top !== v) {
                this._top = v;
                this._changed = true;
            }
        }
    }, {
        key: 'getRight',
        value: function getRight() {
            return this._right;
        }
    }, {
        key: 'getBottom',
        value: function getBottom() {
            return this._bottom;
        }
    }, {
        key: 'setBottom',
        value: function setBottom(v) {
            if (this._bottom !== v) {
                this._bottom = v;
                this._changed = true;
            }
        }
    }, {
        key: 'getCenter',
        value: function getCenter() {
            return this._left + this._right >> 1;
        }
    }, {
        key: 'getMiddle',
        value: function getMiddle() {
            return this._top + this._bottom >> 1;
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this._right - this._left;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._bottom - this._top;
        }
    }, {
        key: 'getRect',
        value: function getRect() {
            return {
                X: this._left,
                Y: this._top,
                Width: this._right - this._left,
                Height: this._bottom - this._top
            };
        }
    }, {
        key: 'contains',
        value: function contains(x, y) {
            if (x >= this._left && x < this._right) if (y >= this._top && y < this._bottom) return [this];
            return null;
        }
    }, {
        key: 'getMeasuredWidth',
        value: function getMeasuredWidth() {
            return this._measuredWidth;
        }
    }, {
        key: 'getMeasuredHeight',
        value: function getMeasuredHeight() {
            return this._measuredHeight;
        }
    }, {
        key: 'setMeasuredDimension',
        value: function setMeasuredDimension(width, height) {
            this._measuredWidth = width;
            this._measuredHeight = height;
        }
    }, {
        key: 'measure',
        value: function measure(context, width, height) {
            this._measuredWidth = 0;
            this._measuredHeight = 0;
            this.Measuring.raise(this, { Width: width, Height: height });
            if (this._measuredWidth === 0 && this._measuredHeight === 0) this.setMeasuredDimension(width, height);
        }
    }, {
        key: 'layout',
        value: function layout(left, top, right, bottom, forceChange) {
            left <<= 0;
            if (this._left !== left) {
                this._left = left;
                this._changed = true;
            }
            top <<= 0;
            if (this._top !== top) {
                this._top = top;
                this._changed = true;
            }
            right <<= 0;
            if (this._right !== right) {
                this._right = right;
                this._changed = true;
            }
            bottom <<= 0;
            if (this._bottom !== bottom) {
                this._bottom = bottom;
                this._changed = true;
            }
            if (forceChange) this._changed = true;
        }
    }, {
        key: 'isChanged',
        value: function isChanged() {
            return this._changed;
        }
    }, {
        key: 'setChanged',
        value: function setChanged(v) {
            this._changed = v;
        }
    }, {
        key: 'isHighlighted',
        value: function isHighlighted() {
            return this._highlighted;
        }
    }, {
        key: 'getHighlightedArea',
        value: function getHighlightedArea() {
            return this._highlighted ? this : null;
        }
    }, {
        key: 'highlight',
        value: function highlight(area) {
            this._highlighted = this === area;
            return this._highlighted ? this : null;
        }
    }, {
        key: 'isPressed',
        value: function isPressed() {
            return this._pressed;
        }
    }, {
        key: 'setPressed',
        value: function setPressed(v) {
            this._pressed = v;
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            return this._selected;
        }
    }, {
        key: 'getSelectedArea',
        value: function getSelectedArea() {
            return this._selected ? this : null;
        }
    }, {
        key: 'select',
        value: function select(area) {
            this._selected = this === area;
            return this._selected ? this : null;
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            return null;
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(x, y) {}
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(x, y) {
            return null;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(x, y) {
            return null;
        }
    }]);

    return ChartArea;
}(_named_object.NamedObject);

ChartArea.DockStyle = {
    Left: 0,
    Top: 1,
    Right: 2,
    Bottom: 3,
    Fill: 4
};

var MainArea = exports.MainArea = function (_ChartArea) {
    _inherits(MainArea, _ChartArea);

    function MainArea(name) {
        _classCallCheck(this, MainArea);

        var _this2 = _possibleConstructorReturn(this, (MainArea.__proto__ || Object.getPrototypeOf(MainArea)).call(this, name));

        _this2._dragStarted = false;
        _this2._oldX = 0;
        _this2._oldY = 0;
        _this2._passMoveEventToToolManager = true;
        return _this2;
    }

    _createClass(MainArea, [{
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            var mgr = _chart_manager.ChartManager.instance;
            if (mgr._capturingMouseArea === this) if (this._dragStarted === false) if (Math.abs(this._oldX - x) > 1 || Math.abs(this._oldY - y) > 1) this._dragStarted = true;
            if (this._dragStarted) {
                mgr.hideCursor();
                if (mgr.onToolMouseDrag(this.getFrameName(), x, y)) return this;
                mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
                return this;
            }
            if (this._passMoveEventToToolManager && mgr.onToolMouseMove(this.getFrameName(), x, y)) {
                mgr.hideCursor();
                return this;
            }
            switch (mgr._drawingTool) {
                case _chart_manager.ChartManager.DrawingTool.Cursor:
                    mgr.showCursor();
                    break;
                case _chart_manager.ChartManager.DrawingTool.CrossCursor:
                    if (mgr.showCrossCursor(this, x, y)) mgr.hideCursor();else mgr.showCursor();
                    break;
                default:
                    mgr.hideCursor();
                    break;
            }
            return this;
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(x, y) {
            this._dragStarted = false;
            this._passMoveEventToToolManager = true;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(x, y) {
            var mgr = _chart_manager.ChartManager.instance;
            mgr.getTimeline(this.getDataSourceName()).startMove();
            this._oldX = x;
            this._oldY = y;
            this._dragStarted = false;
            if (mgr.onToolMouseDown(this.getFrameName(), x, y)) this._passMoveEventToToolManager = false;
            return this;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(x, y) {
            var mgr = _chart_manager.ChartManager.instance;
            var ret = null;
            if (this._dragStarted) {
                this._dragStarted = false;
                ret = this;
            }
            if (mgr.onToolMouseUp(this.getFrameName(), x, y)) ret = this;
            this._passMoveEventToToolManager = true;
            return ret;
        }
    }]);

    return MainArea;
}(ChartArea);

var IndicatorArea = exports.IndicatorArea = function (_ChartArea2) {
    _inherits(IndicatorArea, _ChartArea2);

    function IndicatorArea(name) {
        _classCallCheck(this, IndicatorArea);

        var _this3 = _possibleConstructorReturn(this, (IndicatorArea.__proto__ || Object.getPrototypeOf(IndicatorArea)).call(this, name));

        _this3._dragStarted = false;
        _this3._oldX = 0;
        _this3._oldY = 0;
        return _this3;
    }

    _createClass(IndicatorArea, [{
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            var mgr = _chart_manager.ChartManager.instance;
            if (mgr._capturingMouseArea === this) {
                if (this._dragStarted === false) {
                    if (this._oldX !== x || this._oldY !== y) {
                        this._dragStarted = true;
                    }
                }
            }
            if (this._dragStarted) {
                mgr.hideCursor();
                mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
                return this;
            }
            switch (mgr._drawingTool) {
                case _chart_manager.ChartManager.DrawingTool.CrossCursor:
                    if (mgr.showCrossCursor(this, x, y)) mgr.hideCursor();else mgr.showCursor();
                    break;
                default:
                    mgr.showCursor();
                    break;
            }
            return this;
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(x, y) {
            this._dragStarted = false;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(x, y) {
            var mgr = _chart_manager.ChartManager.instance;
            mgr.getTimeline(this.getDataSourceName()).startMove();
            this._oldX = x;
            this._oldY = y;
            this._dragStarted = false;
            return this;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(x, y) {
            if (this._dragStarted) {
                this._dragStarted = false;
                return this;
            }
            return null;
        }
    }]);

    return IndicatorArea;
}(ChartArea);

var MainRangeArea = exports.MainRangeArea = function (_ChartArea3) {
    _inherits(MainRangeArea, _ChartArea3);

    function MainRangeArea(name) {
        _classCallCheck(this, MainRangeArea);

        return _possibleConstructorReturn(this, (MainRangeArea.__proto__ || Object.getPrototypeOf(MainRangeArea)).call(this, name));
    }

    _createClass(MainRangeArea, [{
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            _chart_manager.ChartManager.instance.showCursor();
            return this;
        }
    }]);

    return MainRangeArea;
}(ChartArea);

var IndicatorRangeArea = exports.IndicatorRangeArea = function (_ChartArea4) {
    _inherits(IndicatorRangeArea, _ChartArea4);

    function IndicatorRangeArea(name) {
        _classCallCheck(this, IndicatorRangeArea);

        return _possibleConstructorReturn(this, (IndicatorRangeArea.__proto__ || Object.getPrototypeOf(IndicatorRangeArea)).call(this, name));
    }

    _createClass(IndicatorRangeArea, [{
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            _chart_manager.ChartManager.instance.showCursor();
            return this;
        }
    }]);

    return IndicatorRangeArea;
}(ChartArea);

var TimelineArea = exports.TimelineArea = function (_ChartArea5) {
    _inherits(TimelineArea, _ChartArea5);

    function TimelineArea(name) {
        _classCallCheck(this, TimelineArea);

        return _possibleConstructorReturn(this, (TimelineArea.__proto__ || Object.getPrototypeOf(TimelineArea)).call(this, name));
    }

    _createClass(TimelineArea, [{
        key: 'onMouseMove',
        value: function onMouseMove(x, y) {
            _chart_manager.ChartManager.instance.showCursor();
            return this;
        }
    }]);

    return TimelineArea;
}(ChartArea);

var ChartAreaGroup = exports.ChartAreaGroup = function (_ChartArea6) {
    _inherits(ChartAreaGroup, _ChartArea6);

    function ChartAreaGroup(name) {
        _classCallCheck(this, ChartAreaGroup);

        var _this7 = _possibleConstructorReturn(this, (ChartAreaGroup.__proto__ || Object.getPrototypeOf(ChartAreaGroup)).call(this, name));

        _this7._areas = [];
        _this7._highlightedArea = null;
        _this7._selectedArea = null;
        return _this7;
    }

    _createClass(ChartAreaGroup, [{
        key: 'contains',
        value: function contains(x, y) {
            var areas = void 0;
            var a = void 0,
                i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                a = this._areas[i];
                areas = a.contains(x, y);
                if (areas !== null) {
                    areas.push(this);
                    return areas;
                }
            }
            return _get(ChartAreaGroup.prototype.__proto__ || Object.getPrototypeOf(ChartAreaGroup.prototype), 'contains', this).call(this, x, y);
        }
    }, {
        key: 'getAreaCount',
        value: function getAreaCount() {
            return this._areas.length;
        }
    }, {
        key: 'getAreaAt',
        value: function getAreaAt(index) {
            if (index < 0 || index >= this._areas.length) {
                return null;
            }
            return this._areas[index];
        }
    }, {
        key: 'addArea',
        value: function addArea(area) {
            this._areas.push(area);
        }
    }, {
        key: 'removeArea',
        value: function removeArea(area) {
            var i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                if (area === this._areas[i]) {
                    this._areas.splice(i);
                    this.setChanged(true);
                    break;
                }
            }
        }
    }, {
        key: 'getGridColor',
        value: function getGridColor() {
            return this._gridColor;
        }
    }, {
        key: 'setGridColor',
        value: function setGridColor(c) {
            this._gridColor = c;
        }
    }, {
        key: 'getHighlightedArea',
        value: function getHighlightedArea() {
            if (this._highlightedArea !== null) {
                return this._highlightedArea.getHighlightedArea();
            }
            return null;
        }
    }, {
        key: 'highlight',
        value: function highlight(area) {
            this._highlightedArea = null;
            var e = void 0,
                i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                e = this._areas[i].highlight(area);
                if (e !== null) {
                    this._highlightedArea = e;
                    return this;
                }
            }
            return null;
        }
    }, {
        key: 'getSelectedArea',
        value: function getSelectedArea() {
            if (this._selectedArea !== null) {
                return this._selectedArea.getSelectedArea();
            }
            return null;
        }
    }, {
        key: 'select',
        value: function select(area) {
            this._selectedArea = null;
            var e = void 0,
                i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                e = this._areas[i].select(area);
                if (e !== null) {
                    this._selectedArea = e;
                    return this;
                }
            }
            return null;
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(x, y) {
            var i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                this._areas[i].onMouseLeave(x, y);
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(x, y) {
            var a = void 0,
                i = void 0,
                cnt = this._areas.length;
            for (i = 0; i < cnt; i++) {
                a = this._areas[i].onMouseUp(x, y);
                if (a !== null) return a;
            }
            return null;
        }
    }]);

    return ChartAreaGroup;
}(ChartArea);
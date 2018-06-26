'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timeline = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _named_object = require('./named_object');

var _chart_manager = require('./chart_manager');

var _data_sources = require('./data_sources');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = exports.Timeline = function (_NamedObject) {
    _inherits(Timeline, _NamedObject);

    function Timeline(name) {
        _classCallCheck(this, Timeline);

        var _this = _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, name));

        _this._updated = false;
        _this._innerLeft = 0;
        _this._innerWidth = 0;
        _this._firstColumnLeft = 0;
        _this._scale = 3;
        _this._lastScale = -1;
        _this._maxItemCount = 0;
        _this._maxIndex = 0;
        _this._firstIndex = -1;
        _this._selectedIndex = -1;
        _this._savedFirstIndex = -1;
        return _this;
    }

    _createClass(Timeline, [{
        key: 'isLatestShown',
        value: function isLatestShown() {
            return this.getLastIndex() === this._maxIndex;
        }
    }, {
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
        key: 'getItemWidth',
        value: function getItemWidth() {
            return Timeline.itemWidth[this._scale];
        }
    }, {
        key: 'getSpaceWidth',
        value: function getSpaceWidth() {
            return Timeline.spaceWidth[this._scale];
        }
    }, {
        key: 'getColumnWidth',
        value: function getColumnWidth() {
            return this.getSpaceWidth() + this.getItemWidth();
        }
    }, {
        key: 'getInnerWidth',
        value: function getInnerWidth() {
            return this._innerWidth;
        }
    }, {
        key: 'getItemLeftOffset',
        value: function getItemLeftOffset() {
            return this.getSpaceWidth();
        }
    }, {
        key: 'getItemCenterOffset',
        value: function getItemCenterOffset() {
            return this.getSpaceWidth() + (this.getItemWidth() >> 1);
        }
    }, {
        key: 'getFirstColumnLeft',
        value: function getFirstColumnLeft() {
            return this._firstColumnLeft;
        }
    }, {
        key: 'getMaxItemCount',
        value: function getMaxItemCount() {
            return this._maxItemCount;
        }
    }, {
        key: 'getFirstIndex',
        value: function getFirstIndex() {
            return this._firstIndex;
        }
    }, {
        key: 'getLastIndex',
        value: function getLastIndex() {
            return Math.min(this._firstIndex + this._maxItemCount, this._maxIndex);
        }
    }, {
        key: 'getSelectedIndex',
        value: function getSelectedIndex() {
            return this._selectedIndex;
        }
    }, {
        key: 'getMaxIndex',
        value: function getMaxIndex() {
            return this._maxIndex;
        }
    }, {
        key: 'calcColumnCount',
        value: function calcColumnCount(w) {
            return Math.floor(w / this.getColumnWidth()) << 0;
        }
    }, {
        key: 'calcFirstColumnLeft',
        value: function calcFirstColumnLeft(maxItemCount) {
            return this._innerLeft + this._innerWidth - this.getColumnWidth() * maxItemCount;
        }
    }, {
        key: 'calcFirstIndexAlignRight',
        value: function calcFirstIndexAlignRight(oldFirstIndex, oldMaxItemCount, newMaxItemCount) {
            return Math.max(0, oldFirstIndex + Math.max(oldMaxItemCount, 1) - Math.max(newMaxItemCount, 1));
        }
    }, {
        key: 'calcFirstIndex',
        value: function calcFirstIndex(newMaxItemCount) {
            return this.validateFirstIndex(this.calcFirstIndexAlignRight(this._firstIndex, this._maxItemCount, newMaxItemCount), newMaxItemCount);
        }
    }, {
        key: 'updateMaxItemCount',
        value: function updateMaxItemCount() {
            var newMaxItemCount = this.calcColumnCount(this._innerWidth);
            var newFirstIndex = void 0;
            if (this._maxItemCount < 1) {
                newFirstIndex = this.calcFirstIndex(newMaxItemCount);
            } else if (this._lastScale === this._scale) {
                newFirstIndex = this.validateFirstIndex(this._firstIndex - (newMaxItemCount - this._maxItemCount));
            } else {
                var focusedIndex = this._selectedIndex >= 0 ? this._selectedIndex : this.getLastIndex() - 1;
                newFirstIndex = this.validateFirstIndex(focusedIndex - Math.round((focusedIndex - this._firstIndex) * newMaxItemCount / this._maxItemCount));
            }
            this._lastScale = this._scale;
            if (this._firstIndex !== newFirstIndex) {
                if (this._selectedIndex === this._firstIndex) this._selectedIndex = newFirstIndex;
                this._firstIndex = newFirstIndex;
                this._updated = true;
            }
            if (this._maxItemCount !== newMaxItemCount) {
                this._maxItemCount = newMaxItemCount;
                this._updated = true;
            }
            this._firstColumnLeft = this.calcFirstColumnLeft(newMaxItemCount);
        }
    }, {
        key: 'validateFirstIndex',
        value: function validateFirstIndex(firstIndex, maxItemCount) {
            if (this._maxIndex < 1) {
                return -1;
            }
            if (firstIndex < 0) {
                return 0;
            }
            var lastFirst = Math.max(0, this._maxIndex - 1 /*maxItemCount*/);
            if (firstIndex > lastFirst) {
                return lastFirst;
            }
            return firstIndex;
        }
    }, {
        key: 'validateSelectedIndex',
        value: function validateSelectedIndex() {
            if (this._selectedIndex < this._firstIndex) this._selectedIndex = -1;else if (this._selectedIndex >= this.getLastIndex()) this._selectedIndex = -1;
        }
    }, {
        key: 'onLayout',
        value: function onLayout() {
            var mgr = _chart_manager.ChartManager.instance;
            var area = mgr.getArea(this.getDataSourceName() + ".main");
            if (area !== null) {
                this._innerLeft = area.getLeft() + Timeline.PADDING_LEFT;
                var w = Math.max(0, area.getWidth() - (Timeline.PADDING_LEFT + Timeline.PADDING_RIGHT));
                if (this._innerWidth !== w) {
                    this._innerWidth = w;
                    this.updateMaxItemCount();
                }
            }
        }
    }, {
        key: 'toIndex',
        value: function toIndex(x) {
            return this._firstIndex + this.calcColumnCount(x - this._firstColumnLeft);
        }
    }, {
        key: 'toColumnLeft',
        value: function toColumnLeft(index) {
            return this._firstColumnLeft + this.getColumnWidth() * (index - this._firstIndex);
        }
    }, {
        key: 'toItemLeft',
        value: function toItemLeft(index) {
            return this.toColumnLeft(index) + this.getItemLeftOffset();
        }
    }, {
        key: 'toItemCenter',
        value: function toItemCenter(index) {
            return this.toColumnLeft(index) + this.getItemCenterOffset();
        }
    }, {
        key: 'selectAt',
        value: function selectAt(x) {
            this._selectedIndex = this.toIndex(x);
            this.validateSelectedIndex();
            return this._selectedIndex >= 0;
        }
    }, {
        key: 'unselect',
        value: function unselect() {
            this._selectedIndex = -1;
        }
    }, {
        key: 'update',
        value: function update() {
            var mgr = _chart_manager.ChartManager.instance;
            var ds = mgr.getDataSource(this.getDataSourceName());
            var oldMaxIndex = this._maxIndex;
            this._maxIndex = ds.getDataCount();
            switch (ds.getUpdateMode()) {
                case _data_sources.DataSource.UpdateMode.Refresh:
                    if (this._maxIndex < 1) this._firstIndex = -1;else this._firstIndex = Math.max(this._maxIndex - this._maxItemCount, 0);
                    this._selectedIndex = -1;
                    this._updated = true;
                    break;
                case _data_sources.DataSource.UpdateMode.Append:
                    var lastIndex = this.getLastIndex();
                    var erasedCount = ds.getErasedCount();
                    if (lastIndex < oldMaxIndex) {
                        if (erasedCount > 0) {
                            this._firstIndex = Math.max(this._firstIndex - erasedCount, 0);
                            if (this._selectedIndex >= 0) {
                                this._selectedIndex -= erasedCount;
                                this.validateSelectedIndex();
                            }
                            this._updated = true;
                        }
                    } else if (lastIndex === oldMaxIndex) {
                        this._firstIndex += this._maxIndex - oldMaxIndex;
                        if (this._selectedIndex >= 0) {
                            this._selectedIndex -= erasedCount;
                            this.validateSelectedIndex();
                        }
                        this._updated = true;
                    }
                    break;
            }
        }
    }, {
        key: 'move',
        value: function move(x) {
            if (this.isLatestShown()) {
                _chart_manager.ChartManager.instance.getArea(this.getDataSourceName() + ".mainRange").setChanged(true);
            }
            this._firstIndex = this.validateFirstIndex(this._savedFirstIndex - this.calcColumnCount(x), this._maxItemCount);
            this._updated = true;
            if (this._selectedIndex >= 0) this.validateSelectedIndex();
        }
    }, {
        key: 'startMove',
        value: function startMove() {
            this._savedFirstIndex = this._firstIndex;
        }
    }, {
        key: 'scale',
        value: function scale(s) {
            this._scale += s;
            if (this._scale < 0) {
                this._scale = 0;
            } else if (this._scale >= Timeline.itemWidth.length) {
                this._scale = Timeline.itemWidth.length - 1;
            }
            this.updateMaxItemCount();
            if (this._selectedIndex >= 0) {
                this.validateSelectedIndex();
            }
        }
    }]);

    return Timeline;
}(_named_object.NamedObject);

Timeline.itemWidth = [1, 3, 3, 5, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
Timeline.spaceWidth = [1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 7, 7, 7];
Timeline.PADDING_LEFT = 4;
Timeline.PADDING_RIGHT = 8;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainDataSource = exports.DataSource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _named_object = require('./named_object');

var _ctool_manager = require('./ctool_manager');

var _kline = require('./kline');

var _kline2 = _interopRequireDefault(_kline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSource = exports.DataSource = function (_NamedObject) {
    _inherits(DataSource, _NamedObject);

    function DataSource(name) {
        _classCallCheck(this, DataSource);

        return _possibleConstructorReturn(this, (DataSource.__proto__ || Object.getPrototypeOf(DataSource)).call(this, name));
    }

    _createClass(DataSource, [{
        key: 'getUpdateMode',
        value: function getUpdateMode() {
            return this._updateMode;
        }
    }, {
        key: 'setUpdateMode',
        value: function setUpdateMode(mode) {
            this._updateMode = mode;
        }
    }, {
        key: 'getCacheSize',
        value: function getCacheSize() {
            return 0;
        }
    }, {
        key: 'getDataCount',
        value: function getDataCount() {
            return 0;
        }
    }, {
        key: 'getDataAt',
        value: function getDataAt(index) {
            return this._dataItems[index];
        }
    }]);

    return DataSource;
}(_named_object.NamedObject);

DataSource.UpdateMode = {
    DoNothing: 0,
    Refresh: 1,
    Update: 2,
    Append: 3
};

var MainDataSource = exports.MainDataSource = function (_DataSource) {
    _inherits(MainDataSource, _DataSource);

    function MainDataSource(name) {
        _classCallCheck(this, MainDataSource);

        var _this2 = _possibleConstructorReturn(this, (MainDataSource.__proto__ || Object.getPrototypeOf(MainDataSource)).call(this, name));

        _this2._erasedCount = 0;
        _this2._dataItems = [];
        _this2._decimalDigits = 0;
        _this2.toolManager = new _ctool_manager.CToolManager(name);
        return _this2;
    }

    _createClass(MainDataSource, [{
        key: 'getCacheSize',
        value: function getCacheSize() {
            return this._dataItems.length;
        }
    }, {
        key: 'getDataCount',
        value: function getDataCount() {
            return this._dataItems.length;
        }
    }, {
        key: 'getUpdatedCount',
        value: function getUpdatedCount() {
            return this._updatedCount;
        }
    }, {
        key: 'getAppendedCount',
        value: function getAppendedCount() {
            return this._appendedCount;
        }
    }, {
        key: 'getErasedCount',
        value: function getErasedCount() {
            return this._erasedCount;
        }
    }, {
        key: 'getDecimalDigits',
        value: function getDecimalDigits() {
            return this._decimalDigits;
        }
    }, {
        key: 'calcDecimalDigits',
        value: function calcDecimalDigits(v) {
            var str = "" + v;
            var i = str.indexOf('.');
            if (i < 0) {
                return 0;
            }
            return str.length - 1 - i;
        }
    }, {
        key: 'getLastDate',
        value: function getLastDate() {
            var count = this.getDataCount();
            if (count < 1) {
                return -1;
            }
            return this.getDataAt(count - 1).date;
        }
    }, {
        key: 'getDataAt',
        value: function getDataAt(index) {
            return this._dataItems[index];
        }
    }, {
        key: 'update',
        value: function update(data) {
            this._updatedCount = 0;
            this._appendedCount = 0;
            this._erasedCount = 0;
            var len = this._dataItems.length;
            if (len > 0) {
                var lastIndex = len - 1;
                var lastItem = this._dataItems[lastIndex];
                var _e = void 0,
                    _i = void 0,
                    _cnt = data.length;
                for (_i = 0; _i < _cnt; _i++) {
                    _e = data[_i];
                    if (_e[0] === lastItem.date) {
                        if (lastItem.open === _e[1] && lastItem.high === _e[2] && lastItem.low === _e[3] && lastItem.close === _e[4] && lastItem.volume === _e[5]) {
                            this.setUpdateMode(DataSource.UpdateMode.DoNothing);
                        } else {
                            this.setUpdateMode(DataSource.UpdateMode.Update);
                            this._dataItems[lastIndex] = {
                                date: _e[0],
                                open: _e[1],
                                high: _e[2],
                                low: _e[3],
                                close: _e[4],
                                volume: _e[5]
                            };
                            this._updatedCount++;
                        }
                        _i++;
                        if (_i < _cnt) {
                            this.setUpdateMode(DataSource.UpdateMode.Append);
                            for (; _i < _cnt; _i++, this._appendedCount++) {
                                _e = data[_i];
                                this._dataItems.push({
                                    date: _e[0],
                                    open: _e[1],
                                    high: _e[2],
                                    low: _e[3],
                                    close: _e[4],
                                    volume: _e[5]
                                });
                            }
                        }
                        return true;
                    }
                }
                if (_cnt < _kline2.default.instance.limit) {
                    this.setUpdateMode(DataSource.UpdateMode.DoNothing);
                    return false;
                }
            }
            this.setUpdateMode(DataSource.UpdateMode.Refresh);
            this._dataItems = [];
            var d = void 0,
                n = void 0,
                e = void 0,
                i = void 0,
                cnt = data.length;
            for (i = 0; i < cnt; i++) {
                e = data[i];
                for (n = 1; n <= 4; n++) {
                    d = this.calcDecimalDigits(e[n]);
                    if (this._decimalDigits < d) this._decimalDigits = d;
                }
                this._dataItems.push({
                    date: e[0],
                    open: e[1],
                    high: e[2],
                    low: e[3],
                    close: e[4],
                    volume: e[5]
                });
            }
            return true;
        }
    }, {
        key: 'select',
        value: function select(id) {
            this.toolManager.selecedObject = id;
        }
    }, {
        key: 'unselect',
        value: function unselect() {
            this.toolManager.selecedObject = -1;
        }
    }, {
        key: 'addToolObject',
        value: function addToolObject(toolObject) {
            this.toolManager.addToolObject(toolObject);
        }
    }, {
        key: 'delToolObject',
        value: function delToolObject() {
            this.toolManager.delCurrentObject();
        }
    }, {
        key: 'getToolObject',
        value: function getToolObject(index) {
            return this.toolManager.getToolObject(index);
        }
    }, {
        key: 'getToolObjectCount',
        value: function getToolObjectCount() {
            return this.toolManager.toolObjects.length;
        }
    }, {
        key: 'getCurrentToolObject',
        value: function getCurrentToolObject() {
            return this.toolManager.getCurrentObject();
        }
    }, {
        key: 'getSelectToolObjcet',
        value: function getSelectToolObjcet() {
            return this.toolManager.getSelectedObject();
        }
    }, {
        key: 'delSelectToolObject',
        value: function delSelectToolObject() {
            this.toolManager.delSelectedObject();
        }
    }]);

    return MainDataSource;
}(DataSource);
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CToolManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _named_object = require('./named_object');

var _cpoint = require('./cpoint');

var _ctools = require('./ctools');

var ctools = _interopRequireWildcard(_ctools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CToolManager = exports.CToolManager = function (_NamedObject) {
    _inherits(CToolManager, _NamedObject);

    function CToolManager(name) {
        _classCallCheck(this, CToolManager);

        var _this = _possibleConstructorReturn(this, (CToolManager.__proto__ || Object.getPrototypeOf(CToolManager)).call(this, name));

        _this.selectedObject = -1;
        _this.toolObjects = [];
        return _this;
    }

    _createClass(CToolManager, [{
        key: 'getToolObjectCount',
        value: function getToolObjectCount() {
            return this.toolObjects.length;
        }
    }, {
        key: 'addToolObject',
        value: function addToolObject(o) {
            this.toolObjects.push(o);
        }
    }, {
        key: 'getToolObject',
        value: function getToolObject(i) {
            if (i < this.toolObjects.length && i >= 0) {
                return this.toolObjects[i];
            }
            return null;
        }
    }, {
        key: 'getCurrentObject',
        value: function getCurrentObject() {
            return this.getToolObject(this.getToolObjectCount() - 1);
        }
    }, {
        key: 'getSelectedObject',
        value: function getSelectedObject() {
            return this.getToolObject(this.selectedObject);
        }
    }, {
        key: 'delCurrentObject',
        value: function delCurrentObject() {
            this.toolObjects.splice(this.getToolObjectCount() - 1, 1);
        }
    }, {
        key: 'delSelectedObject',
        value: function delSelectedObject() {
            this.toolObjects.splice(this.selectedObject, 1);
            this.selectedObject = -1;
        }
    }, {
        key: 'acceptMouseMoveEvent',
        value: function acceptMouseMoveEvent(x, y) {
            if (this.selectedObject === -1) {
                var curr = this.toolObjects[this.getToolObjectCount() - 1];
                if (curr !== null && curr !== undefined && curr.getState() !== ctools.CToolObject.state.AfterDraw) return curr.acceptMouseMoveEvent(x, y);
            } else {
                var sel = this.toolObjects[this.selectedObject];
                if (sel.getState() === ctools.CToolObject.state.Draw) {
                    return sel.acceptMouseMoveEvent(x, y);
                }
                sel.unselect();
                this.selectedObject = -1;
            }
            for (var index in this.toolObjects) {
                if (this.toolObjects[index].isSelected(x, y)) {
                    this.selectedObject = index;
                    return false;
                }
            }
            return false;
        }
    }, {
        key: 'acceptMouseDownEvent',
        value: function acceptMouseDownEvent(x, y) {
            this.mouseDownMove = false;
            if (this.selectedObject === -1) {
                var curr = this.toolObjects[this.getToolObjectCount() - 1];
                if (curr !== null && curr !== undefined && curr.getState() !== ctools.CToolObject.state.AfterDraw) return curr.acceptMouseDownEvent(x, y);
            } else {
                var sel = this.toolObjects[this.selectedObject];
                if (sel.getState() !== ctools.CToolObject.state.BeforeDraw) return sel.acceptMouseDownEvent(x, y);
            }
            return false;
        }
    }, {
        key: 'acceptMouseDownMoveEvent',
        value: function acceptMouseDownMoveEvent(x, y) {
            this.mouseDownMove = true;
            if (this.selectedObject === -1) {
                var curr = this.toolObjects[this.getToolObjectCount() - 1];
                if (curr !== null && curr !== undefined && curr.getState() === ctools.CToolObject.state.Draw) return curr.acceptMouseDownMoveEvent(x, y);
                return false;
            } else {
                var sel = this.toolObjects[this.selectedObject];
                if (sel.getState() !== ctools.CToolObject.state.BeforeDraw) {
                    if (sel.acceptMouseDownMoveEvent(x, y) === true) {
                        var point = this.toolObjects[this.selectedObject].points;
                        for (var i = 0; i < point.length; i++) {
                            if (point[i].state === _cpoint.CPoint.state.Highlight || point[i].state === _cpoint.CPoint.state.Show) {
                                return true;
                            }
                        }
                    }
                    return true;
                }
            }
        }
    }, {
        key: 'acceptMouseUpEvent',
        value: function acceptMouseUpEvent(x, y) {
            if (this.mouseDownMove === true) {
                if (this.selectedObject === -1) {
                    var _curr = this.toolObjects[this.getToolObjectCount() - 1];
                    if (_curr !== null && _curr !== undefined && _curr.getState() === ctools.CToolObject.state.Draw) return _curr.acceptMouseUpEvent(x, y);
                    return true;
                } else {
                    var sel = this.toolObjects[this.selectedObject];
                    if (sel.getState() !== ctools.CToolObject.state.BeforeDraw) return sel.acceptMouseUpEvent(x, y);
                }
            }
            if (this.selectedObject !== -1) {
                return true;
            }
            var curr = this.toolObjects[this.getToolObjectCount() - 1];
            if (curr !== null && curr !== undefined) {
                if (curr.getState() === ctools.CToolObject.state.Draw) return true;
                if (!curr.isValidMouseXY(x, y)) {
                    return false;
                }
                if (curr.isSelected(x, y)) {
                    return true;
                }
            }
            return false;
        }
    }]);

    return CToolManager;
}(_named_object.NamedObject);
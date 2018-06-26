'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CArrowLineObject = exports.CPriceLineObject = exports.CVertiStraightLineObject = exports.CTriParallelLineObject = exports.CStraightLineObject = exports.CSegLineObject = exports.CRayLineObject = exports.CHoriStraightLineObject = exports.CHoriSegLineObject = exports.CHoriRayLineObject = exports.CFibRetraceObject = exports.CFibFansObject = exports.CBiParallelRayLineObject = exports.CBiParallelLineObject = exports.CBandLineObject = exports.CTriToolObject = exports.CBiToolObject = exports.CToolObject = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chart_manager = require('./chart_manager');

var _named_object = require('./named_object');

var _cpoint = require('./cpoint');

var _util = require('./util');

var _data_sources = require('./data_sources');

var data_sources = _interopRequireWildcard(_data_sources);

var _plotters = require('./plotters');

var plotters = _interopRequireWildcard(_plotters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CToolObject = exports.CToolObject = function (_NamedObject) {
    _inherits(CToolObject, _NamedObject);

    function CToolObject(name) {
        _classCallCheck(this, CToolObject);

        var _this = _possibleConstructorReturn(this, (CToolObject.__proto__ || Object.getPrototypeOf(CToolObject)).call(this, name));

        _this.drawer = null;
        _this.state = CToolObject.state.BeforeDraw;
        _this.points = [];
        _this.step = 0;
        return _this;
    }

    _createClass(CToolObject, [{
        key: 'getChartObjects',
        value: function getChartObjects() {
            var ppMgr = _chart_manager.ChartManager.instance;
            var ppCDS = ppMgr.getDataSource("frame0.k0");
            if (ppCDS === null || !_util.Util.isInstance(ppCDS, data_sources.MainDataSource)) return null;
            var ppTimeline = ppMgr.getTimeline("frame0.k0");
            if (ppTimeline === null) return null;
            var ppArea = ppMgr.getArea('frame0.k0.main');
            if (ppArea === null) return null;
            var ppRange = ppMgr.getRange("frame0.k0.main");
            if (ppRange === null) return null;
            return { pMgr: ppMgr, pCDS: ppCDS, pTimeline: ppTimeline, pArea: ppArea, pRange: ppRange };
        }
    }, {
        key: 'isValidMouseXY',
        value: function isValidMouseXY(x, y) {
            var pObj = this.getChartObjects();
            var areaPos = {
                left: pObj.pArea.getLeft(),
                top: pObj.pArea.getTop(),
                right: pObj.pArea.getRight(),
                bottom: pObj.pArea.getBottom()
            };
            return !(x < areaPos.left || x > areaPos.right || y < areaPos.top || y > areaPos.bottom);
        }
    }, {
        key: 'getPlotter',
        value: function getPlotter() {
            return this.drawer;
        }
    }, {
        key: 'setState',
        value: function setState(s) {
            this.state = s;
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }, {
        key: 'addPoint',
        value: function addPoint(point) {
            this.points.push(point);
        }
    }, {
        key: 'getPoint',
        value: function getPoint(i) {
            return this.points[i];
        }
    }, {
        key: 'acceptMouseMoveEvent',
        value: function acceptMouseMoveEvent(x, y) {
            if (this.isValidMouseXY(x, y) === false) {
                return false;
            }
            if (this.state === CToolObject.state.BeforeDraw) {
                this.setBeforeDrawPos(x, y);
            } else if (this.state === CToolObject.state.Draw) {
                this.setDrawPos(x, y);
            } else if (this.state === CToolObject.state.AfterDraw) {
                this.setAfterDrawPos(x, y);
            }
            return true;
        }
    }, {
        key: 'acceptMouseDownEvent',
        value: function acceptMouseDownEvent(x, y) {
            if (this.isValidMouseXY(x, y) === false) {
                return false;
            }
            if (this.state === CToolObject.state.BeforeDraw) {
                this.setDrawPos(x, y);
                this.setState(CToolObject.state.Draw);
            } else if (this.state === CToolObject.state.Draw) {
                this.setAfterDrawPos(x, y);
                if (this.step === 0) this.setState(CToolObject.state.AfterDraw);
            } else if (this.state === CToolObject.state.AfterDraw) {
                if (CToolObject.prototype.isSelected(x, y)) {
                    this.setDrawPos(x, y);
                    this.setState(CToolObject.state.Draw);
                } else {
                    this.oldx = x;
                    this.oldy = y;
                }
            }
            return true;
        }
    }, {
        key: 'acceptMouseDownMoveEvent',
        value: function acceptMouseDownMoveEvent(x, y) {
            if (this.isValidMouseXY(x, y) === false) {
                return false;
            }
            if (this.state === CToolObject.state.Draw) {
                this.setDrawPos(x, y);
            } else if (this.state === CToolObject.state.AfterDraw) {
                var pObj = this.getChartObjects();
                var _width = pObj.pTimeline.getItemWidth();
                var _height = pObj.pRange;
                if (Math.abs(x - this.oldx) < _width && Math.abs(y - this.oldy) === 0) return true;
                var _old_x = pObj.pTimeline.toIndex(this.oldx);
                var _old_y = pObj.pRange.toValue(this.oldy);
                var _new_x = pObj.pTimeline.toIndex(x);
                var _new_y = pObj.pRange.toValue(y);
                this.oldx = x;
                this.oldy = y;
                var _dif_x = _new_x - _old_x;
                var _dif_y = _new_y - _old_y;
                for (var index in this.points) {
                    this.points[index].pos.index += _dif_x;
                    this.points[index].pos.value += _dif_y;
                }
            }
            return true;
        }
    }, {
        key: 'acceptMouseUpEvent',
        value: function acceptMouseUpEvent(x, y) {
            if (this.isValidMouseXY(x, y) === false) {
                return false;
            }
            if (this.state === CToolObject.state.Draw) {
                this.setAfterDrawPos(x, y);
                if (this.step === 0) this.setState(CToolObject.state.AfterDraw);
                return true;
            }
            return false;
        }
    }, {
        key: 'setBeforeDrawPos',
        value: function setBeforeDrawPos(x, y) {
            for (var index in this.points) {
                this.points[index].setPosXY(x, y);
                this.points[index].setState(_cpoint.CPoint.state.Show);
            }
        }
    }, {
        key: 'setDrawPos',
        value: function setDrawPos(x, y) {
            for (var index in this.points) {
                if (this.points[index].getState() === _cpoint.CPoint.state.Highlight) {
                    this.points[index].setPosXY(x, y);
                }
            }
        }
    }, {
        key: 'setAfterDrawPos',
        value: function setAfterDrawPos(x, y) {
            if (this.step !== 0) {
                this.step -= 1;
            }
            for (var index in this.points) {
                this.points[index].setState(_cpoint.CPoint.state.Hide);
            }
            if (this.step === 0) {
                var pObj = this.getChartObjects();
                pObj.pMgr.setNormalMode();
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            var isFind = false;
            for (var index in this.points) {
                if (this.points[index].isSelected(x, y)) {
                    this.points[index].setState(_cpoint.CPoint.state.Highlight);
                    isFind = true;
                    break;
                }
            }
            if (isFind === true) {
                this.select();
                return true;
            }
            return false;
        }
    }, {
        key: 'select',
        value: function select() {
            for (var index in this.points) {
                if (this.points[index].getState() === _cpoint.CPoint.state.Hide) {
                    this.points[index].setState(_cpoint.CPoint.state.Show);
                }
            }
        }
    }, {
        key: 'unselect',
        value: function unselect() {
            for (var index in this.points) {
                if (this.points[index].getState() !== _cpoint.CPoint.state.Hide) {
                    this.points[index].setState(_cpoint.CPoint.state.Hide);
                }
            }
        }
    }, {
        key: 'calcDistance',
        value: function calcDistance(point1, point2, point3) {
            var xa = point1.getPosXY().x;
            var ya = point1.getPosXY().y;
            var xb = point2.getPosXY().x;
            var yb = point2.getPosXY().y;
            var xc = point3.getPosXY().x;
            var yc = point3.getPosXY().y;
            var a1 = xa - xc;
            var a2 = ya - yc;
            var b1 = xb - xc;
            var b2 = yb - yc;
            var area = Math.abs(a1 * b2 - a2 * b1);
            var len = Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
            return area / len;
        }
    }, {
        key: 'calcGap',
        value: function calcGap(r, x, y) {
            var xa = r.sx;
            var ya = r.sy;
            var xb = r.ex;
            var yb = r.ey;
            var xc = x;
            var yc = y;
            var a1 = xa - xc;
            var a2 = ya - yc;
            var b1 = xb - xc;
            var b2 = yb - yc;
            var area = Math.abs(a1 * b2 - a2 * b1);
            var len = Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
            return area / len;
        }
    }, {
        key: 'isWithRect',
        value: function isWithRect(point1, point2, point3) {
            var sx = point1.getPosXY().x;
            var sy = point1.getPosXY().y;
            var ex = point2.getPosXY().x;
            var ey = point2.getPosXY().y;
            var x = point3.getPosXY().x;
            var y = point3.getPosXY().y;
            if (sx > ex) {
                sx += 4;
                ex -= 4;
            } else {
                sx -= 4;
                ex += 4;
            }
            if (sy > ey) {
                sy += 4;
                ey -= 4;
            } else {
                sy -= 4;
                ey += 4;
            }
            if (sx <= x && ex >= x && sy <= y && ey >= y) {
                return true;
            }
            if (sx >= x && ex <= x && sy <= y && ey >= y) {
                return true;
            }
            if (sx <= x && ex >= x && sy >= y && ey <= y) {
                return true;
            }
            if (sx >= x && ex <= x && sy >= y && ey <= y) {
                return true;
            }
            return false;
        }
    }]);

    return CToolObject;
}(_named_object.NamedObject);

CToolObject.state = {
    BeforeDraw: 0,
    Draw: 1,
    AfterDraw: 2
};

var CBiToolObject = exports.CBiToolObject = function (_CToolObject) {
    _inherits(CBiToolObject, _CToolObject);

    function CBiToolObject(name) {
        _classCallCheck(this, CBiToolObject);

        var _this2 = _possibleConstructorReturn(this, (CBiToolObject.__proto__ || Object.getPrototypeOf(CBiToolObject)).call(this, name));

        _this2.addPoint(new _cpoint.CPoint(name));
        _this2.addPoint(new _cpoint.CPoint(name));
        return _this2;
    }

    _createClass(CBiToolObject, [{
        key: 'setBeforeDrawPos',
        value: function setBeforeDrawPos(x, y) {
            this.step = 1;
            _get(CBiToolObject.prototype.__proto__ || Object.getPrototypeOf(CBiToolObject.prototype), 'setBeforeDrawPos', this).call(this, x, y);
            this.getPoint(0).setState(_cpoint.CPoint.state.Show);
            this.getPoint(1).setState(_cpoint.CPoint.state.Highlight);
        }
    }]);

    return CBiToolObject;
}(CToolObject);

var CTriToolObject = exports.CTriToolObject = function (_CToolObject2) {
    _inherits(CTriToolObject, _CToolObject2);

    function CTriToolObject(name) {
        _classCallCheck(this, CTriToolObject);

        var _this3 = _possibleConstructorReturn(this, (CTriToolObject.__proto__ || Object.getPrototypeOf(CTriToolObject)).call(this, name));

        _this3.addPoint(new _cpoint.CPoint(name));
        _this3.addPoint(new _cpoint.CPoint(name));
        _this3.addPoint(new _cpoint.CPoint(name));
        return _this3;
    }

    _createClass(CTriToolObject, [{
        key: 'setBeforeDrawPos',
        value: function setBeforeDrawPos(x, y) {
            this.step = 2;
            _get(CTriToolObject.prototype.__proto__ || Object.getPrototypeOf(CTriToolObject.prototype), 'setBeforeDrawPos', this).call(this, x, y);
            this.getPoint(0).setState(_cpoint.CPoint.state.Show);
            this.getPoint(1).setState(_cpoint.CPoint.state.Show);
            this.getPoint(2).setState(_cpoint.CPoint.state.Highlight);
        }
    }, {
        key: 'setAfterDrawPos',
        value: function setAfterDrawPos(x, y) {
            if (this.step !== 0) this.step -= 1;
            if (this.step === 0) {
                for (var index in this.points) {
                    this.points[index].setState(_cpoint.CPoint.state.Hide);
                }
            } else {
                this.getPoint(0).setState(_cpoint.CPoint.state.Show);
                this.getPoint(1).setState(_cpoint.CPoint.state.Highlight);
                this.getPoint(2).setState(_cpoint.CPoint.state.Show);
            }
            if (this.step === 0) {
                var pObj = this.getChartObjects();
                pObj.pMgr.setNormalMode();
            }
        }
    }]);

    return CTriToolObject;
}(CToolObject);

var CBandLineObject = exports.CBandLineObject = function (_CBiToolObject) {
    _inherits(CBandLineObject, _CBiToolObject);

    function CBandLineObject(name) {
        _classCallCheck(this, CBandLineObject);

        var _this4 = _possibleConstructorReturn(this, (CBandLineObject.__proto__ || Object.getPrototypeOf(CBandLineObject)).call(this, name));

        _this4.drawer = new plotters.DrawBandLinesPlotter(name, _this4);
        return _this4;
    }

    _createClass(CBandLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CBandLineObject.prototype.__proto__ || Object.getPrototypeOf(CBandLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sx = this.getPoint(0).getPosXY().x;
            var sy = this.getPoint(0).getPosXY().y;
            var ex = this.getPoint(1).getPosXY().x;
            var ey = this.getPoint(1).getPosXY().y;
            var fibSequence = [100.0, 87.5, 75.0, 62.5, 50.0, 37.5, 25.0, 12.5, 0.0];
            for (var i = 0; i < fibSequence.length; i++) {
                var stage_y = sy + (100 - fibSequence[i]) / 100 * (ey - sy);
                if (stage_y < y + 4 && stage_y > y - 4) {
                    this.select();
                    return true;
                }
            }
            return false;
        }
    }]);

    return CBandLineObject;
}(CBiToolObject);

var CBiParallelLineObject = exports.CBiParallelLineObject = function (_CTriToolObject) {
    _inherits(CBiParallelLineObject, _CTriToolObject);

    function CBiParallelLineObject(name) {
        _classCallCheck(this, CBiParallelLineObject);

        var _this5 = _possibleConstructorReturn(this, (CBiParallelLineObject.__proto__ || Object.getPrototypeOf(CBiParallelLineObject)).call(this, name));

        _this5.drawer = new plotters.DrawBiParallelLinesPlotter(name, _this5);
        return _this5;
    }

    _createClass(CBiParallelLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CBiParallelLineObject.prototype.__proto__ || Object.getPrototypeOf(CBiParallelLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var _0x = this.getPoint(0).getPosXY().x;
            var _0y = this.getPoint(0).getPosXY().y;
            var _1x = this.getPoint(1).getPosXY().x;
            var _1y = this.getPoint(1).getPosXY().y;
            var _2x = this.getPoint(2).getPosXY().x;
            var _2y = this.getPoint(2).getPosXY().y;
            var _a = { x: _0x - _1x, y: _0y - _1y };
            var _b = { x: _0x - _2x, y: _0y - _2y };
            var _c = { x: _a.x + _b.x, y: _a.y + _b.y };
            var _3x = _0x - _c.x;
            var _3y = _0y - _c.y;
            var r1 = { sx: _0x, sy: _0y, ex: _2x, ey: _2y };
            var r2 = { sx: _1x, sy: _1y, ex: _3x, ey: _3y };
            if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
                return false;
            }
            return true;
        }
    }]);

    return CBiParallelLineObject;
}(CTriToolObject);

var CBiParallelRayLineObject = exports.CBiParallelRayLineObject = function (_CTriToolObject2) {
    _inherits(CBiParallelRayLineObject, _CTriToolObject2);

    function CBiParallelRayLineObject(name) {
        _classCallCheck(this, CBiParallelRayLineObject);

        var _this6 = _possibleConstructorReturn(this, (CBiParallelRayLineObject.__proto__ || Object.getPrototypeOf(CBiParallelRayLineObject)).call(this, name));

        _this6.drawer = new plotters.DrawBiParallelRayLinesPlotter(name, _this6);
        return _this6;
    }

    _createClass(CBiParallelRayLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CBiParallelRayLineObject.prototype.__proto__ || Object.getPrototypeOf(CBiParallelRayLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var _0x = this.getPoint(0).getPosXY().x;
            var _0y = this.getPoint(0).getPosXY().y;
            var _1x = this.getPoint(1).getPosXY().x;
            var _1y = this.getPoint(1).getPosXY().y;
            var _2x = this.getPoint(2).getPosXY().x;
            var _2y = this.getPoint(2).getPosXY().y;
            var _a = { x: _0x - _1x, y: _0y - _1y };
            var _b = { x: _0x - _2x, y: _0y - _2y };
            var _c = { x: _a.x + _b.x, y: _a.y + _b.y };
            var _3x = _0x - _c.x;
            var _3y = _0y - _c.y;
            var r1 = { sx: _0x, sy: _0y, ex: _2x, ey: _2y };
            var r2 = { sx: _1x, sy: _1y, ex: _3x, ey: _3y };
            if (r1.ex > r1.sx && x > r1.sx - 4 || r1.ex < r1.sx && x < r1.sx + 4 || r2.ex > r2.sx && x > r2.sx - 4 || r2.ex < r2.sx && x < r2.sx + 4) {
                if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
                    return false;
                }
            } else {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CBiParallelRayLineObject;
}(CTriToolObject);

var CFibFansObject = exports.CFibFansObject = function (_CBiToolObject2) {
    _inherits(CFibFansObject, _CBiToolObject2);

    function CFibFansObject(name) {
        _classCallCheck(this, CFibFansObject);

        var _this7 = _possibleConstructorReturn(this, (CFibFansObject.__proto__ || Object.getPrototypeOf(CFibFansObject)).call(this, name));

        _this7.drawer = new plotters.DrawFibFansPlotter(name, _this7);
        return _this7;
    }

    _createClass(CFibFansObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CFibFansObject.prototype.__proto__ || Object.getPrototypeOf(CFibFansObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sx = this.getPoint(0).getPosXY().x;
            var sy = this.getPoint(0).getPosXY().y;
            var ex = this.getPoint(1).getPosXY().x;
            var ey = this.getPoint(1).getPosXY().y;
            var pObj = this.getChartObjects();
            var areaPos = {
                left: pObj.pArea.getLeft(),
                top: pObj.pArea.getTop(),
                right: pObj.pArea.getRight(),
                bottom: pObj.pArea.getBottom()
            };
            var fibFansSequence = [0, 38.2, 50, 61.8];
            for (var i = 0; i < fibFansSequence.length; i++) {
                var stageY = sy + (100 - fibFansSequence[i]) / 100 * (ey - sy);
                var tempStartPt = { x: sx, y: sy };
                var tempEndPt = { x: ex, y: stageY };
                var crossPt = this.getRectCrossPt(areaPos, tempStartPt, tempEndPt);
                var lenToStartPt = Math.pow(crossPt[0].x - sx, 2) + Math.pow(crossPt[0].y - sy, 2);
                var lenToEndPt = Math.pow(crossPt[0].x - ex, 2) + Math.pow(crossPt[0].y - ey, 2);
                var tempCrossPt = lenToStartPt > lenToEndPt ? { x: crossPt[0].x, y: crossPt[0].y } : {
                    x: crossPt[1].x,
                    y: crossPt[1].y
                };
                if (tempCrossPt.x > sx && x < sx) continue;
                if (tempCrossPt.x < sx && x > sx) continue;
                var a = new _cpoint.CPoint("frame0.k0");
                a.setPosXY(sx, sy);
                var b = new _cpoint.CPoint("frame0.k0");
                b.setPosXY(tempCrossPt.x, tempCrossPt.y);
                if (this.calcDistance(a, b, c) > 4) {
                    continue;
                }
                this.select();
                return true;
            }
            return false;
        }
    }]);

    return CFibFansObject;
}(CBiToolObject);

var CFibRetraceObject = exports.CFibRetraceObject = function (_CBiToolObject3) {
    _inherits(CFibRetraceObject, _CBiToolObject3);

    function CFibRetraceObject(name) {
        _classCallCheck(this, CFibRetraceObject);

        var _this8 = _possibleConstructorReturn(this, (CFibRetraceObject.__proto__ || Object.getPrototypeOf(CFibRetraceObject)).call(this, name));

        _this8.drawer = new plotters.DrawFibRetracePlotter(name, _this8);
        return _this8;
    }

    _createClass(CFibRetraceObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CFibRetraceObject.prototype.__proto__ || Object.getPrototypeOf(CFibRetraceObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sx = this.getPoint(0).getPosXY().x;
            var sy = this.getPoint(0).getPosXY().y;
            var ex = this.getPoint(1).getPosXY().x;
            var ey = this.getPoint(1).getPosXY().y;
            var fibSequence = [100.0, 78.6, 61.8, 50.0, 38.2, 23.6, 0.0];
            for (var i = 0; i < fibSequence.length; i++) {
                var stage_y = sy + (100 - fibSequence[i]) / 100 * (ey - sy);
                if (stage_y < y + 4 && stage_y > y - 4) {
                    this.select();
                    return true;
                }
            }
            return false;
        }
    }]);

    return CFibRetraceObject;
}(CBiToolObject);

var CHoriRayLineObject = exports.CHoriRayLineObject = function (_CBiToolObject4) {
    _inherits(CHoriRayLineObject, _CBiToolObject4);

    function CHoriRayLineObject(name) {
        _classCallCheck(this, CHoriRayLineObject);

        var _this9 = _possibleConstructorReturn(this, (CHoriRayLineObject.__proto__ || Object.getPrototypeOf(CHoriRayLineObject)).call(this, name));

        _this9.drawer = new plotters.DrawHoriRayLinesPlotter(name, _this9);
        return _this9;
    }

    _createClass(CHoriRayLineObject, [{
        key: 'setDrawPos',
        value: function setDrawPos(x, y) {
            if (this.points[0].getState() === _cpoint.CPoint.state.Highlight) {
                this.points[0].setPosXY(x, y);
                this.points[1].setPosXYNoSnap(this.points[1].getPosXY().x, this.points[0].getPosXY().y);
                return;
            }
            if (this.points[1].getState() === _cpoint.CPoint.state.Highlight) {
                this.points[1].setPosXY(x, y);
                this.points[0].setPosXYNoSnap(this.points[0].getPosXY().x, this.points[1].getPosXY().y);
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CHoriRayLineObject.prototype.__proto__ || Object.getPrototypeOf(CHoriRayLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sy = this.getPoint(0).getPosXY().y;
            var sx = this.getPoint(0).getPosXY().x;
            var ex = this.getPoint(1).getPosXY().x;
            if (y > sy + 4 || y < sy - 4) {
                return false;
            }
            if (ex > sx && x < sx - 4) {
                return false;
            }
            if (ex < sx && x > sx + 4) {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CHoriRayLineObject;
}(CBiToolObject);

var CHoriSegLineObject = exports.CHoriSegLineObject = function (_CBiToolObject5) {
    _inherits(CHoriSegLineObject, _CBiToolObject5);

    function CHoriSegLineObject(name) {
        _classCallCheck(this, CHoriSegLineObject);

        var _this10 = _possibleConstructorReturn(this, (CHoriSegLineObject.__proto__ || Object.getPrototypeOf(CHoriSegLineObject)).call(this, name));

        _this10.drawer = new plotters.DrawHoriSegLinesPlotter(name, _this10);
        return _this10;
    }

    _createClass(CHoriSegLineObject, [{
        key: 'setDrawPos',
        value: function setDrawPos(x, y) {
            if (this.points[0].getState() === _cpoint.CPoint.state.Highlight) {
                this.points[0].setPosXY(x, y);
                this.points[1].setPosXYNoSnap(this.points[1].getPosXY().x, this.points[0].getPosXY().y);
                return;
            }
            if (this.points[1].getState() === _cpoint.CPoint.state.Highlight) {
                this.points[1].setPosXY(x, y);
                this.points[0].setPosXYNoSnap(this.points[0].getPosXY().x, this.points[1].getPosXY().y);
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CHoriSegLineObject.prototype.__proto__ || Object.getPrototypeOf(CHoriSegLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sy = this.getPoint(0).getPosXY().y;
            var sx = this.getPoint(0).getPosXY().x;
            var ex = this.getPoint(1).getPosXY().x;
            if (y > sy + 4 || y < sy - 4) {
                return false;
            }
            if (sx > ex && (x > sx + 4 || x < ex - 4)) {
                return false;
            }
            if (sx < ex && (x < sx - 4 || x > ex + 4)) {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CHoriSegLineObject;
}(CBiToolObject);

var CHoriStraightLineObject = exports.CHoriStraightLineObject = function (_CBiToolObject6) {
    _inherits(CHoriStraightLineObject, _CBiToolObject6);

    function CHoriStraightLineObject(name) {
        _classCallCheck(this, CHoriStraightLineObject);

        var _this11 = _possibleConstructorReturn(this, (CHoriStraightLineObject.__proto__ || Object.getPrototypeOf(CHoriStraightLineObject)).call(this, name));

        _this11.drawer = new plotters.DrawHoriStraightLinesPlotter(name, _this11);
        return _this11;
    }

    _createClass(CHoriStraightLineObject, [{
        key: 'setDrawPos',
        value: function setDrawPos(x, y) {
            for (var index in this.points) {
                this.points[index].setPosXY(x, y);
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CHoriStraightLineObject.prototype.__proto__ || Object.getPrototypeOf(CHoriStraightLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sy = this.getPoint(0).getPosXY().y;
            if (y > sy + 4 || y < sy - 4) {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CHoriStraightLineObject;
}(CBiToolObject);

var CRayLineObject = exports.CRayLineObject = function (_CBiToolObject7) {
    _inherits(CRayLineObject, _CBiToolObject7);

    function CRayLineObject(name) {
        _classCallCheck(this, CRayLineObject);

        var _this12 = _possibleConstructorReturn(this, (CRayLineObject.__proto__ || Object.getPrototypeOf(CRayLineObject)).call(this, name));

        _this12.drawer = new plotters.DrawRayLinesPlotter(name, _this12);
        return _this12;
    }

    _createClass(CRayLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CRayLineObject.prototype.__proto__ || Object.getPrototypeOf(CRayLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sx = this.getPoint(0).getPosXY().x;
            var ex = this.getPoint(1).getPosXY().x;
            if (ex > sx && x < sx - 4) {
                return false;
            }
            if (ex < sx && x > sx + 4) {
                return false;
            }
            if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
                this.select();
                return true;
            }
            return false;
        }
    }]);

    return CRayLineObject;
}(CBiToolObject);

var CSegLineObject = exports.CSegLineObject = function (_CBiToolObject8) {
    _inherits(CSegLineObject, _CBiToolObject8);

    function CSegLineObject(name) {
        _classCallCheck(this, CSegLineObject);

        var _this13 = _possibleConstructorReturn(this, (CSegLineObject.__proto__ || Object.getPrototypeOf(CSegLineObject)).call(this, name));

        _this13.drawer = new plotters.DrawSegLinesPlotter(name, _this13);
        return _this13;
    }

    _createClass(CSegLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CSegLineObject.prototype.__proto__ || Object.getPrototypeOf(CSegLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            if (this.isWithRect(this.getPoint(0), this.getPoint(1), c) === false) {
                return false;
            }
            if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
                this.select();
                return true;
            }
            return false;
        }
    }]);

    return CSegLineObject;
}(CBiToolObject);

var CStraightLineObject = exports.CStraightLineObject = function (_CBiToolObject9) {
    _inherits(CStraightLineObject, _CBiToolObject9);

    function CStraightLineObject(name) {
        _classCallCheck(this, CStraightLineObject);

        var _this14 = _possibleConstructorReturn(this, (CStraightLineObject.__proto__ || Object.getPrototypeOf(CStraightLineObject)).call(this, name));

        _this14.drawer = new plotters.DrawStraightLinesPlotter(name, _this14);
        return _this14;
    }

    _createClass(CStraightLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CStraightLineObject.prototype.__proto__ || Object.getPrototypeOf(CStraightLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
                this.select();
                return true;
            }
            return false;
        }
    }]);

    return CStraightLineObject;
}(CBiToolObject);

var CTriParallelLineObject = exports.CTriParallelLineObject = function (_CTriToolObject3) {
    _inherits(CTriParallelLineObject, _CTriToolObject3);

    function CTriParallelLineObject(name) {
        _classCallCheck(this, CTriParallelLineObject);

        var _this15 = _possibleConstructorReturn(this, (CTriParallelLineObject.__proto__ || Object.getPrototypeOf(CTriParallelLineObject)).call(this, name));

        _this15.drawer = new plotters.DrawTriParallelLinesPlotter(name, _this15);
        return _this15;
    }

    _createClass(CTriParallelLineObject, [{
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CTriParallelLineObject.prototype.__proto__ || Object.getPrototypeOf(CTriParallelLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var pObj = this.getChartObjects();
            var _0x = this.getPoint(0).getPosXY().x;
            var _0y = this.getPoint(0).getPosXY().y;
            var _1x = this.getPoint(1).getPosXY().x;
            var _1y = this.getPoint(1).getPosXY().y;
            var _2x = this.getPoint(2).getPosXY().x;
            var _2y = this.getPoint(2).getPosXY().y;
            var _a = { x: _0x - _1x, y: _0y - _1y };
            var _b = { x: _0x - _2x, y: _0y - _2y };
            var _c = { x: _a.x + _b.x, y: _a.y + _b.y };
            var _3x = _0x - _c.x;
            var _3y = _0y - _c.y;
            var r1 = { sx: _0x, sy: _0y, ex: _2x, ey: _2y };
            var r2 = { sx: _1x, sy: _1y, ex: _3x, ey: _3y };
            var _i = { x: _0x - _1x, y: _0y - _1y };
            var _j = { x: _2x - _3x, y: _2y - _3y };
            var _ri = { x: _1x - _0x, y: _1y - _0y };
            var _rj = { x: _3x - _2x, y: _3y - _2y };
            var _4x = Math.abs(_ri.x - _0x);
            var _4y = Math.abs(_ri.y - _0y);
            var _5x = Math.abs(_rj.x - _2x);
            var _5y = Math.abs(_rj.y - _2y);
            var r3 = { sx: _4x, sy: _4y, ex: _5x, ey: _5y };
            if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4 && this.calcGap(r3, x, y) > 4) {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CTriParallelLineObject;
}(CTriToolObject);

var CVertiStraightLineObject = exports.CVertiStraightLineObject = function (_CBiToolObject10) {
    _inherits(CVertiStraightLineObject, _CBiToolObject10);

    function CVertiStraightLineObject(name) {
        _classCallCheck(this, CVertiStraightLineObject);

        var _this16 = _possibleConstructorReturn(this, (CVertiStraightLineObject.__proto__ || Object.getPrototypeOf(CVertiStraightLineObject)).call(this, name));

        _this16.drawer = new plotters.DrawVertiStraightLinesPlotter(name, _this16);
        return _this16;
    }

    _createClass(CVertiStraightLineObject, [{
        key: 'setDrawPos',
        value: function setDrawPos(x, y) {
            for (var index in this.points) {
                this.points[index].setPosXY(x, y);
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CVertiStraightLineObject.prototype.__proto__ || Object.getPrototypeOf(CVertiStraightLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sx = this.getPoint(0).getPosXY().x;
            if (x > sx + 4 || x < sx - 4) {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CVertiStraightLineObject;
}(CBiToolObject);

var CPriceLineObject = exports.CPriceLineObject = function (_CSegLineObject) {
    _inherits(CPriceLineObject, _CSegLineObject);

    function CPriceLineObject(name) {
        _classCallCheck(this, CPriceLineObject);

        var _this17 = _possibleConstructorReturn(this, (CPriceLineObject.__proto__ || Object.getPrototypeOf(CPriceLineObject)).call(this, name));

        _this17.drawer = new plotters.DrawPriceLinesPlotter(name, _this17);
        return _this17;
    }

    _createClass(CPriceLineObject, [{
        key: 'setDrawPos',
        value: function setDrawPos(x, y) {
            for (var index in this.points) {
                this.points[index].setPosXY(x, y);
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(x, y) {
            if (_get(CPriceLineObject.prototype.__proto__ || Object.getPrototypeOf(CPriceLineObject.prototype), 'isSelected', this).call(this, x, y) === true) {
                return true;
            }
            var c = new _cpoint.CPoint("frame0.k0");
            c.setPosXY(x, y);
            var sx = this.getPoint(0).getPosXY().x;
            var sy = this.getPoint(0).getPosXY().y;
            var ex = this.getPoint(1).getPosXY().x;
            var ey = this.getPoint(1).getPosXY().y;
            if (x < sx - 4) {
                return false;
            }
            if (y >= sy + 4 || y <= sy - 4) {
                return false;
            }
            this.select();
            return true;
        }
    }]);

    return CPriceLineObject;
}(CSegLineObject);

var CArrowLineObject = exports.CArrowLineObject = function (_CSegLineObject2) {
    _inherits(CArrowLineObject, _CSegLineObject2);

    function CArrowLineObject(name) {
        _classCallCheck(this, CArrowLineObject);

        var _this18 = _possibleConstructorReturn(this, (CArrowLineObject.__proto__ || Object.getPrototypeOf(CArrowLineObject)).call(this, name));

        _this18.drawer = new plotters.DrawArrowLinesPlotter(name, _this18);
        return _this18;
    }

    return CArrowLineObject;
}(CSegLineObject);
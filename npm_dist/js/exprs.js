"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExprEnv = exports.ExprEnv = function () {
    function ExprEnv() {
        _classCallCheck(this, ExprEnv);
    }

    _createClass(ExprEnv, [{
        key: "getDataSource",
        value: function getDataSource() {
            return this._ds;
        }
    }, {
        key: "setDataSource",
        value: function setDataSource(ds) {
            return this._ds = ds;
        }
    }, {
        key: "getFirstIndex",
        value: function getFirstIndex() {
            return this._firstIndex;
        }
    }, {
        key: "setFirstIndex",
        value: function setFirstIndex(n) {
            return this._firstIndex = n;
        }
    }], [{
        key: "get",
        value: function get() {
            return this.inst;
        }
    }, {
        key: "set",
        value: function set(env) {
            this.inst = env;
        }
    }]);

    return ExprEnv;
}();

ExprEnv.inst = null;
ExprEnv._ds = null;
ExprEnv._firstIndex = null;

var Expr = exports.Expr = function () {
    function Expr() {
        _classCallCheck(this, Expr);

        this._rid = 0;
    }

    _createClass(Expr, [{
        key: "execute",
        value: function execute(index) {}
    }, {
        key: "reserve",
        value: function reserve(rid, count) {}
    }, {
        key: "clear",
        value: function clear() {}
    }]);

    return Expr;
}();

var OpenExpr = exports.OpenExpr = function (_Expr) {
    _inherits(OpenExpr, _Expr);

    function OpenExpr() {
        _classCallCheck(this, OpenExpr);

        return _possibleConstructorReturn(this, (OpenExpr.__proto__ || Object.getPrototypeOf(OpenExpr)).apply(this, arguments));
    }

    _createClass(OpenExpr, [{
        key: "execute",
        value: function execute(index) {
            return ExprEnv.get()._ds.getDataAt(index).open;
        }
    }]);

    return OpenExpr;
}(Expr);

var HighExpr = exports.HighExpr = function (_Expr2) {
    _inherits(HighExpr, _Expr2);

    function HighExpr() {
        _classCallCheck(this, HighExpr);

        return _possibleConstructorReturn(this, (HighExpr.__proto__ || Object.getPrototypeOf(HighExpr)).apply(this, arguments));
    }

    _createClass(HighExpr, [{
        key: "execute",
        value: function execute(index) {
            return ExprEnv.get()._ds.getDataAt(index).high;
        }
    }]);

    return HighExpr;
}(Expr);

var LowExpr = exports.LowExpr = function (_Expr3) {
    _inherits(LowExpr, _Expr3);

    function LowExpr() {
        _classCallCheck(this, LowExpr);

        return _possibleConstructorReturn(this, (LowExpr.__proto__ || Object.getPrototypeOf(LowExpr)).apply(this, arguments));
    }

    _createClass(LowExpr, [{
        key: "execute",
        value: function execute(index) {
            return ExprEnv.get()._ds.getDataAt(index).low;
        }
    }]);

    return LowExpr;
}(Expr);

var CloseExpr = exports.CloseExpr = function (_Expr4) {
    _inherits(CloseExpr, _Expr4);

    function CloseExpr() {
        _classCallCheck(this, CloseExpr);

        return _possibleConstructorReturn(this, (CloseExpr.__proto__ || Object.getPrototypeOf(CloseExpr)).apply(this, arguments));
    }

    _createClass(CloseExpr, [{
        key: "execute",
        value: function execute(index) {
            return ExprEnv.get()._ds.getDataAt(index).close;
        }
    }]);

    return CloseExpr;
}(Expr);

var VolumeExpr = exports.VolumeExpr = function (_Expr5) {
    _inherits(VolumeExpr, _Expr5);

    function VolumeExpr() {
        _classCallCheck(this, VolumeExpr);

        return _possibleConstructorReturn(this, (VolumeExpr.__proto__ || Object.getPrototypeOf(VolumeExpr)).apply(this, arguments));
    }

    _createClass(VolumeExpr, [{
        key: "execute",
        value: function execute(index) {
            return ExprEnv.get()._ds.getDataAt(index).volume;
        }
    }]);

    return VolumeExpr;
}(Expr);

var ConstExpr = exports.ConstExpr = function (_Expr6) {
    _inherits(ConstExpr, _Expr6);

    function ConstExpr(v) {
        _classCallCheck(this, ConstExpr);

        var _this6 = _possibleConstructorReturn(this, (ConstExpr.__proto__ || Object.getPrototypeOf(ConstExpr)).call(this));

        _this6._value = v;
        return _this6;
    }

    _createClass(ConstExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._value;
        }
    }]);

    return ConstExpr;
}(Expr);

var ParameterExpr = exports.ParameterExpr = function (_Expr7) {
    _inherits(ParameterExpr, _Expr7);

    function ParameterExpr(name, minValue, maxValue, defaultValue) {
        _classCallCheck(this, ParameterExpr);

        var _this7 = _possibleConstructorReturn(this, (ParameterExpr.__proto__ || Object.getPrototypeOf(ParameterExpr)).call(this));

        _this7._name = name;
        _this7._minValue = minValue;
        _this7._maxValue = maxValue;
        _this7._value = _this7._defaultValue = defaultValue;
        return _this7;
    }

    _createClass(ParameterExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._value;
        }
    }, {
        key: "getMinValue",
        value: function getMinValue() {
            return this._minValue;
        }
    }, {
        key: "getMaxValue",
        value: function getMaxValue() {
            return this._maxValue;
        }
    }, {
        key: "getDefaultValue",
        value: function getDefaultValue() {
            return this._defaultValue;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this._value;
        }
    }, {
        key: "setValue",
        value: function setValue(v) {
            if (v === 0) this._value = 0;else if (v < this._minValue) this._value = this._minValue;else if (v > this._maxValue) this._value = this._maxValue;else this._value = v;
        }
    }]);

    return ParameterExpr;
}(Expr);

var OpAExpr = exports.OpAExpr = function (_Expr8) {
    _inherits(OpAExpr, _Expr8);

    function OpAExpr(a) {
        _classCallCheck(this, OpAExpr);

        var _this8 = _possibleConstructorReturn(this, (OpAExpr.__proto__ || Object.getPrototypeOf(OpAExpr)).call(this));

        _this8._exprA = a;
        return _this8;
    }

    _createClass(OpAExpr, [{
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                this._rid = rid;
                this._exprA.reserve(rid, count);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this._exprA.clear();
        }
    }]);

    return OpAExpr;
}(Expr);

var OpABExpr = exports.OpABExpr = function (_Expr9) {
    _inherits(OpABExpr, _Expr9);

    function OpABExpr(a, b) {
        _classCallCheck(this, OpABExpr);

        var _this9 = _possibleConstructorReturn(this, (OpABExpr.__proto__ || Object.getPrototypeOf(OpABExpr)).call(this));

        _this9._exprA = a;
        _this9._exprB = b;
        return _this9;
    }

    _createClass(OpABExpr, [{
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                this._rid = rid;
                this._exprA.reserve(rid, count);
                this._exprB.reserve(rid, count);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this._exprA.clear();
            this._exprB.clear();
        }
    }]);

    return OpABExpr;
}(Expr);

var OpABCExpr = exports.OpABCExpr = function (_Expr10) {
    _inherits(OpABCExpr, _Expr10);

    function OpABCExpr(a, b, c) {
        _classCallCheck(this, OpABCExpr);

        var _this10 = _possibleConstructorReturn(this, (OpABCExpr.__proto__ || Object.getPrototypeOf(OpABCExpr)).call(this));

        _this10._exprA = a;
        _this10._exprB = b;
        _this10._exprC = c;
        return _this10;
    }

    _createClass(OpABCExpr, [{
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                this._rid = rid;
                this._exprA.reserve(rid, count);
                this._exprB.reserve(rid, count);
                this._exprC.reserve(rid, count);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this._exprA.clear();
            this._exprB.clear();
            this._exprC.clear();
        }
    }]);

    return OpABCExpr;
}(Expr);

var OpABCDExpr = exports.OpABCDExpr = function (_Expr11) {
    _inherits(OpABCDExpr, _Expr11);

    function OpABCDExpr(a, b, c, d) {
        _classCallCheck(this, OpABCDExpr);

        var _this11 = _possibleConstructorReturn(this, (OpABCDExpr.__proto__ || Object.getPrototypeOf(OpABCDExpr)).call(this));

        _this11._exprA = a;
        _this11._exprB = b;
        _this11._exprC = c;
        _this11._exprD = d;
        return _this11;
    }

    _createClass(OpABCDExpr, [{
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                this._rid = rid;
                this._exprA.reserve(rid, count);
                this._exprB.reserve(rid, count);
                this._exprC.reserve(rid, count);
                this._exprD.reserve(rid, count);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this._exprA.clear();
            this._exprB.clear();
            this._exprC.clear();
            this._exprD.clear();
        }
    }]);

    return OpABCDExpr;
}(Expr);

var NegExpr = exports.NegExpr = function (_OpAExpr) {
    _inherits(NegExpr, _OpAExpr);

    function NegExpr(a) {
        _classCallCheck(this, NegExpr);

        return _possibleConstructorReturn(this, (NegExpr.__proto__ || Object.getPrototypeOf(NegExpr)).call(this, a));
    }

    _createClass(NegExpr, [{
        key: "execute",
        value: function execute(index) {
            return -this._exprA.execute(index);
        }
    }]);

    return NegExpr;
}(OpAExpr);

var AddExpr = exports.AddExpr = function (_OpABExpr) {
    _inherits(AddExpr, _OpABExpr);

    function AddExpr(a, b) {
        _classCallCheck(this, AddExpr);

        return _possibleConstructorReturn(this, (AddExpr.__proto__ || Object.getPrototypeOf(AddExpr)).call(this, a, b));
    }

    _createClass(AddExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) + this._exprB.execute(index);
        }
    }]);

    return AddExpr;
}(OpABExpr);

var SubExpr = exports.SubExpr = function (_OpABExpr2) {
    _inherits(SubExpr, _OpABExpr2);

    function SubExpr(a, b) {
        _classCallCheck(this, SubExpr);

        return _possibleConstructorReturn(this, (SubExpr.__proto__ || Object.getPrototypeOf(SubExpr)).call(this, a, b));
    }

    _createClass(SubExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) - this._exprB.execute(index);
        }
    }]);

    return SubExpr;
}(OpABExpr);

var MulExpr = exports.MulExpr = function (_OpABExpr3) {
    _inherits(MulExpr, _OpABExpr3);

    function MulExpr(a, b) {
        _classCallCheck(this, MulExpr);

        return _possibleConstructorReturn(this, (MulExpr.__proto__ || Object.getPrototypeOf(MulExpr)).call(this, a, b));
    }

    _createClass(MulExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) * this._exprB.execute(index);
        }
    }]);

    return MulExpr;
}(OpABExpr);

var DivExpr = exports.DivExpr = function (_OpABExpr4) {
    _inherits(DivExpr, _OpABExpr4);

    function DivExpr(a, b) {
        _classCallCheck(this, DivExpr);

        return _possibleConstructorReturn(this, (DivExpr.__proto__ || Object.getPrototypeOf(DivExpr)).call(this, a, b));
    }

    _createClass(DivExpr, [{
        key: "execute",
        value: function execute(index) {
            var a = this._exprA.execute(index);
            var b = this._exprB.execute(index);
            if (a === 0) return a;
            if (b === 0) return a > 0 ? 1000000 : -1000000;
            return a / b;
        }
    }]);

    return DivExpr;
}(OpABExpr);

var GtExpr = exports.GtExpr = function (_OpABExpr5) {
    _inherits(GtExpr, _OpABExpr5);

    function GtExpr(a, b) {
        _classCallCheck(this, GtExpr);

        return _possibleConstructorReturn(this, (GtExpr.__proto__ || Object.getPrototypeOf(GtExpr)).call(this, a, b));
    }

    _createClass(GtExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) > this._exprB.execute(index) ? 1 : 0;
        }
    }]);

    return GtExpr;
}(OpABExpr);

var GeExpr = exports.GeExpr = function (_OpABExpr6) {
    _inherits(GeExpr, _OpABExpr6);

    function GeExpr(a, b) {
        _classCallCheck(this, GeExpr);

        return _possibleConstructorReturn(this, (GeExpr.__proto__ || Object.getPrototypeOf(GeExpr)).call(this, a, b));
    }

    _createClass(GeExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) >= this._exprB.execute(index) ? 1 : 0;
        }
    }]);

    return GeExpr;
}(OpABExpr);

var LtExpr = exports.LtExpr = function (_OpABExpr7) {
    _inherits(LtExpr, _OpABExpr7);

    function LtExpr(a, b) {
        _classCallCheck(this, LtExpr);

        return _possibleConstructorReturn(this, (LtExpr.__proto__ || Object.getPrototypeOf(LtExpr)).call(this, a, b));
    }

    _createClass(LtExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) < this._exprB.execute(index) ? 1 : 0;
        }
    }]);

    return LtExpr;
}(OpABExpr);

var LeExpr = exports.LeExpr = function (_OpABExpr8) {
    _inherits(LeExpr, _OpABExpr8);

    function LeExpr(a, b) {
        _classCallCheck(this, LeExpr);

        return _possibleConstructorReturn(this, (LeExpr.__proto__ || Object.getPrototypeOf(LeExpr)).call(this, a, b));
    }

    _createClass(LeExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) <= this._exprB.execute(index) ? 1 : 0;
        }
    }]);

    return LeExpr;
}(OpABExpr);

var EqExpr = exports.EqExpr = function (_OpABExpr9) {
    _inherits(EqExpr, _OpABExpr9);

    function EqExpr(a, b) {
        _classCallCheck(this, EqExpr);

        return _possibleConstructorReturn(this, (EqExpr.__proto__ || Object.getPrototypeOf(EqExpr)).call(this, a, b));
    }

    _createClass(EqExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) === this._exprB.execute(index) ? 1 : 0;
        }
    }]);

    return EqExpr;
}(OpABExpr);

var MaxExpr = exports.MaxExpr = function (_OpABExpr10) {
    _inherits(MaxExpr, _OpABExpr10);

    function MaxExpr(a, b) {
        _classCallCheck(this, MaxExpr);

        return _possibleConstructorReturn(this, (MaxExpr.__proto__ || Object.getPrototypeOf(MaxExpr)).call(this, a, b));
    }

    _createClass(MaxExpr, [{
        key: "execute",
        value: function execute(index) {
            return Math.max(this._exprA.execute(index), this._exprB.execute(index));
        }
    }]);

    return MaxExpr;
}(OpABExpr);

var AbsExpr = exports.AbsExpr = function (_OpAExpr2) {
    _inherits(AbsExpr, _OpAExpr2);

    function AbsExpr(a) {
        _classCallCheck(this, AbsExpr);

        return _possibleConstructorReturn(this, (AbsExpr.__proto__ || Object.getPrototypeOf(AbsExpr)).call(this, a));
    }

    _createClass(AbsExpr, [{
        key: "execute",
        value: function execute(index) {
            return Math.abs(this._exprA.execute(index));
        }
    }]);

    return AbsExpr;
}(OpAExpr);

var RefExpr = exports.RefExpr = function (_OpABExpr11) {
    _inherits(RefExpr, _OpABExpr11);

    function RefExpr(a, b) {
        _classCallCheck(this, RefExpr);

        return _possibleConstructorReturn(this, (RefExpr.__proto__ || Object.getPrototypeOf(RefExpr)).call(this, a, b));
    }

    _createClass(RefExpr, [{
        key: "execute",
        value: function execute(index) {
            if (this._offset === undefined || this._offset < 0) {
                this._offset = this._exprB.execute(index);
                if (this._offset < 0) {
                    throw "offset < 0";
                }
            }
            index -= this._offset;
            if (index < 0) {
                throw "index < 0";
            }
            var result = this._exprA.execute(index);
            if (isNaN(result)) {
                throw "NaN";
            }
            return result;
        }
    }]);

    return RefExpr;
}(OpABExpr);

var AndExpr = exports.AndExpr = function (_OpABExpr12) {
    _inherits(AndExpr, _OpABExpr12);

    function AndExpr(a, b) {
        _classCallCheck(this, AndExpr);

        return _possibleConstructorReturn(this, (AndExpr.__proto__ || Object.getPrototypeOf(AndExpr)).call(this, a, b));
    }

    _createClass(AndExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) !== 0 && this._exprB.execute(index) !== 0 ? 1 : 0;
        }
    }]);

    return AndExpr;
}(OpABExpr);

var OrExpr = exports.OrExpr = function (_OpABExpr13) {
    _inherits(OrExpr, _OpABExpr13);

    function OrExpr(a, b) {
        _classCallCheck(this, OrExpr);

        return _possibleConstructorReturn(this, (OrExpr.__proto__ || Object.getPrototypeOf(OrExpr)).call(this, a, b));
    }

    _createClass(OrExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) !== 0 || this._exprB.execute(index) !== 0 ? 1 : 0;
        }
    }]);

    return OrExpr;
}(OpABExpr);

var IfExpr = exports.IfExpr = function (_OpABCExpr) {
    _inherits(IfExpr, _OpABCExpr);

    function IfExpr(a, b, c) {
        _classCallCheck(this, IfExpr);

        return _possibleConstructorReturn(this, (IfExpr.__proto__ || Object.getPrototypeOf(IfExpr)).call(this, a, b, c));
    }

    _createClass(IfExpr, [{
        key: "execute",
        value: function execute(index) {
            return this._exprA.execute(index) !== 0 ? this._exprB.execute(index) : this._exprC.execute(index);
        }
    }]);

    return IfExpr;
}(OpABCExpr);

var AssignExpr = exports.AssignExpr = function (_OpAExpr3) {
    _inherits(AssignExpr, _OpAExpr3);

    function AssignExpr(name, a) {
        _classCallCheck(this, AssignExpr);

        var _this28 = _possibleConstructorReturn(this, (AssignExpr.__proto__ || Object.getPrototypeOf(AssignExpr)).call(this, a));

        _this28._name = name;
        _this28._buf = [];
        return _this28;
    }

    _createClass(AssignExpr, [{
        key: "getName",
        value: function getName() {
            return this._name;
        }
    }, {
        key: "execute",
        value: function execute(index) {
            return this._buf[index];
        }
    }, {
        key: "assign",
        value: function assign(index) {
            this._buf[index] = this._exprA.execute(index);
            if (ExprEnv.get()._firstIndex >= 0) {
                if (isNaN(this._buf[index]) && !isNaN(this._buf[index - 1])) {
                    throw this._name + ".assign(" + index + "): NaN";
                }
            }
        }
    }, {
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                for (var c = count; c > 0; c--) {
                    this._buf.push(NaN);
                }
            }
            _get(AssignExpr.prototype.__proto__ || Object.getPrototypeOf(AssignExpr.prototype), "reserve", this).call(this, rid, count);
        }
    }, {
        key: "clear",
        value: function clear() {
            _get(AssignExpr.prototype.__proto__ || Object.getPrototypeOf(AssignExpr.prototype), "clear", this).call(this);
            this._buf = [];
        }
    }]);

    return AssignExpr;
}(OpAExpr);

var OutputExpr = exports.OutputExpr = function (_AssignExpr) {
    _inherits(OutputExpr, _AssignExpr);

    function OutputExpr(name, a, style, color) {
        _classCallCheck(this, OutputExpr);

        var _this29 = _possibleConstructorReturn(this, (OutputExpr.__proto__ || Object.getPrototypeOf(OutputExpr)).call(this, name, a));

        _this29._style = style === undefined ? OutputExpr.outputStyle.Line : style;
        _this29._color = color;
        return _this29;
    }

    _createClass(OutputExpr, [{
        key: "getStyle",
        value: function getStyle() {
            return this._style;
        }
    }, {
        key: "getColor",
        value: function getColor() {
            return this._color;
        }
    }]);

    return OutputExpr;
}(AssignExpr);

OutputExpr.outputStyle = {
    None: 0,
    Line: 1,
    VolumeStick: 2,
    MACDStick: 3,
    SARPoint: 4
};

var RangeOutputExpr = exports.RangeOutputExpr = function (_OutputExpr) {
    _inherits(RangeOutputExpr, _OutputExpr);

    function RangeOutputExpr(name, a, style, color) {
        _classCallCheck(this, RangeOutputExpr);

        return _possibleConstructorReturn(this, (RangeOutputExpr.__proto__ || Object.getPrototypeOf(RangeOutputExpr)).call(this, name, a, style, color));
    }

    _createClass(RangeOutputExpr, [{
        key: "getName",
        value: function getName() {
            return this._name + this._exprA.getRange();
        }
    }]);

    return RangeOutputExpr;
}(OutputExpr);

var RangeExpr = exports.RangeExpr = function (_OpABExpr14) {
    _inherits(RangeExpr, _OpABExpr14);

    function RangeExpr(a, b) {
        _classCallCheck(this, RangeExpr);

        var _this31 = _possibleConstructorReturn(this, (RangeExpr.__proto__ || Object.getPrototypeOf(RangeExpr)).call(this, a, b));

        _this31._range = -1;
        _this31._buf = [];
        return _this31;
    }

    _createClass(RangeExpr, [{
        key: "getRange",
        value: function getRange() {
            return this._range;
        }
    }, {
        key: "initRange",
        value: function initRange() {
            this._range = this._exprB.execute(0);
        }
    }, {
        key: "execute",
        value: function execute(index) {
            if (this._range < 0) {
                this.initRange();
            }
            var rA = this._buf[index].resultA = this._exprA.execute(index);
            return this._buf[index].result = this.calcResult(index, rA);
        }
    }, {
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                for (var c = count; c > 0; c--) {
                    this._buf.push({ resultA: NaN, result: NaN });
                }
            }
            _get(RangeExpr.prototype.__proto__ || Object.getPrototypeOf(RangeExpr.prototype), "reserve", this).call(this, rid, count);
        }
    }, {
        key: "clear",
        value: function clear() {
            _get(RangeExpr.prototype.__proto__ || Object.getPrototypeOf(RangeExpr.prototype), "clear", this).call(this);
            this._range = -1;
            this._buf = [];
        }
    }]);

    return RangeExpr;
}(OpABExpr);

var HhvExpr = exports.HhvExpr = function (_RangeExpr) {
    _inherits(HhvExpr, _RangeExpr);

    function HhvExpr(a, b) {
        _classCallCheck(this, HhvExpr);

        return _possibleConstructorReturn(this, (HhvExpr.__proto__ || Object.getPrototypeOf(HhvExpr)).call(this, a, b));
    }

    _createClass(HhvExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) {
                return NaN;
            }
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) {
                return resultA;
            }
            if (index > first) {
                var n = this._range;
                var result = resultA;
                var start = index - n + 1;
                var i = Math.max(first, start);
                for (; i < index; i++) {
                    var p = this._buf[i];
                    if (result < p.resultA) {
                        result = p.resultA;
                    }
                }
                return result;
            } else {
                return resultA;
            }
        }
    }]);

    return HhvExpr;
}(RangeExpr);

var LlvExpr = exports.LlvExpr = function (_RangeExpr2) {
    _inherits(LlvExpr, _RangeExpr2);

    function LlvExpr(a, b) {
        _classCallCheck(this, LlvExpr);

        return _possibleConstructorReturn(this, (LlvExpr.__proto__ || Object.getPrototypeOf(LlvExpr)).call(this, a, b));
    }

    _createClass(LlvExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) return NaN;
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return resultA;
            if (index > first) {
                var n = this._range;
                var result = resultA;
                var start = index - n + 1;
                var i = Math.max(first, start);
                for (; i < index; i++) {
                    var p = this._buf[i];
                    if (result > p.resultA) result = p.resultA;
                }
                return result;
            } else {
                return resultA;
            }
        }
    }]);

    return LlvExpr;
}(RangeExpr);

var CountExpr = exports.CountExpr = function (_RangeExpr3) {
    _inherits(CountExpr, _RangeExpr3);

    function CountExpr(a, b) {
        _classCallCheck(this, CountExpr);

        return _possibleConstructorReturn(this, (CountExpr.__proto__ || Object.getPrototypeOf(CountExpr)).call(this, a, b));
    }

    _createClass(CountExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) return NaN;
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return 0;
            if (index >= first) {
                var n = this._range - 1;
                if (n > index - first) n = index - first;
                var count = 0;
                for (; n >= 0; n--) {
                    if (this._buf[index - n].resultA !== 0.0) count++;
                }
                return count;
            } else {
                return 0;
            }
        }
    }]);

    return CountExpr;
}(RangeExpr);

var SumExpr = exports.SumExpr = function (_RangeExpr4) {
    _inherits(SumExpr, _RangeExpr4);

    function SumExpr(a, b) {
        _classCallCheck(this, SumExpr);

        return _possibleConstructorReturn(this, (SumExpr.__proto__ || Object.getPrototypeOf(SumExpr)).call(this, a, b));
    }

    _createClass(SumExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return resultA;
            if (index > first) {
                var n = this._range;
                if (n === 0 || n >= index + 1 - first) {
                    return this._buf[index - 1].result + resultA;
                }
                return this._buf[index - 1].result + resultA - this._buf[index - n].resultA;
            } else {
                return resultA;
            }
        }
    }]);

    return SumExpr;
}(RangeExpr);

var StdExpr = exports.StdExpr = function (_RangeExpr5) {
    _inherits(StdExpr, _RangeExpr5);

    function StdExpr(a, b) {
        _classCallCheck(this, StdExpr);

        return _possibleConstructorReturn(this, (StdExpr.__proto__ || Object.getPrototypeOf(StdExpr)).call(this, a, b));
    }

    _createClass(StdExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) return NaN;
            var stdData = this._stdBuf[index];
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) {
                stdData.resultMA = resultA;
                return 0.0;
            }
            if (index > first) {
                var n = this._range;
                if (n >= index + 1 - first) {
                    n = index + 1 - first;
                    stdData.resultMA = this._stdBuf[index - 1].resultMA * (1.0 - 1.0 / n) + resultA / n;
                } else {
                    stdData.resultMA = this._stdBuf[index - 1].resultMA + (resultA - this._buf[index - n].resultA) / n;
                }
                var sum = 0;
                for (var i = index - n + 1; i <= index; i++) {
                    sum += Math.pow(this._buf[i].resultA - stdData.resultMA, 2);
                }return Math.sqrt(sum / n);
            }
            stdData.resultMA = resultA;
            return 0.0;
        }
    }, {
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                for (var c = count; c > 0; c--) {
                    this._stdBuf.push({ resultMA: NaN });
                }
            }
            _get(StdExpr.prototype.__proto__ || Object.getPrototypeOf(StdExpr.prototype), "reserve", this).call(this, rid, count);
        }
    }, {
        key: "clear",
        value: function clear() {
            _get(StdExpr.prototype.__proto__ || Object.getPrototypeOf(StdExpr.prototype), "clear", this).call(this);
            this._stdBuf = [];
        }
    }]);

    return StdExpr;
}(RangeExpr);

var MaExpr = exports.MaExpr = function (_RangeExpr6) {
    _inherits(MaExpr, _RangeExpr6);

    function MaExpr(a, b) {
        _classCallCheck(this, MaExpr);

        return _possibleConstructorReturn(this, (MaExpr.__proto__ || Object.getPrototypeOf(MaExpr)).call(this, a, b));
    }

    _createClass(MaExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) return NaN;
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return resultA;
            if (index > first) {
                var n = this._range;
                if (n >= index + 1 - first) {
                    n = index + 1 - first;
                    return this._buf[index - 1].result * (1.0 - 1.0 / n) + resultA / n;
                }
                return this._buf[index - 1].result + (resultA - this._buf[index - n].resultA) / n;
            } else {
                return resultA;
            }
        }
    }]);

    return MaExpr;
}(RangeExpr);

var EmaExpr = exports.EmaExpr = function (_RangeExpr7) {
    _inherits(EmaExpr, _RangeExpr7);

    function EmaExpr(a, b) {
        _classCallCheck(this, EmaExpr);

        return _possibleConstructorReturn(this, (EmaExpr.__proto__ || Object.getPrototypeOf(EmaExpr)).call(this, a, b));
    }

    _createClass(EmaExpr, [{
        key: "initRange",
        value: function initRange() {
            _get(EmaExpr.prototype.__proto__ || Object.getPrototypeOf(EmaExpr.prototype), "initRange", this).call(this);
            this._alpha = 2.0 / (this._range + 1);
        }
    }, {
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) return NaN;
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return resultA;
            if (index > first) {
                var prev = this._buf[index - 1];
                return this._alpha * (resultA - prev.result) + prev.result;
            }
            return resultA;
        }
    }]);

    return EmaExpr;
}(RangeExpr);

var ExpmemaExpr = exports.ExpmemaExpr = function (_EmaExpr) {
    _inherits(ExpmemaExpr, _EmaExpr);

    function ExpmemaExpr(a, b) {
        _classCallCheck(this, ExpmemaExpr);

        return _possibleConstructorReturn(this, (ExpmemaExpr.__proto__ || Object.getPrototypeOf(ExpmemaExpr)).call(this, a, b));
    }

    _createClass(ExpmemaExpr, [{
        key: "calcResult",
        value: function calcResult(index, resultA) {
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return resultA;
            if (index > first) {
                var n = this._range;
                var prev = this._buf[index - 1];
                if (n >= index + 1 - first) {
                    n = index + 1 - first;
                    return prev.result * (1.0 - 1.0 / n) + resultA / n;
                }
                return this._alpha * (resultA - prev.result) + prev.result;
            }
            return resultA;
        }
    }]);

    return ExpmemaExpr;
}(EmaExpr);

var SmaExpr = exports.SmaExpr = function (_RangeExpr8) {
    _inherits(SmaExpr, _RangeExpr8);

    function SmaExpr(a, b, c) {
        _classCallCheck(this, SmaExpr);

        var _this40 = _possibleConstructorReturn(this, (SmaExpr.__proto__ || Object.getPrototypeOf(SmaExpr)).call(this, a, b));

        _this40._exprC = c;
        _this40._mul = null;
        return _this40;
    }

    _createClass(SmaExpr, [{
        key: "initRange",
        value: function initRange() {
            _get(SmaExpr.prototype.__proto__ || Object.getPrototypeOf(SmaExpr.prototype), "initRange", this).call(this);
            this._mul = this._exprC.execute(0);
        }
    }, {
        key: "calcResult",
        value: function calcResult(index, resultA) {
            if (this._range === 0) return NaN;
            var first = ExprEnv.get()._firstIndex;
            if (first < 0) return resultA;
            if (index > first) {
                var n = this._range;
                if (n > index + 1 - first) n = index + 1 - first;
                return ((n - 1) * this._buf[index - 1].result + resultA * this._mul) / n;
            }
            return resultA;
        }
    }]);

    return SmaExpr;
}(RangeExpr);

var SarExpr = exports.SarExpr = function (_OpABCDExpr) {
    _inherits(SarExpr, _OpABCDExpr);

    function SarExpr(a, b, c, d) {
        _classCallCheck(this, SarExpr);

        var _this41 = _possibleConstructorReturn(this, (SarExpr.__proto__ || Object.getPrototypeOf(SarExpr)).call(this, a, b, c, d));

        _this41._buf = [];
        _this41._range = -1;
        _this41._min = null;
        _this41._step = null;
        _this41._max = null;
        return _this41;
    }

    _createClass(SarExpr, [{
        key: "execute",
        value: function execute(index) {
            if (this._range < 0) {
                this._range = this._exprA.execute(0);
                this._min = this._exprB.execute(0) / 100.0;
                this._step = this._exprC.execute(0) / 100.0;
                this._max = this._exprD.execute(0) / 100.0;
            }
            var data = this._buf[index];
            var exprEnv = ExprEnv.get();
            var first = exprEnv._firstIndex;
            if (first < 0) {
                data.longPos = true;
                data.sar = exprEnv._ds.getDataAt(index).low;
                data.ep = exprEnv._ds.getDataAt(index).high;
                data.af = 0.02;
            } else {
                var high = exprEnv._ds.getDataAt(index).high;
                var low = exprEnv._ds.getDataAt(index).low;
                var prev = this._buf[index - 1];
                data.sar = prev.sar + prev.af * (prev.ep - prev.sar);
                if (prev.longPos) {
                    data.longPos = true;
                    if (high > prev.ep) {
                        data.ep = high;
                        data.af = Math.min(prev.af + this._step, this._max);
                    } else {
                        data.ep = prev.ep;
                        data.af = prev.af;
                    }
                    if (data.sar > low) {
                        data.longPos = false;
                        var i = index - this._range + 1;
                        for (i = Math.max(i, first); i < index; i++) {
                            var h = exprEnv._ds.getDataAt(i).high;
                            if (high < h) high = h;
                        }
                        data.sar = high;
                        data.ep = low;
                        data.af = 0.02;
                    }
                } else {
                    data.longPos = false;
                    if (low < prev.ep) {
                        data.ep = low;
                        data.af = Math.min(prev.af + this._step, this._max);
                    } else {
                        data.ep = prev.ep;
                        data.af = prev.af;
                    }
                    if (data.sar < high) {
                        data.longPos = true;
                        var _i = index - this._range + 1;
                        for (_i = Math.max(_i, first); _i < index; _i++) {
                            var l = exprEnv._ds.getDataAt(_i).low;
                            if (low > l) low = l;
                        }
                        data.sar = low;
                        data.ep = high;
                        data.af = 0.02;
                    }
                }
            }
            return data.sar;
        }
    }, {
        key: "reserve",
        value: function reserve(rid, count) {
            if (this._rid < rid) {
                for (var c = count; c > 0; c--) {
                    this._buf.push({ longPos: true, sar: NaN, ep: NaN, af: NaN });
                }
            }
            _get(SarExpr.prototype.__proto__ || Object.getPrototypeOf(SarExpr.prototype), "reserve", this).call(this, rid, count);
        }
    }, {
        key: "clear",
        value: function clear() {
            _get(SarExpr.prototype.__proto__ || Object.getPrototypeOf(SarExpr.prototype), "clear", this).call(this);
            this._range = -1;
        }
    }]);

    return SarExpr;
}(OpABCDExpr);
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.STOCHRSIIndicator = exports.PSYIndicator = exports.BOLLIndicator = exports.MTMIndicator = exports.ROCIndicator = exports.KDJIndicator = exports.SARIndicator = exports.WRIndicator = exports.RSIIndicator = exports.EMVIndicator = exports.OBVIndicator = exports.VRIndicator = exports.BRARIndicator = exports.TRIXIndicator = exports.DMAIndicator = exports.DMIIndicator = exports.MACDIndicator = exports.VOLUMEIndicator = exports.EMAIndicator = exports.MAIndicator = exports.HLCIndicator = exports.Indicator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exprs = require("./exprs");

var exprs = _interopRequireWildcard(_exprs);

var _themes = require("./themes");

var themes = _interopRequireWildcard(_themes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Indicator = exports.Indicator = function () {
    function Indicator() {
        _classCallCheck(this, Indicator);

        this._exprEnv = new exprs.ExprEnv();
        this._rid = 0;
        this._params = [];
        this._assigns = [];
        this._outputs = [];
    }

    _createClass(Indicator, [{
        key: "addParameter",
        value: function addParameter(expr) {
            this._params.push(expr);
        }
    }, {
        key: "addAssign",
        value: function addAssign(expr) {
            this._assigns.push(expr);
        }
    }, {
        key: "addOutput",
        value: function addOutput(expr) {
            this._outputs.push(expr);
        }
    }, {
        key: "getParameterCount",
        value: function getParameterCount() {
            return this._params.length;
        }
    }, {
        key: "getParameterAt",
        value: function getParameterAt(index) {
            return this._params[index];
        }
    }, {
        key: "getOutputCount",
        value: function getOutputCount() {
            return this._outputs.length;
        }
    }, {
        key: "getOutputAt",
        value: function getOutputAt(index) {
            return this._outputs[index];
        }
    }, {
        key: "clear",
        value: function clear() {
            this._exprEnv.setFirstIndex(-1);
            var i = void 0,
                cnt = void 0;
            cnt = this._assigns.length;
            for (i = 0; i < cnt; i++) {
                this._assigns[i].clear();
            }
            cnt = this._outputs.length;
            for (i = 0; i < cnt; i++) {
                this._outputs[i].clear();
            }
        }
    }, {
        key: "reserve",
        value: function reserve(count) {
            this._rid++;
            var i = void 0,
                cnt = void 0;
            cnt = this._assigns.length;
            for (i = 0; i < cnt; i++) {
                this._assigns[i].reserve(this._rid, count);
            }
            cnt = this._outputs.length;
            for (i = 0; i < cnt; i++) {
                this._outputs[i].reserve(this._rid, count);
            }
        }
    }, {
        key: "execute",
        value: function execute(ds, index) {
            if (index < 0) {
                return;
            }
            this._exprEnv.setDataSource(ds);
            exprs.ExprEnv.set(this._exprEnv);
            try {
                var i = void 0,
                    cnt = void 0;
                cnt = this._assigns.length;
                for (i = 0; i < cnt; i++) {
                    this._assigns[i].assign(index);
                }
                cnt = this._outputs.length;
                for (i = 0; i < cnt; i++) {
                    this._outputs[i].assign(index);
                }
                if (this._exprEnv.getFirstIndex() < 0) {
                    this._exprEnv.setFirstIndex(index);
                }
            } catch (e) {
                if (this._exprEnv.getFirstIndex() >= 0) {
                    alert(e);
                    throw e;
                }
            }
        }
    }, {
        key: "getParameters",
        value: function getParameters() {
            var params = [];
            var i = void 0,
                cnt = this._params.length;
            for (i = 0; i < cnt; i++) {
                params.push(this._params[i].getValue());
            }return params;
        }
    }, {
        key: "setParameters",
        value: function setParameters(params) {
            if (params instanceof Array && params.length === this._params.length) {
                for (var i in this._params) {
                    this._params[i].setValue(params[i]);
                }
            }
        }
    }]);

    return Indicator;
}();

var HLCIndicator = exports.HLCIndicator = function (_Indicator) {
    _inherits(HLCIndicator, _Indicator);

    function HLCIndicator() {
        _classCallCheck(this, HLCIndicator);

        var _this = _possibleConstructorReturn(this, (HLCIndicator.__proto__ || Object.getPrototypeOf(HLCIndicator)).call(this));

        var M1 = new exprs.ParameterExpr("M1", 2, 1000, 60);
        _this.addParameter(M1);
        _this.addOutput(new exprs.OutputExpr("HIGH", new exprs.HighExpr(), exprs.OutputExpr.outputStyle.None));
        _this.addOutput(new exprs.OutputExpr("LOW", new exprs.LowExpr(), exprs.OutputExpr.outputStyle.None));
        _this.addOutput(new exprs.OutputExpr("CLOSE", new exprs.CloseExpr(), exprs.OutputExpr.outputStyle.Line, themes.Theme.Color.Indicator0));
        _this.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M1), exprs.OutputExpr.outputStyle.Line, themes.Theme.Color.Indicator1));
        return _this;
    }

    _createClass(HLCIndicator, [{
        key: "getName",
        value: function getName() {
            return "CLOSE";
        }
    }]);

    return HLCIndicator;
}(Indicator);

var MAIndicator = exports.MAIndicator = function (_Indicator2) {
    _inherits(MAIndicator, _Indicator2);

    function MAIndicator() {
        _classCallCheck(this, MAIndicator);

        var _this2 = _possibleConstructorReturn(this, (MAIndicator.__proto__ || Object.getPrototypeOf(MAIndicator)).call(this));

        var M1 = new exprs.ParameterExpr("M1", 2, 1000, 7);
        var M2 = new exprs.ParameterExpr("M2", 2, 1000, 30);
        var M3 = new exprs.ParameterExpr("M3", 2, 1000, 0);
        var M4 = new exprs.ParameterExpr("M4", 2, 1000, 0);
        var M5 = new exprs.ParameterExpr("M5", 2, 1000, 0);
        var M6 = new exprs.ParameterExpr("M6", 2, 1000, 0);
        _this2.addParameter(M1);
        _this2.addParameter(M2);
        _this2.addParameter(M3);
        _this2.addParameter(M4);
        _this2.addParameter(M5);
        _this2.addParameter(M6);
        _this2.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M1)));
        _this2.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M2)));
        _this2.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M3)));
        _this2.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M4)));
        _this2.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M5)));
        _this2.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(new exprs.CloseExpr(), M6)));
        return _this2;
    }

    _createClass(MAIndicator, [{
        key: "getName",
        value: function getName() {
            return "MA";
        }
    }]);

    return MAIndicator;
}(Indicator);

var EMAIndicator = exports.EMAIndicator = function (_Indicator3) {
    _inherits(EMAIndicator, _Indicator3);

    function EMAIndicator() {
        _classCallCheck(this, EMAIndicator);

        var _this3 = _possibleConstructorReturn(this, (EMAIndicator.__proto__ || Object.getPrototypeOf(EMAIndicator)).call(this));

        var M1 = new exprs.ParameterExpr("M1", 2, 1000, 7);
        var M2 = new exprs.ParameterExpr("M2", 2, 1000, 30);
        var M3 = new exprs.ParameterExpr("M3", 2, 1000, 0);
        var M4 = new exprs.ParameterExpr("M4", 2, 1000, 0);
        var M5 = new exprs.ParameterExpr("M5", 2, 1000, 0);
        var M6 = new exprs.ParameterExpr("M6", 2, 1000, 0);
        _this3.addParameter(M1);
        _this3.addParameter(M2);
        _this3.addParameter(M3);
        _this3.addParameter(M4);
        _this3.addParameter(M5);
        _this3.addParameter(M6);
        _this3.addOutput(new exprs.RangeOutputExpr("EMA", new exprs.EmaExpr(new exprs.CloseExpr(), M1)));
        _this3.addOutput(new exprs.RangeOutputExpr("EMA", new exprs.EmaExpr(new exprs.CloseExpr(), M2)));
        _this3.addOutput(new exprs.RangeOutputExpr("EMA", new exprs.EmaExpr(new exprs.CloseExpr(), M3)));
        _this3.addOutput(new exprs.RangeOutputExpr("EMA", new exprs.EmaExpr(new exprs.CloseExpr(), M4)));
        _this3.addOutput(new exprs.RangeOutputExpr("EMA", new exprs.EmaExpr(new exprs.CloseExpr(), M5)));
        _this3.addOutput(new exprs.RangeOutputExpr("EMA", new exprs.EmaExpr(new exprs.CloseExpr(), M6)));
        return _this3;
    }

    _createClass(EMAIndicator, [{
        key: "getName",
        value: function getName() {
            return "EMA";
        }
    }]);

    return EMAIndicator;
}(Indicator);

var VOLUMEIndicator = exports.VOLUMEIndicator = function (_Indicator4) {
    _inherits(VOLUMEIndicator, _Indicator4);

    function VOLUMEIndicator() {
        _classCallCheck(this, VOLUMEIndicator);

        var _this4 = _possibleConstructorReturn(this, (VOLUMEIndicator.__proto__ || Object.getPrototypeOf(VOLUMEIndicator)).call(this));

        var M1 = new exprs.ParameterExpr("M1", 2, 500, 5);
        var M2 = new exprs.ParameterExpr("M2", 2, 500, 10);
        _this4.addParameter(M1);
        _this4.addParameter(M2);
        var VOLUME = new exprs.OutputExpr("VOLUME", new exprs.VolumeExpr(), exprs.OutputExpr.outputStyle.VolumeStick, themes.Theme.Color.Text4);
        _this4.addOutput(VOLUME);
        _this4.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(VOLUME, M1), exprs.OutputExpr.outputStyle.Line, themes.Theme.Color.Indicator0));
        _this4.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(VOLUME, M2), exprs.OutputExpr.outputStyle.Line, themes.Theme.Color.Indicator1));
        return _this4;
    }

    _createClass(VOLUMEIndicator, [{
        key: "getName",
        value: function getName() {
            return "VOLUME";
        }
    }]);

    return VOLUMEIndicator;
}(Indicator);

var MACDIndicator = exports.MACDIndicator = function (_Indicator5) {
    _inherits(MACDIndicator, _Indicator5);

    function MACDIndicator() {
        _classCallCheck(this, MACDIndicator);

        var _this5 = _possibleConstructorReturn(this, (MACDIndicator.__proto__ || Object.getPrototypeOf(MACDIndicator)).call(this));

        var SHORT = new exprs.ParameterExpr("SHORT", 2, 200, 12);
        var LONG = new exprs.ParameterExpr("LONG", 2, 200, 26);
        var MID = new exprs.ParameterExpr("MID", 2, 200, 9);
        _this5.addParameter(SHORT);
        _this5.addParameter(LONG);
        _this5.addParameter(MID);
        var DIF = new exprs.OutputExpr("DIF", new exprs.SubExpr(new exprs.EmaExpr(new exprs.CloseExpr(), SHORT), new exprs.EmaExpr(new exprs.CloseExpr(), LONG)));
        _this5.addOutput(DIF);
        var DEA = new exprs.OutputExpr("DEA", new exprs.EmaExpr(DIF, MID));
        _this5.addOutput(DEA);
        var MACD = new exprs.OutputExpr("MACD", new exprs.MulExpr(new exprs.SubExpr(DIF, DEA), new exprs.ConstExpr(2)), exprs.OutputExpr.outputStyle.MACDStick);
        _this5.addOutput(MACD);
        return _this5;
    }

    _createClass(MACDIndicator, [{
        key: "getName",
        value: function getName() {
            return "MACD";
        }
    }]);

    return MACDIndicator;
}(Indicator);

var DMIIndicator = exports.DMIIndicator = function (_Indicator6) {
    _inherits(DMIIndicator, _Indicator6);

    function DMIIndicator() {
        _classCallCheck(this, DMIIndicator);

        var _this6 = _possibleConstructorReturn(this, (DMIIndicator.__proto__ || Object.getPrototypeOf(DMIIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 90, 14);
        var MM = new exprs.ParameterExpr("MM", 2, 60, 6);
        _this6.addParameter(N);
        _this6.addParameter(MM);
        var MTR = new exprs.AssignExpr("MTR", new exprs.ExpmemaExpr(new exprs.MaxExpr(new exprs.MaxExpr(new exprs.SubExpr(new exprs.HighExpr(), new exprs.LowExpr()), new exprs.AbsExpr(new exprs.SubExpr(new exprs.HighExpr(), new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1))))), new exprs.AbsExpr(new exprs.SubExpr(new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1)), new exprs.LowExpr()))), N));
        _this6.addAssign(MTR);
        var HD = new exprs.AssignExpr("HD", new exprs.SubExpr(new exprs.HighExpr(), new exprs.RefExpr(new exprs.HighExpr(), new exprs.ConstExpr(1))));
        _this6.addAssign(HD);
        var LD = new exprs.AssignExpr("LD", new exprs.SubExpr(new exprs.RefExpr(new exprs.LowExpr(), new exprs.ConstExpr(1)), new exprs.LowExpr()));
        _this6.addAssign(LD);
        var DMP = new exprs.AssignExpr("DMP", new exprs.ExpmemaExpr(new exprs.IfExpr(new exprs.AndExpr(new exprs.GtExpr(HD, new exprs.ConstExpr(0)), new exprs.GtExpr(HD, LD)), HD, new exprs.ConstExpr(0)), N));
        _this6.addAssign(DMP);
        var DMM = new exprs.AssignExpr("DMM", new exprs.ExpmemaExpr(new exprs.IfExpr(new exprs.AndExpr(new exprs.GtExpr(LD, new exprs.ConstExpr(0)), new exprs.GtExpr(LD, HD)), LD, new exprs.ConstExpr(0)), N));
        _this6.addAssign(DMM);
        var PDI = new exprs.OutputExpr("PDI", new exprs.MulExpr(new exprs.DivExpr(DMP, MTR), new exprs.ConstExpr(100)));
        _this6.addOutput(PDI);
        var MDI = new exprs.OutputExpr("MDI", new exprs.MulExpr(new exprs.DivExpr(DMM, MTR), new exprs.ConstExpr(100)));
        _this6.addOutput(MDI);
        var ADX = new exprs.OutputExpr("ADX", new exprs.ExpmemaExpr(new exprs.MulExpr(new exprs.DivExpr(new exprs.AbsExpr(new exprs.SubExpr(MDI, PDI)), new exprs.AddExpr(MDI, PDI)), new exprs.ConstExpr(100)), MM));
        _this6.addOutput(ADX);
        var ADXR = new exprs.OutputExpr("ADXR", new exprs.ExpmemaExpr(ADX, MM));
        _this6.addOutput(ADXR);
        return _this6;
    }

    _createClass(DMIIndicator, [{
        key: "getName",
        value: function getName() {
            return "DMI";
        }
    }]);

    return DMIIndicator;
}(Indicator);

var DMAIndicator = exports.DMAIndicator = function (_Indicator7) {
    _inherits(DMAIndicator, _Indicator7);

    function DMAIndicator() {
        _classCallCheck(this, DMAIndicator);

        var _this7 = _possibleConstructorReturn(this, (DMAIndicator.__proto__ || Object.getPrototypeOf(DMAIndicator)).call(this));

        var N1 = new exprs.ParameterExpr("N1", 2, 60, 10);
        var N2 = new exprs.ParameterExpr("N2", 2, 250, 50);
        var M = new exprs.ParameterExpr("M", 2, 100, 10);
        _this7.addParameter(N1);
        _this7.addParameter(N2);
        _this7.addParameter(M);
        var DIF = new exprs.OutputExpr("DIF", new exprs.SubExpr(new exprs.MaExpr(new exprs.CloseExpr(), N1), new exprs.MaExpr(new exprs.CloseExpr(), N2)));
        _this7.addOutput(DIF);
        var DIFMA = new exprs.OutputExpr("DIFMA", new exprs.MaExpr(DIF, M));
        _this7.addOutput(DIFMA);
        return _this7;
    }

    _createClass(DMAIndicator, [{
        key: "getName",
        value: function getName() {
            return "DMA";
        }
    }]);

    return DMAIndicator;
}(Indicator);

var TRIXIndicator = exports.TRIXIndicator = function (_Indicator8) {
    _inherits(TRIXIndicator, _Indicator8);

    function TRIXIndicator() {
        _classCallCheck(this, TRIXIndicator);

        var _this8 = _possibleConstructorReturn(this, (TRIXIndicator.__proto__ || Object.getPrototypeOf(TRIXIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 100, 12);
        var M = new exprs.ParameterExpr("M", 2, 100, 9);
        _this8.addParameter(N);
        _this8.addParameter(M);
        var MTR = new exprs.AssignExpr("MTR", new exprs.EmaExpr(new exprs.EmaExpr(new exprs.EmaExpr(new exprs.CloseExpr(), N), N), N));
        _this8.addAssign(MTR);
        var TRIX = new exprs.OutputExpr("TRIX", new exprs.MulExpr(new exprs.DivExpr(new exprs.SubExpr(MTR, new exprs.RefExpr(MTR, new exprs.ConstExpr(1))), new exprs.RefExpr(MTR, new exprs.ConstExpr(1))), new exprs.ConstExpr(100)));
        _this8.addOutput(TRIX);
        var MATRIX = new exprs.OutputExpr("MATRIX", new exprs.MaExpr(TRIX, M));
        _this8.addOutput(MATRIX);
        return _this8;
    }

    _createClass(TRIXIndicator, [{
        key: "getName",
        value: function getName() {
            return "TRIX";
        }
    }]);

    return TRIXIndicator;
}(Indicator);

var BRARIndicator = exports.BRARIndicator = function (_Indicator9) {
    _inherits(BRARIndicator, _Indicator9);

    function BRARIndicator() {
        _classCallCheck(this, BRARIndicator);

        var _this9 = _possibleConstructorReturn(this, (BRARIndicator.__proto__ || Object.getPrototypeOf(BRARIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 120, 26);
        _this9.addParameter(N);
        var REF_CLOSE_1 = new exprs.AssignExpr("REF_CLOSE_1", new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1)));
        _this9.addAssign(REF_CLOSE_1);
        var BR = new exprs.OutputExpr("BR", new exprs.MulExpr(new exprs.DivExpr(new exprs.SumExpr(new exprs.MaxExpr(new exprs.ConstExpr(0), new exprs.SubExpr(new exprs.HighExpr(), REF_CLOSE_1)), N), new exprs.SumExpr(new exprs.MaxExpr(new exprs.ConstExpr(0), new exprs.SubExpr(REF_CLOSE_1, new exprs.LowExpr())), N)), new exprs.ConstExpr(100)));
        _this9.addOutput(BR);
        var AR = new exprs.OutputExpr("AR", new exprs.MulExpr(new exprs.DivExpr(new exprs.SumExpr(new exprs.SubExpr(new exprs.HighExpr(), new exprs.OpenExpr()), N), new exprs.SumExpr(new exprs.SubExpr(new exprs.OpenExpr(), new exprs.LowExpr()), N)), new exprs.ConstExpr(100)));
        _this9.addOutput(AR);
        return _this9;
    }

    _createClass(BRARIndicator, [{
        key: "getName",
        value: function getName() {
            return "BRAR";
        }
    }]);

    return BRARIndicator;
}(Indicator);

var VRIndicator = exports.VRIndicator = function (_Indicator10) {
    _inherits(VRIndicator, _Indicator10);

    function VRIndicator() {
        _classCallCheck(this, VRIndicator);

        var _this10 = _possibleConstructorReturn(this, (VRIndicator.__proto__ || Object.getPrototypeOf(VRIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 100, 26);
        var M = new exprs.ParameterExpr("M", 2, 100, 6);
        _this10.addParameter(N);
        _this10.addParameter(M);
        var REF_CLOSE_1 = new exprs.AssignExpr("REF_CLOSE_1", new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1)));
        _this10.addAssign(REF_CLOSE_1);
        var TH = new exprs.AssignExpr("TH", new exprs.SumExpr(new exprs.IfExpr(new exprs.GtExpr(new exprs.CloseExpr(), REF_CLOSE_1), new exprs.VolumeExpr(), new exprs.ConstExpr(0)), N));
        _this10.addAssign(TH);
        var TL = new exprs.AssignExpr("TL", new exprs.SumExpr(new exprs.IfExpr(new exprs.LtExpr(new exprs.CloseExpr(), REF_CLOSE_1), new exprs.VolumeExpr(), new exprs.ConstExpr(0)), N));
        _this10.addAssign(TL);
        var TQ = new exprs.AssignExpr("TQ", new exprs.SumExpr(new exprs.IfExpr(new exprs.EqExpr(new exprs.CloseExpr(), REF_CLOSE_1), new exprs.VolumeExpr(), new exprs.ConstExpr(0)), N));
        _this10.addAssign(TQ);
        var VR = new exprs.OutputExpr("VR", new exprs.MulExpr(new exprs.DivExpr(new exprs.AddExpr(new exprs.MulExpr(TH, new exprs.ConstExpr(2)), TQ), new exprs.AddExpr(new exprs.MulExpr(TL, new exprs.ConstExpr(2)), TQ)), new exprs.ConstExpr(100)));
        _this10.addOutput(VR);
        var MAVR = new exprs.OutputExpr("MAVR", new exprs.MaExpr(VR, M));
        _this10.addOutput(MAVR);
        return _this10;
    }

    _createClass(VRIndicator, [{
        key: "getName",
        value: function getName() {
            return "VR";
        }
    }]);

    return VRIndicator;
}(Indicator);

var OBVIndicator = exports.OBVIndicator = function (_Indicator11) {
    _inherits(OBVIndicator, _Indicator11);

    function OBVIndicator() {
        _classCallCheck(this, OBVIndicator);

        var _this11 = _possibleConstructorReturn(this, (OBVIndicator.__proto__ || Object.getPrototypeOf(OBVIndicator)).call(this));

        var M = new exprs.ParameterExpr("M", 2, 100, 30);
        _this11.addParameter(M);
        var REF_CLOSE_1 = new exprs.AssignExpr("REF_CLOSE_1", new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1)));
        _this11.addAssign(REF_CLOSE_1);
        var VA = new exprs.AssignExpr("VA", new exprs.IfExpr(new exprs.GtExpr(new exprs.CloseExpr(), REF_CLOSE_1), new exprs.VolumeExpr(), new exprs.NegExpr(new exprs.VolumeExpr())));
        _this11.addAssign(VA);
        var OBV = new exprs.OutputExpr("OBV", new exprs.SumExpr(new exprs.IfExpr(new exprs.EqExpr(new exprs.CloseExpr(), REF_CLOSE_1), new exprs.ConstExpr(0), VA), new exprs.ConstExpr(0)));
        _this11.addOutput(OBV);
        var MAOBV = new exprs.OutputExpr("MAOBV", new exprs.MaExpr(OBV, M));
        _this11.addOutput(MAOBV);
        return _this11;
    }

    _createClass(OBVIndicator, [{
        key: "getName",
        value: function getName() {
            return "OBV";
        }
    }]);

    return OBVIndicator;
}(Indicator);

var EMVIndicator = exports.EMVIndicator = function (_Indicator12) {
    _inherits(EMVIndicator, _Indicator12);

    function EMVIndicator() {
        _classCallCheck(this, EMVIndicator);

        var _this12 = _possibleConstructorReturn(this, (EMVIndicator.__proto__ || Object.getPrototypeOf(EMVIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 90, 14);
        var M = new exprs.ParameterExpr("M", 2, 60, 9);
        _this12.addParameter(N);
        _this12.addParameter(M);
        var VOLUME = new exprs.AssignExpr("VOLUME", new exprs.DivExpr(new exprs.MaExpr(new exprs.VolumeExpr(), N), new exprs.VolumeExpr()));
        _this12.addAssign(VOLUME);
        var MID = new exprs.AssignExpr("MID", new exprs.MulExpr(new exprs.DivExpr(new exprs.SubExpr(new exprs.AddExpr(new exprs.HighExpr(), new exprs.LowExpr()), new exprs.RefExpr(new exprs.AddExpr(new exprs.HighExpr(), new exprs.LowExpr()), new exprs.ConstExpr(1))), new exprs.AddExpr(new exprs.HighExpr(), new exprs.LowExpr())), new exprs.ConstExpr(100)));
        _this12.addAssign(MID);
        var EMV = new exprs.OutputExpr("EMV", new exprs.MaExpr(new exprs.DivExpr(new exprs.MulExpr(MID, new exprs.MulExpr(VOLUME, new exprs.SubExpr(new exprs.HighExpr(), new exprs.LowExpr()))), new exprs.MaExpr(new exprs.SubExpr(new exprs.HighExpr(), new exprs.LowExpr()), N)), N));
        _this12.addOutput(EMV);
        var MAEMV = new exprs.OutputExpr("MAEMV", new exprs.MaExpr(EMV, M));
        _this12.addOutput(MAEMV);
        return _this12;
    }

    _createClass(EMVIndicator, [{
        key: "getName",
        value: function getName() {
            return "EMV";
        }
    }]);

    return EMVIndicator;
}(Indicator);

var RSIIndicator = exports.RSIIndicator = function (_Indicator13) {
    _inherits(RSIIndicator, _Indicator13);

    function RSIIndicator() {
        _classCallCheck(this, RSIIndicator);

        var _this13 = _possibleConstructorReturn(this, (RSIIndicator.__proto__ || Object.getPrototypeOf(RSIIndicator)).call(this));

        var N1 = new exprs.ParameterExpr("N1", 2, 120, 6);
        var N2 = new exprs.ParameterExpr("N2", 2, 250, 12);
        var N3 = new exprs.ParameterExpr("N3", 2, 500, 24);
        _this13.addParameter(N1);
        _this13.addParameter(N2);
        _this13.addParameter(N3);
        var LC = new exprs.AssignExpr("LC", new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1)));
        _this13.addAssign(LC);
        var CLOSE_LC = new exprs.AssignExpr("CLOSE_LC", new exprs.SubExpr(new exprs.CloseExpr(), LC));
        _this13.addAssign(CLOSE_LC);
        _this13.addOutput(new exprs.OutputExpr("RSI1", new exprs.MulExpr(new exprs.DivExpr(new exprs.SmaExpr(new exprs.MaxExpr(CLOSE_LC, new exprs.ConstExpr(0)), N1, new exprs.ConstExpr(1)), new exprs.SmaExpr(new exprs.AbsExpr(CLOSE_LC), N1, new exprs.ConstExpr(1))), new exprs.ConstExpr(100))));
        _this13.addOutput(new exprs.OutputExpr("RSI2", new exprs.MulExpr(new exprs.DivExpr(new exprs.SmaExpr(new exprs.MaxExpr(CLOSE_LC, new exprs.ConstExpr(0)), N2, new exprs.ConstExpr(1)), new exprs.SmaExpr(new exprs.AbsExpr(CLOSE_LC), N2, new exprs.ConstExpr(1))), new exprs.ConstExpr(100))));
        _this13.addOutput(new exprs.OutputExpr("RSI3", new exprs.MulExpr(new exprs.DivExpr(new exprs.SmaExpr(new exprs.MaxExpr(CLOSE_LC, new exprs.ConstExpr(0)), N3, new exprs.ConstExpr(1)), new exprs.SmaExpr(new exprs.AbsExpr(CLOSE_LC), N3, new exprs.ConstExpr(1))), new exprs.ConstExpr(100))));
        return _this13;
    }

    _createClass(RSIIndicator, [{
        key: "getName",
        value: function getName() {
            return "RSI";
        }
    }]);

    return RSIIndicator;
}(Indicator);

var WRIndicator = exports.WRIndicator = function (_Indicator14) {
    _inherits(WRIndicator, _Indicator14);

    function WRIndicator() {
        _classCallCheck(this, WRIndicator);

        var _this14 = _possibleConstructorReturn(this, (WRIndicator.__proto__ || Object.getPrototypeOf(WRIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 100, 10);
        var N1 = new exprs.ParameterExpr("N1", 2, 100, 6);
        _this14.addParameter(N);
        _this14.addParameter(N1);
        var HHV = new exprs.AssignExpr("HHV", new exprs.HhvExpr(new exprs.HighExpr(), N));
        _this14.addAssign(HHV);
        var HHV1 = new exprs.AssignExpr("HHV1", new exprs.HhvExpr(new exprs.HighExpr(), N1));
        _this14.addAssign(HHV1);
        var LLV = new exprs.AssignExpr("LLV", new exprs.LlvExpr(new exprs.LowExpr(), N));
        _this14.addAssign(LLV);
        var LLV1 = new exprs.AssignExpr("LLV1", new exprs.LlvExpr(new exprs.LowExpr(), N1));
        _this14.addAssign(LLV1);
        var WR1 = new exprs.OutputExpr("WR1", new exprs.MulExpr(new exprs.DivExpr(new exprs.SubExpr(HHV, new exprs.CloseExpr()), new exprs.SubExpr(HHV, LLV)), new exprs.ConstExpr(100)));
        _this14.addOutput(WR1);
        var WR2 = new exprs.OutputExpr("WR2", new exprs.MulExpr(new exprs.DivExpr(new exprs.SubExpr(HHV1, new exprs.CloseExpr()), new exprs.SubExpr(HHV1, LLV1)), new exprs.ConstExpr(100)));
        _this14.addOutput(WR2);
        return _this14;
    }

    _createClass(WRIndicator, [{
        key: "getName",
        value: function getName() {
            return "WR";
        }
    }]);

    return WRIndicator;
}(Indicator);

var SARIndicator = exports.SARIndicator = function (_Indicator15) {
    _inherits(SARIndicator, _Indicator15);

    function SARIndicator() {
        _classCallCheck(this, SARIndicator);

        var _this15 = _possibleConstructorReturn(this, (SARIndicator.__proto__ || Object.getPrototypeOf(SARIndicator)).call(this));

        var N = new exprs.ConstExpr(4);
        var MIN = new exprs.ConstExpr(2);
        var STEP = new exprs.ConstExpr(2);
        var MAX = new exprs.ConstExpr(20);
        _this15.addOutput(new exprs.OutputExpr("SAR", new exprs.SarExpr(N, MIN, STEP, MAX), exprs.OutputExpr.outputStyle.SARPoint));
        return _this15;
    }

    _createClass(SARIndicator, [{
        key: "getName",
        value: function getName() {
            return "SAR";
        }
    }]);

    return SARIndicator;
}(Indicator);

var KDJIndicator = exports.KDJIndicator = function (_Indicator16) {
    _inherits(KDJIndicator, _Indicator16);

    function KDJIndicator() {
        _classCallCheck(this, KDJIndicator);

        var _this16 = _possibleConstructorReturn(this, (KDJIndicator.__proto__ || Object.getPrototypeOf(KDJIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 90, 9);
        var M1 = new exprs.ParameterExpr("M1", 2, 30, 3);
        var M2 = new exprs.ParameterExpr("M2", 2, 30, 3);
        _this16.addParameter(N);
        _this16.addParameter(M1);
        _this16.addParameter(M2);
        var HHV = new exprs.AssignExpr("HHV", new exprs.HhvExpr(new exprs.HighExpr(), N));
        _this16.addAssign(HHV);
        var LLV = new exprs.AssignExpr("LLV", new exprs.LlvExpr(new exprs.LowExpr(), N));
        _this16.addAssign(LLV);
        var RSV = new exprs.AssignExpr("RSV", new exprs.MulExpr(new exprs.DivExpr(new exprs.SubExpr(new exprs.CloseExpr(), LLV), new exprs.SubExpr(HHV, LLV)), new exprs.ConstExpr(100)));
        _this16.addAssign(RSV);
        var K = new exprs.OutputExpr("K", new exprs.SmaExpr(RSV, M1, new exprs.ConstExpr(1)));
        _this16.addOutput(K);
        var D = new exprs.OutputExpr("D", new exprs.SmaExpr(K, M2, new exprs.ConstExpr(1)));
        _this16.addOutput(D);
        var J = new exprs.OutputExpr("J", new exprs.SubExpr(new exprs.MulExpr(K, new exprs.ConstExpr(3)), new exprs.MulExpr(D, new exprs.ConstExpr(2))));
        _this16.addOutput(J);
        return _this16;
    }

    _createClass(KDJIndicator, [{
        key: "getName",
        value: function getName() {
            return "KDJ";
        }
    }]);

    return KDJIndicator;
}(Indicator);

var ROCIndicator = exports.ROCIndicator = function (_Indicator17) {
    _inherits(ROCIndicator, _Indicator17);

    function ROCIndicator() {
        _classCallCheck(this, ROCIndicator);

        var _this17 = _possibleConstructorReturn(this, (ROCIndicator.__proto__ || Object.getPrototypeOf(ROCIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 120, 12);
        var M = new exprs.ParameterExpr("M", 2, 60, 6);
        _this17.addParameter(N);
        _this17.addParameter(M);
        var REF_CLOSE_N = new exprs.AssignExpr("REF_CLOSE_N", new exprs.RefExpr(new exprs.CloseExpr(), N));
        _this17.addAssign(REF_CLOSE_N);
        var ROC = new exprs.OutputExpr("ROC", new exprs.MulExpr(new exprs.DivExpr(new exprs.SubExpr(new exprs.CloseExpr(), REF_CLOSE_N), REF_CLOSE_N), new exprs.ConstExpr(100)));
        _this17.addOutput(ROC);
        var MAROC = new exprs.OutputExpr("MAROC", new exprs.MaExpr(ROC, M));
        _this17.addOutput(MAROC);
        return _this17;
    }

    _createClass(ROCIndicator, [{
        key: "getName",
        value: function getName() {
            return "ROC";
        }
    }]);

    return ROCIndicator;
}(Indicator);

var MTMIndicator = exports.MTMIndicator = function (_Indicator18) {
    _inherits(MTMIndicator, _Indicator18);

    function MTMIndicator() {
        _classCallCheck(this, MTMIndicator);

        var _this18 = _possibleConstructorReturn(this, (MTMIndicator.__proto__ || Object.getPrototypeOf(MTMIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 120, 12);
        var M = new exprs.ParameterExpr("M", 2, 60, 6);
        _this18.addParameter(N);
        _this18.addParameter(M);
        var MTM = new exprs.OutputExpr("MTM", new exprs.SubExpr(new exprs.CloseExpr(), new exprs.RefExpr(new exprs.CloseExpr(), N)));
        _this18.addOutput(MTM);
        var MTMMA = new exprs.OutputExpr("MTMMA", new exprs.MaExpr(MTM, M));
        _this18.addOutput(MTMMA);
        return _this18;
    }

    _createClass(MTMIndicator, [{
        key: "getName",
        value: function getName() {
            return "MTM";
        }
    }]);

    return MTMIndicator;
}(Indicator);

var BOLLIndicator = exports.BOLLIndicator = function (_Indicator19) {
    _inherits(BOLLIndicator, _Indicator19);

    function BOLLIndicator() {
        _classCallCheck(this, BOLLIndicator);

        var _this19 = _possibleConstructorReturn(this, (BOLLIndicator.__proto__ || Object.getPrototypeOf(BOLLIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 120, 20);
        _this19.addParameter(N);
        var STD_CLOSE_N = new exprs.AssignExpr("STD_CLOSE_N", new exprs.StdExpr(new exprs.CloseExpr(), N));
        _this19.addAssign(STD_CLOSE_N);
        var BOLL = new exprs.OutputExpr("BOLL", new exprs.MaExpr(new exprs.CloseExpr(), N));
        _this19.addOutput(BOLL);
        var UB = new exprs.OutputExpr("UB", new exprs.AddExpr(BOLL, new exprs.MulExpr(new exprs.ConstExpr(2), STD_CLOSE_N)));
        _this19.addOutput(UB);
        var LB = new exprs.OutputExpr("LB", new exprs.SubExpr(BOLL, new exprs.MulExpr(new exprs.ConstExpr(2), STD_CLOSE_N)));
        _this19.addOutput(LB);
        return _this19;
    }

    _createClass(BOLLIndicator, [{
        key: "getName",
        value: function getName() {
            return "BOLL";
        }
    }]);

    return BOLLIndicator;
}(Indicator);

var PSYIndicator = exports.PSYIndicator = function (_Indicator20) {
    _inherits(PSYIndicator, _Indicator20);

    function PSYIndicator() {
        _classCallCheck(this, PSYIndicator);

        var _this20 = _possibleConstructorReturn(this, (PSYIndicator.__proto__ || Object.getPrototypeOf(PSYIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 2, 100, 12);
        var M = new exprs.ParameterExpr("M", 2, 100, 6);
        _this20.addParameter(N);
        _this20.addParameter(M);
        var PSY = new exprs.OutputExpr("PSY", new exprs.MulExpr(new exprs.DivExpr(new exprs.CountExpr(new exprs.GtExpr(new exprs.CloseExpr(), new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1))), N), N), new exprs.ConstExpr(100)));
        _this20.addOutput(PSY);
        var PSYMA = new exprs.OutputExpr("PSYMA", new exprs.MaExpr(PSY, M));
        _this20.addOutput(PSYMA);
        return _this20;
    }

    _createClass(PSYIndicator, [{
        key: "getName",
        value: function getName() {
            return "PSY";
        }
    }]);

    return PSYIndicator;
}(Indicator);

var STOCHRSIIndicator = exports.STOCHRSIIndicator = function (_Indicator21) {
    _inherits(STOCHRSIIndicator, _Indicator21);

    function STOCHRSIIndicator() {
        _classCallCheck(this, STOCHRSIIndicator);

        var _this21 = _possibleConstructorReturn(this, (STOCHRSIIndicator.__proto__ || Object.getPrototypeOf(STOCHRSIIndicator)).call(this));

        var N = new exprs.ParameterExpr("N", 3, 100, 14);
        var M = new exprs.ParameterExpr("M", 3, 100, 14);
        var P1 = new exprs.ParameterExpr("P1", 2, 50, 3);
        var P2 = new exprs.ParameterExpr("P2", 2, 50, 3);
        _this21.addParameter(N);
        _this21.addParameter(M);
        _this21.addParameter(P1);
        _this21.addParameter(P2);
        var LC = new exprs.AssignExpr("LC", new exprs.RefExpr(new exprs.CloseExpr(), new exprs.ConstExpr(1)));
        _this21.addAssign(LC);
        var CLOSE_LC = new exprs.AssignExpr("CLOSE_LC", new exprs.SubExpr(new exprs.CloseExpr(), LC));
        _this21.addAssign(CLOSE_LC);
        var RSI = new exprs.AssignExpr("RSI", new exprs.MulExpr(new exprs.DivExpr(new exprs.SmaExpr(new exprs.MaxExpr(CLOSE_LC, new exprs.ConstExpr(0)), N, new exprs.ConstExpr(1)), new exprs.SmaExpr(new exprs.AbsExpr(CLOSE_LC), N, new exprs.ConstExpr(1))), new exprs.ConstExpr(100)));
        _this21.addAssign(RSI);
        var STOCHRSI = new exprs.OutputExpr("STOCHRSI", new exprs.MulExpr(new exprs.DivExpr(new exprs.MaExpr(new exprs.SubExpr(RSI, new exprs.LlvExpr(RSI, M)), P1), new exprs.MaExpr(new exprs.SubExpr(new exprs.HhvExpr(RSI, M), new exprs.LlvExpr(RSI, M)), P1)), new exprs.ConstExpr(100)));
        _this21.addOutput(STOCHRSI);
        _this21.addOutput(new exprs.RangeOutputExpr("MA", new exprs.MaExpr(STOCHRSI, P2)));
        return _this21;
    }

    _createClass(STOCHRSIIndicator, [{
        key: "getName",
        value: function getName() {
            return "StochRSI";
        }
    }]);

    return STOCHRSIIndicator;
}(Indicator);
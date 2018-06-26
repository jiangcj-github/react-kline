'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChartManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = require('./control');

var _chart = require('./chart');

var _indicators = require('./indicators');

var indicators = _interopRequireWildcard(_indicators);

var _ranges = require('./ranges');

var ranges = _interopRequireWildcard(_ranges);

var _templates = require('./templates');

var templates = _interopRequireWildcard(_templates);

var _data_sources = require('./data_sources');

var data_sources = _interopRequireWildcard(_data_sources);

var _chart_settings = require('./chart_settings');

var _data_providers = require('./data_providers');

var data_providers = _interopRequireWildcard(_data_providers);

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

var _plotters = require('./plotters');

var plotters = _interopRequireWildcard(_plotters);

var _ctools = require('./ctools');

var ctools = _interopRequireWildcard(_ctools);

var _areas2 = require('./areas');

var areas = _interopRequireWildcard(_areas2);

var _util = require('./util');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('jquery-mousewheel');

var ChartManager = exports.ChartManager = function () {
    function ChartManager() {
        _classCallCheck(this, ChartManager);

        this._dataSources = {};
        this._dataSourceCache = {};
        this._dataProviders = {};
        this._frames = {};
        this._areas = {};
        this._timelines = {};
        this._ranges = {};
        this._plotters = {};
        this._themes = {};
        this._titles = {};
        this._frameMousePos = {};
        this._dsChartStyle = {};
        this._dragStarted = false;
        this._oldX = 0;
        this._fakeIndicators = {};
        this._captureMouseWheelDirectly = true;
        this._chart = {};
        this._chart.defaultFrame = new _chart.Chart();
        this._drawingTool = ChartManager.DrawingTool["CrossCursor"];
        this._beforeDrawingTool = this._drawingTool;
        this._language = "zh-cn";
        this._mainCanvas = null;
        this._overlayCanvas = null;
        this._mainContext = null;
        this._overlayContext = null;

        if (!ChartManager.created) {
            ChartManager.instance = this;
            ChartManager.created = true;
        }
        return ChartManager.instance;
    }

    _createClass(ChartManager, [{
        key: 'redraw',
        value: function redraw(layer, refresh) {
            if (layer === undefined || refresh) {
                layer = "All";
            }
            if (layer === "All" || layer === "MainCanvas") {
                if (refresh) {
                    this.getFrame("frame0").setChanged(true);
                }
                this.layout(this._mainContext, "frame0", 0, 0, this._mainCanvas.width, this._mainCanvas.height);
                this.drawMain("frame0", this._mainContext);
            }
            if (layer === "All" || layer === "OverlayCanvas") {
                this._overlayContext.clearRect(0, 0, this._overlayCanvas.width, this._overlayCanvas.height);
                this.drawOverlay("frame0", this._overlayContext);
            }
        }
    }, {
        key: 'bindCanvas',
        value: function bindCanvas(layer, canvas) {
            if (layer === "main") {
                this._mainCanvas = canvas;
                this._mainContext = canvas.getContext("2d");
            } else if (layer === "overlay") {
                this._overlayCanvas = canvas;
                this._overlayContext = canvas.getContext("2d");
                if (this._captureMouseWheelDirectly) {
                    (0, _jquery2.default)(this._overlayCanvas).bind('mousewheel', _control.Control.mouseWheel);
                }
            }
        }
    }, {
        key: 'getCaptureMouseWheelDirectly',
        value: function getCaptureMouseWheelDirectly() {
            return this._captureMouseWheelDirectly;
        }
    }, {
        key: 'setCaptureMouseWheelDirectly',
        value: function setCaptureMouseWheelDirectly(v) {
            this._captureMouseWheelDirectly = v;
            if (v) (0, _jquery2.default)(this._overlayCanvas).bind('mousewheel', _control.Control.mouseWheel);else (0, _jquery2.default)(this._overlayCanvas).unbind('mousewheel');
        }
    }, {
        key: 'getChart',
        value: function getChart(nouseParam) {
            return this._chart["defaultFrame"];
        }
    }, {
        key: 'init',
        value: function init() {
            delete this._ranges['frame0.k0.indic1'];
            delete this._ranges['frame0.k0.indic1Range'];
            delete this._areas['frame0.k0.indic1'];
            delete this._areas['frame0.k0.indic1Range'];
            templates.DefaultTemplate.loadTemplate("frame0.k0", "");
            this.redraw('All', true);
        }
    }, {
        key: 'setCurrentDrawingTool',
        value: function setCurrentDrawingTool(paramTool) {
            this._drawingTool = ChartManager.DrawingTool[paramTool];
            this.setRunningMode(this._drawingTool);
        }
    }, {
        key: 'getLanguage',
        value: function getLanguage() {
            return this._language;
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(lang) {
            this._language = lang;
        }
    }, {
        key: 'setThemeName',
        value: function setThemeName(frameName, themeName) {
            if (themeName === undefined) themeName = "Dark";
            var theme = void 0;
            switch (themeName) {
                case "Light":
                    theme = new themes.LightTheme();
                    break;
                default:
                    themeName = "Dark";
                    theme = new themes.DarkTheme();
                    break;
            }
            this._themeName = themeName;
            this.setTheme(frameName, theme);
            this.getFrame(frameName).setChanged(true);
        }
    }, {
        key: 'getChartStyle',
        value: function getChartStyle(dsName) {
            var chartStyle = this._dsChartStyle[dsName];
            if (chartStyle === undefined) return "CandleStick";
            return chartStyle;
        }
    }, {
        key: 'setChartStyle',
        value: function setChartStyle(dsName, style) {
            if (this._dsChartStyle[dsName] === style) return;
            var areaName = dsName + ".main";
            var dpName = areaName + ".main";
            var plotterName = areaName + ".main";
            var dp = void 0,
                plotter = void 0;
            switch (style) {
                case "CandleStick":
                case "CandleStickHLC":
                case "OHLC":
                    dp = this.getDataProvider(dpName);
                    if (dp === undefined || !_util.Util.isInstance(dp, data_providers.MainDataProvider)) {
                        dp = new data_providers.MainDataProvider(dpName);
                        this.setDataProvider(dpName, dp);
                        dp.updateData();
                    }
                    this.setMainIndicator(dsName, _chart_settings.ChartSettings.get().charts.mIndic);
                    switch (style) {
                        case "CandleStick":
                            plotter = new plotters.CandlestickPlotter(plotterName);
                            break;
                        case "CandleStickHLC":
                            plotter = new plotters.CandlestickHLCPlotter(plotterName);
                            break;
                        case "OHLC":
                            plotter = new plotters.OHLCPlotter(plotterName);
                            break;
                    }
                    this.setPlotter(plotterName, plotter);
                    plotter = new plotters.MinMaxPlotter(areaName + ".decoration");
                    this.setPlotter(plotter.getName(), plotter);
                    break;
                case "Line":
                    dp = new data_providers.IndicatorDataProvider(dpName);
                    this.setDataProvider(dp.getName(), dp);
                    dp.setIndicator(new indicators.HLCIndicator());
                    this.removeMainIndicator(dsName);
                    plotter = new plotters.IndicatorPlotter(plotterName);
                    this.setPlotter(plotterName, plotter);
                    this.removePlotter(areaName + ".decoration");
                    break;
            }
            this.getArea(plotter.getAreaName()).setChanged(true);
            this._dsChartStyle[dsName] = style;
        }
    }, {
        key: 'setNormalMode',
        value: function setNormalMode() {
            this._drawingTool = this._beforeDrawingTool;
            (0, _jquery2.default)(".chart_dropdown_data").removeClass("chart_dropdown-hover");
            (0, _jquery2.default)("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
            (0, _jquery2.default)("#chart_CrossCursor").parent().addClass("selected");
            if (this._drawingTool === ChartManager.DrawingTool.Cursor) {
                this.showCursor();
                (0, _jquery2.default)("#mode a").removeClass("selected");
                (0, _jquery2.default)("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
                (0, _jquery2.default)("#chart_Cursor").parent().addClass("selected");
            } else {
                this.hideCursor();
            }
        }
    }, {
        key: 'setRunningMode',
        value: function setRunningMode(mode) {
            var pds = this.getDataSource("frame0.k0");
            var curr_o = pds.getCurrentToolObject();
            if (curr_o !== null && curr_o.state !== ctools.CToolObject.state.AfterDraw) {
                pds.delToolObject();
            }
            if (pds.getToolObjectCount() > 10) {
                this.setNormalMode();
                return;
            }
            this._drawingTool = mode;
            if (mode === ChartManager.DrawingTool.Cursor) {
                this.showCursor();
            } else {}
            switch (mode) {
                case ChartManager.DrawingTool.Cursor:
                    {
                        this._beforeDrawingTool = mode;
                        break;
                    }
                case ChartManager.DrawingTool.ArrowLine:
                    {
                        pds.addToolObject(new ctools.CArrowLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.BandLine:
                    {
                        pds.addToolObject(new ctools.CBandLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.BiParallelLine:
                    {
                        pds.addToolObject(new ctools.CBiParallelLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.BiParallelRayLine:
                    {
                        pds.addToolObject(new ctools.CBiParallelRayLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.CrossCursor:
                    {
                        this._beforeDrawingTool = mode;
                        break;
                    }
                case ChartManager.DrawingTool.DrawFibFans:
                    {
                        pds.addToolObject(new ctools.CFibFansObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.DrawFibRetrace:
                    {
                        pds.addToolObject(new ctools.CFibRetraceObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.DrawLines:
                    {
                        pds.addToolObject(new ctools.CStraightLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.HoriRayLine:
                    {
                        pds.addToolObject(new ctools.CHoriRayLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.HoriSegLine:
                    {
                        pds.addToolObject(new ctools.CHoriSegLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.HoriStraightLine:
                    {
                        pds.addToolObject(new ctools.CHoriStraightLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.PriceLine:
                    {
                        pds.addToolObject(new ctools.CPriceLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.RayLine:
                    {
                        pds.addToolObject(new ctools.CRayLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.SegLine:
                    {
                        pds.addToolObject(new ctools.CSegLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.StraightLine:
                    {
                        pds.addToolObject(new ctools.CStraightLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.TriParallelLine:
                    {
                        pds.addToolObject(new ctools.CTriParallelLineObject("frame0.k0"));
                        break;
                    }
                case ChartManager.DrawingTool.VertiStraightLine:
                    {
                        pds.addToolObject(new ctools.CVertiStraightLineObject("frame0.k0"));
                        break;
                    }
            }
        }
    }, {
        key: 'getTitle',
        value: function getTitle(dsName) {
            return this._titles[dsName];
        }
    }, {
        key: 'setTitle',
        value: function setTitle(dsName, title) {
            this._titles[dsName] = title;
        }
    }, {
        key: 'setCurrentDataSource',
        value: function setCurrentDataSource(dsName, dsAlias) {
            var cached = this.getCachedDataSource(dsAlias);
            if (cached !== undefined && cached !== null) {
                this.setDataSource(dsName, cached, true);
            } else {
                cached = new data_sources.MainDataSource(dsAlias);
                this.setDataSource(dsName, cached, true);
                this.setCachedDataSource(dsAlias, cached);
            }
        }
    }, {
        key: 'getDataSource',
        value: function getDataSource(name) {
            return this._dataSources[name];
        }
    }, {
        key: 'setDataSource',
        value: function setDataSource(name, ds, forceRefresh) {
            this._dataSources[name] = ds;
            if (forceRefresh) {
                this.updateData(name, null);
            }
        }
    }, {
        key: 'getCachedDataSource',
        value: function getCachedDataSource(name) {
            return this._dataSourceCache[name];
        }
    }, {
        key: 'setCachedDataSource',
        value: function setCachedDataSource(name, ds) {
            this._dataSourceCache[name] = ds;
        }
    }, {
        key: 'getDataProvider',
        value: function getDataProvider(name) {
            return this._dataProviders[name];
        }
    }, {
        key: 'setDataProvider',
        value: function setDataProvider(name, dp) {
            this._dataProviders[name] = dp;
        }
    }, {
        key: 'removeDataProvider',
        value: function removeDataProvider(name) {
            delete this._dataProviders[name];
        }
    }, {
        key: 'getFrame',
        value: function getFrame(name) {
            return this._frames[name];
        }
    }, {
        key: 'setFrame',
        value: function setFrame(name, frame) {
            this._frames[name] = frame;
        }
    }, {
        key: 'removeFrame',
        value: function removeFrame(name) {
            delete this._frames[name];
        }
    }, {
        key: 'getArea',
        value: function getArea(name) {
            return this._areas[name];
        }
    }, {
        key: 'setArea',
        value: function setArea(name, area) {
            this._areas[name] = area;
        }
    }, {
        key: 'removeArea',
        value: function removeArea(name) {
            delete this._areas[name];
        }
    }, {
        key: 'getTimeline',
        value: function getTimeline(name) {
            return this._timelines[name];
        }
    }, {
        key: 'setTimeline',
        value: function setTimeline(name, timeline) {
            this._timelines[name] = timeline;
        }
    }, {
        key: 'removeTimeline',
        value: function removeTimeline(name) {
            delete this._timelines[name];
        }
    }, {
        key: 'getRange',
        value: function getRange(name) {
            return this._ranges[name];
        }
    }, {
        key: 'setRange',
        value: function setRange(name, range) {
            this._ranges[name] = range;
        }
    }, {
        key: 'removeRange',
        value: function removeRange(name) {
            delete this._ranges[name];
        }
    }, {
        key: 'getPlotter',
        value: function getPlotter(name) {
            return this._plotters[name];
        }
    }, {
        key: 'setPlotter',
        value: function setPlotter(name, plotter) {
            this._plotters[name] = plotter;
        }
    }, {
        key: 'removePlotter',
        value: function removePlotter(name) {
            delete this._plotters[name];
        }
    }, {
        key: 'getTheme',
        value: function getTheme(name) {
            return this._themes[name];
        }
    }, {
        key: 'setTheme',
        value: function setTheme(name, theme) {
            this._themes[name] = theme;
        }
    }, {
        key: 'getFrameMousePos',
        value: function getFrameMousePos(name, point) {
            if (this._frameMousePos[name] !== undefined) {
                point.x = this._frameMousePos[name].x;
                point.y = this._frameMousePos[name].y;
            } else {
                point.x = -1;
                point.y = -1;
            }
        }
    }, {
        key: 'setFrameMousePos',
        value: function setFrameMousePos(name, px, py) {
            this._frameMousePos[name] = { x: px, y: py };
        }
    }, {
        key: 'drawArea',
        value: function drawArea(context, area, plotterNames) {
            var areaName = area.getNameObject().getCompAt(2);
            if (areaName === "timeline") {
                if (area.getHeight() < 20) return;
            } else {
                if (area.getHeight() < 30) return;
            }
            if (area.getWidth() < 30) return;
            areaName = area.getName();
            var plotter = void 0;
            var i = void 0,
                cnt = plotterNames.length;
            for (i = 0; i < cnt; i++) {
                plotter = this._plotters[areaName + plotterNames[i]];
                if (plotter !== undefined) plotter.Draw(context);
            }
        }
    }, {
        key: 'drawAreaMain',
        value: function drawAreaMain(context, area) {
            var ds = this._dataSources[area.getDataSourceName()];
            var plotterNames = void 0;
            if (ds.getDataCount() < 1) plotterNames = [".background"];else plotterNames = [".background", ".grid", ".main", ".secondary"];
            this.drawArea(context, area, plotterNames);
            area.setChanged(false);
        }
    }, {
        key: 'drawAreaOverlay',
        value: function drawAreaOverlay(context, area) {
            var ds = this._dataSources[area.getDataSourceName()];
            var plotterNames = void 0;
            if (ds.getDataCount() < 1) plotterNames = [".selection"];else plotterNames = [".decoration", ".selection", ".info", ".tool"];
            this.drawArea(context, area, plotterNames);
        }
    }, {
        key: 'drawMain',
        value: function drawMain(frameName, context) {
            var drawn = false;

            if (!drawn) {
                for (var it in this._areas) {
                    if (this._areas[it].getFrameName() === frameName && !_util.Util.isInstance(this._areas[it], areas.ChartAreaGroup)) this.drawAreaMain(context, this._areas[it]);
                }
            }
            var e = void 0;
            for (var i in this._timelines) {
                e = this._timelines[i];
                if (e.getFrameName() === frameName) e.setUpdated(false);
            }
            for (var _i in this._ranges) {
                e = this._ranges[_i];
                if (e.getFrameName() === frameName) e.setUpdated(false);
            }
            for (var _i2 in this._areas) {
                e = this._areas[_i2];
                if (e.getFrameName() === frameName) e.setChanged(false);
            }
        }
    }, {
        key: 'drawOverlay',
        value: function drawOverlay(frameName, context) {
            for (var n in this._areas) {
                var area = this._areas[n];
                if (_util.Util.isInstance(area, areas.ChartAreaGroup)) if (area.getFrameName() === frameName) {
                    area.drawGrid(context);
                }
            }
            for (var _n in this._areas) {
                var _area = this._areas[_n];
                if (_util.Util.isInstance(_area, areas.ChartAreaGroup) === false) if (_area.getFrameName() === frameName) {
                    this.drawAreaOverlay(context, _area);
                }
            }
        }
    }, {
        key: 'updateData',
        value: function updateData(dsName, data) {
            var ds = this.getDataSource(dsName);
            if (ds === undefined || ds === null) {
                return;
            }
            if (data !== undefined && data !== null) {
                if (!ds.update(data)) {
                    return false;
                }
                if (ds.getUpdateMode() === data_sources.DataSource.UpdateMode.DoNothing) return true;
            } else {
                ds.setUpdateMode(data_sources.DataSource.UpdateMode.Refresh);
            }
            var timeline = this.getTimeline(dsName);
            if (timeline !== undefined && timeline !== null) {
                timeline.update();
            }
            if (ds.getDataCount() < 1) {
                return true;
            }
            var dpNames = [".main", ".secondary"];
            var area = void 0,
                areaName = void 0;
            for (var n in this._areas) {
                area = this._areas[n];
                if (_util.Util.isInstance(area, areas.ChartAreaGroup)) {
                    continue;
                }
                if (area.getDataSourceName() !== dsName) {
                    continue;
                }
                areaName = area.getName();
                for (var i = 0; i < dpNames.length; i++) {
                    var dp = this.getDataProvider(areaName + dpNames[i]);
                    if (dp !== undefined && dp !== null) {
                        dp.updateData();
                    }
                }
            }
            return true;
        }
    }, {
        key: 'updateRange',
        value: function updateRange(dsName) {
            var ds = this.getDataSource(dsName);
            if (ds.getDataCount() < 1) {
                return;
            }
            var dpNames = [".main", ".secondary"];
            var area = void 0,
                areaName = void 0;
            for (var n in this._areas) {
                area = this._areas[n];
                if (_util.Util.isInstance(area, areas.ChartAreaGroup)) continue;
                if (area.getDataSourceName() !== dsName) continue;
                areaName = area.getName();
                for (var i = 0; i < dpNames.length; i++) {
                    var dp = this.getDataProvider(areaName + dpNames[i]);
                    if (dp !== undefined && dp !== null) {
                        dp.updateRange();
                    }
                }
                var timeline = this.getTimeline(dsName);
                if (timeline !== undefined && timeline.getMaxItemCount() > 0) {
                    var range = this.getRange(areaName);
                    if (range !== undefined && range !== null) {
                        range.update();
                    }
                }
            }
        }
    }, {
        key: 'layout',
        value: function layout(context, frameName, left, top, right, bottom) {
            var frame = this.getFrame(frameName);
            frame.measure(context, right - left, bottom - top);
            frame.layout(left, top, right, bottom);
            for (var n in this._timelines) {
                var e = this._timelines[n];
                if (e.getFrameName() === frameName) e.onLayout();
            }
            for (var _n2 in this._dataSources) {
                if (_n2.substring(0, frameName.length) === frameName) this.updateRange(_n2);
            }
        }
    }, {
        key: 'SelectRange',
        value: function SelectRange(pArea, y) {
            for (var ee in this._ranges) {
                var _1 = this._ranges[ee].getAreaName();
                var _2 = pArea.getName();
                if (_1 === _2) this._ranges[ee].selectAt(y);else this._ranges[ee].unselect();
            }
        }
    }, {
        key: 'scale',
        value: function scale(s) {
            if (this._highlightedFrame === null) return;
            var hiArea = this._highlightedFrame.getHighlightedArea();
            if (this.getRange(hiArea.getName()) !== undefined) {
                var dsName = hiArea.getDataSourceName();
                var timeline = this.getTimeline(dsName);
                if (timeline !== null) {
                    timeline.scale(s);
                    this.updateRange(dsName);
                }
            }
        }
    }, {
        key: 'showCursor',
        value: function showCursor(cursor) {
            if (cursor === undefined) cursor = 'default';
            this._mainCanvas.style.cursor = cursor;
            this._overlayCanvas.style.cursor = cursor;
        }
    }, {
        key: 'hideCursor',
        value: function hideCursor() {
            this._mainCanvas.style.cursor = 'none';
            this._overlayCanvas.style.cursor = 'none';
        }
    }, {
        key: 'showCrossCursor',
        value: function showCrossCursor(area, x, y) {
            var e = this.getRange(area.getName());
            if (e !== undefined) {
                e.selectAt(y);
                e = this.getTimeline(area.getDataSourceName());
                if (e !== undefined) if (e.selectAt(x)) return true;
            }
            return false;
        }
    }, {
        key: 'hideCrossCursor',
        value: function hideCrossCursor(exceptTimeline) {
            if (exceptTimeline !== null && exceptTimeline !== undefined) {
                for (var n in this._timelines) {
                    var e = this._timelines[n];
                    if (e !== exceptTimeline) {
                        e.unselect();
                    }
                }
            } else {
                for (var _n3 in this._timelines) {
                    this._timelines[_n3].unselect();
                }
            }
            for (var _n4 in this._ranges) {
                this._ranges[_n4].unselect();
            }
        }
    }, {
        key: 'clearHighlight',
        value: function clearHighlight() {
            if (this._highlightedFrame !== null && this._highlightedFrame !== undefined) {
                this._highlightedFrame.highlight(null);
                this._highlightedFrame = null;
            }
        }
    }, {
        key: 'onToolMouseMove',
        value: function onToolMouseMove(frameName, x, y) {
            var ret = false;
            frameName += ".";
            for (var n in this._dataSources) {
                if (n.indexOf(frameName) === 0) {
                    var ds = this._dataSources[n];
                    if (_util.Util.isInstance(ds, data_sources.MainDataSource)) if (ds.toolManager.acceptMouseMoveEvent(x, y)) ret = true;
                }
            }
            return ret;
        }
    }, {
        key: 'onToolMouseDown',
        value: function onToolMouseDown(frameName, x, y) {
            var ret = false;
            frameName += ".";
            for (var n in this._dataSources) {
                if (n.indexOf(frameName) === 0) {
                    var ds = this._dataSources[n];
                    if (_util.Util.isInstance(ds, data_sources.MainDataSource)) if (ds.toolManager.acceptMouseDownEvent(x, y)) ret = true;
                }
            }
            return ret;
        }
    }, {
        key: 'onToolMouseUp',
        value: function onToolMouseUp(frameName, x, y) {
            var ret = false;
            frameName += ".";
            for (var n in this._dataSources) {
                if (n.indexOf(frameName) === 0) {
                    var ds = this._dataSources[n];
                    if (_util.Util.isInstance(ds, data_sources.MainDataSource)) if (ds.toolManager.acceptMouseUpEvent(x, y)) ret = true;
                }
            }
            return ret;
        }
    }, {
        key: 'onToolMouseDrag',
        value: function onToolMouseDrag(frameName, x, y) {
            var ret = false;
            frameName += ".";
            for (var n in this._dataSources) {
                if (n.indexOf(frameName) === 0) {
                    var ds = this._dataSources[n];
                    if (_util.Util.isInstance(ds, data_sources.MainDataSource)) if (ds.toolManager.acceptMouseDownMoveEvent(x, y)) ret = true;
                }
            }
            return ret;
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(frameName, x, y, drag) {
            var frame = this.getFrame(frameName);
            if (frame === undefined) return;
            this.setFrameMousePos(frameName, x, y);
            this.hideCrossCursor();
            if (this._highlightedFrame !== frame) this.clearHighlight();
            if (this._capturingMouseArea !== null && this._capturingMouseArea !== undefined) {
                this._capturingMouseArea.onMouseMove(x, y);
                return;
            }
            var _areas = frame.contains(x, y);
            if (_areas === null) return;
            var a = void 0,
                i = void 0,
                cnt = _areas.length;
            for (i = cnt - 1; i >= 0; i--) {
                a = _areas[i];
                a = a.onMouseMove(x, y);
                if (a !== null) {
                    if (!_util.Util.isInstance(a, areas.ChartAreaGroup)) {
                        frame.highlight(a);
                        this._highlightedFrame = frame;
                    }
                    return;
                }
            }
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(frameName, x, y, move) {
            var frame = this.getFrame(frameName);
            if (frame === undefined) return;
            this.setFrameMousePos(frameName, x, y);
            this.hideCrossCursor();
            this.clearHighlight();
            if (this._capturingMouseArea !== null && this._capturingMouseArea !== undefined) {
                this._capturingMouseArea.onMouseLeave(x, y);
                this._capturingMouseArea = null;
            }
            this._dragStarted = false;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(frameName, x, y) {
            var frame = this.getFrame(frameName);
            if (frame === undefined) return;
            var areas = frame.contains(x, y);
            if (areas === null) return;
            var a = void 0,
                i = void 0,
                cnt = areas.length;
            for (i = cnt - 1; i >= 0; i--) {
                a = areas[i];
                a = a.onMouseDown(x, y);
                if (a !== null) {
                    this._capturingMouseArea = a;
                    return;
                }
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(frameName, x, y) {
            var frame = this.getFrame(frameName);
            if (frame === undefined) return;
            if (this._capturingMouseArea) {
                if (this._capturingMouseArea.onMouseUp(x, y) === null && this._dragStarted === false) {
                    if (this._selectedFrame !== null && this._selectedFrame !== undefined && this._selectedFrame !== frame) this._selectedFrame.select(null);
                    if (this._capturingMouseArea.isSelected()) {
                        if (!this._captureMouseWheelDirectly) (0, _jquery2.default)(this._overlayCanvas).unbind('mousewheel');
                        frame.select(null);
                        this._selectedFrame = null;
                    } else {
                        if (this._selectedFrame !== frame) if (!this._captureMouseWheelDirectly) (0, _jquery2.default)(this._overlayCanvas).bind('mousewheel', _control.Control.mouseWheel);
                        frame.select(this._capturingMouseArea);
                        this._selectedFrame = frame;
                    }
                }
                this._capturingMouseArea = null;
                this._dragStarted = false;
            }
        }
    }, {
        key: 'deleteToolObject',
        value: function deleteToolObject() {
            var pDPTool = this.getDataSource("frame0.k0");
            var selectObject = pDPTool.getSelectToolObjcet();
            if (selectObject !== null) pDPTool.delSelectToolObject();
            var currentObject = pDPTool.getCurrentToolObject();
            if (currentObject !== null && currentObject.getState() !== ctools.CToolObject.state.AfterDraw) {
                pDPTool.delToolObject();
            }
            this.setNormalMode();
        }
    }, {
        key: 'unloadTemplate',
        value: function unloadTemplate(frameName) {
            var frame = this.getFrame(frameName);
            if (frame === undefined) return;
            for (var n in this._dataSources) {
                if (n.match(frameName + ".")) delete this._dataSources[n];
            }
            for (var _n5 in this._dataProviders) {
                if (this._dataProviders[_n5].getFrameName() === frameName) delete this._dataProviders[_n5];
            }
            delete this._frames[frameName];
            for (var _n6 in this._areas) {
                if (this._areas[_n6].getFrameName() === frameName) delete this._areas[_n6];
            }
            for (var _n7 in this._timelines) {
                if (this._timelines[_n7].getFrameName() === frameName) delete this._timelines[_n7];
            }
            for (var _n8 in this._ranges) {
                if (this._ranges[_n8].getFrameName() === frameName) delete this._ranges[_n8];
            }
            for (var _n9 in this._plotters) {
                if (this._plotters[_n9].getFrameName() === frameName) delete this._plotters[_n9];
            }
            delete this._themes[frameName];
            delete this._frameMousePos[frameName];
        }
    }, {
        key: 'createIndicatorAndRange',
        value: function createIndicatorAndRange(areaName, indicName, notLoadSettings) {
            var indic = void 0,
                range = void 0;
            switch (indicName) {
                case "MA":
                    indic = new indicators.MAIndicator();
                    range = new ranges.PositiveRange(areaName);
                    break;
                case "EMA":
                    indic = new indicators.EMAIndicator();
                    range = new ranges.PositiveRange(areaName);
                    break;
                case "VOLUME":
                    indic = new indicators.VOLUMEIndicator();
                    range = new ranges.ZeroBasedPositiveRange(areaName);
                    break;
                case "MACD":
                    indic = new indicators.MACDIndicator();
                    range = new ranges.ZeroCenteredRange(areaName);
                    break;
                case "DMI":
                    indic = new indicators.DMIIndicator();
                    range = new ranges.PercentageRange(areaName);
                    break;
                case "DMA":
                    indic = new indicators.DMAIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "TRIX":
                    indic = new indicators.TRIXIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "BRAR":
                    indic = new indicators.BRARIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "VR":
                    indic = new indicators.VRIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "OBV":
                    indic = new indicators.OBVIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "EMV":
                    indic = new indicators.EMVIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "RSI":
                    indic = new indicators.RSIIndicator();
                    range = new ranges.PercentageRange(areaName);
                    break;
                case "WR":
                    indic = new indicators.WRIndicator();
                    range = new ranges.PercentageRange(areaName);
                    break;
                case "SAR":
                    indic = new indicators.SARIndicator();
                    range = new ranges.PositiveRange(areaName);
                    break;
                case "KDJ":
                    indic = new indicators.KDJIndicator();
                    range = new ranges.PercentageRange(areaName);
                    break;
                case "ROC":
                    indic = new indicators.ROCIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "MTM":
                    indic = new indicators.MTMIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "BOLL":
                    indic = new indicators.BOLLIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "PSY":
                    indic = new indicators.PSYIndicator();
                    range = new ranges.Range(areaName);
                    break;
                case "StochRSI":
                    indic = new indicators.STOCHRSIIndicator();
                    range = new ranges.PercentageRange(areaName);
                    break;
                default:
                    return null;
            }
            if (!notLoadSettings) {
                indic.setParameters(_chart_settings.ChartSettings.get().indics[indicName]);
            }
            return { "indic": indic, "range": range };
        }
    }, {
        key: 'setMainIndicator',
        value: function setMainIndicator(dsName, indicName) {
            var areaName = dsName + ".main";
            var dp = this.getDataProvider(areaName + ".main");
            if (dp === undefined || !_util.Util.isInstance(dp, data_providers.MainDataProvider)) return false;
            var indic = void 0;
            switch (indicName) {
                case "MA":
                    indic = new indicators.MAIndicator();
                    break;
                case "EMA":
                    indic = new indicators.EMAIndicator();
                    break;
                case "BOLL":
                    indic = new indicators.BOLLIndicator();
                    break;
                case "SAR":
                    indic = new indicators.SARIndicator();
                    break;
                default:
                    return false;
            }
            indic.setParameters(_chart_settings.ChartSettings.get().indics[indicName]);
            var indicDpName = areaName + ".secondary";
            var indicDp = this.getDataProvider(indicDpName);
            if (indicDp === undefined) {
                indicDp = new data_providers.IndicatorDataProvider(indicDpName);
                this.setDataProvider(indicDp.getName(), indicDp);
            }
            indicDp.setIndicator(indic);
            var plotter = this.getPlotter(indicDpName);
            if (plotter === undefined) {
                plotter = new plotters.IndicatorPlotter(indicDpName);
                this.setPlotter(plotter.getName(), plotter);
            }
            this.getArea(areaName).setChanged(true);
            return true;
        }
    }, {
        key: 'setIndicator',
        value: function setIndicator(areaName, indicName) {
            var area = this.getArea(areaName);
            if (area === null || area === undefined || area.getNameObject().getCompAt(2) === "main") {
                return false;
            }
            var dp = this.getDataProvider(areaName + ".secondary");
            if (dp === null || dp === undefined || !_util.Util.isInstance(dp, data_providers.IndicatorDataProvider)) {
                return false;
            }
            var ret = this.createIndicatorAndRange(areaName, indicName);
            if (ret === null || ret === undefined) {
                return false;
            }
            var indic = ret.indic;
            var range = ret.range;
            this.removeDataProvider(areaName + ".main");
            this.removePlotter(areaName + ".main");
            this.removeRange(areaName);
            this.removePlotter(areaName + "Range.decoration");
            dp.setIndicator(indic);
            this.setRange(areaName, range);
            range.setPaddingTop(20);
            range.setPaddingBottom(4);
            range.setMinInterval(20);
            if (_util.Util.isInstance(indic, indicators.VOLUMEIndicator)) {
                var plotter = new plotters.LastVolumePlotter(areaName + "Range.decoration");
                this.setPlotter(plotter.getName(), plotter);
            } else if (_util.Util.isInstance(indic, indicators.BOLLIndicator) || _util.Util.isInstance(indic, indicators.SARIndicator)) {
                var _dp = new data_providers.MainDataProvider(areaName + ".main");
                this.setDataProvider(_dp.getName(), _dp);
                _dp.updateData();
                var _plotter = new plotters.OHLCPlotter(areaName + ".main");
                this.setPlotter(_plotter.getName(), _plotter);
            }
            return true;
        }
    }, {
        key: 'removeMainIndicator',
        value: function removeMainIndicator(dsName) {
            var areaName = dsName + ".main";
            var indicDpName = areaName + ".secondary";
            var indicDp = this.getDataProvider(indicDpName);
            if (indicDp === undefined || !_util.Util.isInstance(indicDp, data_providers.IndicatorDataProvider)) return;
            this.removeDataProvider(indicDpName);
            this.removePlotter(indicDpName);
            this.getArea(areaName).setChanged(true);
        }
    }, {
        key: 'removeIndicator',
        value: function removeIndicator(areaName) {
            var area = this.getArea(areaName);
            if (area === undefined || area.getNameObject().getCompAt(2) === "main") return;
            var dp = this.getDataProvider(areaName + ".secondary");
            if (dp === undefined || !_util.Util.isInstance(dp, data_providers.IndicatorDataProvider)) return;
            var rangeAreaName = areaName + "Range";
            var rangeArea = this.getArea(rangeAreaName);
            if (rangeArea === undefined) return;
            var tableLayout = this.getArea(area.getDataSourceName() + ".charts");
            if (tableLayout === undefined) return;
            tableLayout.removeArea(area);
            this.removeArea(areaName);
            tableLayout.removeArea(rangeArea);
            this.removeArea(rangeAreaName);
            for (var n in this._dataProviders) {
                if (this._dataProviders[n].getAreaName() === areaName) this.removeDataProvider(n);
            }
            for (var _n10 in this._ranges) {
                if (this._ranges[_n10].getAreaName() === areaName) this.removeRange(_n10);
            }
            for (var _n11 in this._plotters) {
                if (this._plotters[_n11].getAreaName() === areaName) this.removePlotter(_n11);
            }
            for (var _n12 in this._plotters) {
                if (this._plotters[_n12].getAreaName() === rangeAreaName) this.removePlotter(_n12);
            }
        }
    }, {
        key: 'getIndicatorParameters',
        value: function getIndicatorParameters(indicName) {
            var indic = this._fakeIndicators[indicName];
            if (indic === undefined) {
                var ret = this.createIndicatorAndRange("", indicName);
                if (ret === null) return null;
                this._fakeIndicators[indicName] = indic = ret.indic;
            }
            var params = [];
            var i = void 0,
                cnt = indic.getParameterCount();
            for (i = 0; i < cnt; i++) {
                params.push(indic.getParameterAt(i));
            }return params;
        }
    }, {
        key: 'setIndicatorParameters',
        value: function setIndicatorParameters(indicName, params) {
            var n = void 0,
                indic = void 0;
            for (n in this._dataProviders) {
                var dp = this._dataProviders[n];
                if (_util.Util.isInstance(dp, data_providers.IndicatorDataProvider) === false) continue;
                indic = dp.getIndicator();
                if (indic.getName() === indicName) {
                    indic.setParameters(params);
                    dp.refresh();
                    this.getArea(dp.getAreaName()).setChanged(true);
                }
            }
            indic = this._fakeIndicators[indicName];
            if (indic === undefined) {
                var ret = this.createIndicatorAndRange("", indicName, true);
                if (ret === null) return;
                this._fakeIndicators[indicName] = indic = ret.indic;
            }
            indic.setParameters(params);
        }
    }, {
        key: 'getIndicatorAreaName',
        value: function getIndicatorAreaName(dsName, index) {
            var tableLayout = this.getArea(dsName + ".charts");
            var cnt = tableLayout.getAreaCount() >> 1;
            if (index < 0 || index >= cnt) return "";
            return tableLayout.getAreaAt(index << 1).getName();
        }
    }]);

    return ChartManager;
}();

ChartManager.DrawingTool = {
    Cursor: 0,
    CrossCursor: 1,
    DrawLines: 2,
    DrawFibRetrace: 3,
    DrawFibFans: 4,
    SegLine: 5,
    StraightLine: 6,
    ArrowLine: 7,
    RayLine: 8,
    HoriStraightLine: 9,
    HoriRayLine: 10,
    HoriSegLine: 11,
    VertiStraightLine: 12,
    PriceLine: 13,
    BiParallelLine: 14,
    BiParallelRayLine: 15,
    TriParallelLine: 16,
    BandLine: 17
};
ChartManager.created = false;
ChartManager.instance = null;
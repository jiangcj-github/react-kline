'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TemplateMeasuringHandler = exports.DefaultTemplate = exports.Template = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chart_manager = require('./chart_manager');

var _chart_settings = require('./chart_settings');

var _data_sources = require('./data_sources');

var data_sources = _interopRequireWildcard(_data_sources);

var _data_providers = require('./data_providers');

var data_providers = _interopRequireWildcard(_data_providers);

var _areas = require('./areas');

var areas = _interopRequireWildcard(_areas);

var _plotters = require('./plotters');

var plotters = _interopRequireWildcard(_plotters);

var _timeline = require('./timeline');

var _cname = require('./cname');

var _layouts = require('./layouts');

var layouts = _interopRequireWildcard(_layouts);

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

var _ranges = require('./ranges');

var ranges = _interopRequireWildcard(_ranges);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = exports.Template = function () {
    function Template() {
        _classCallCheck(this, Template);
    }

    _createClass(Template, null, [{
        key: 'createCandlestickDataSource',
        value: function createCandlestickDataSource(dsAlias) {
            return new data_sources.MainDataSource(dsAlias);
        }
    }, {
        key: 'createDataSource',
        value: function createDataSource(dsName, dsAlias, createFunc) {
            var mgr = _chart_manager.ChartManager.instance;
            if (mgr.getCachedDataSource(dsAlias) === null) mgr.setCachedDataSource(dsAlias, createFunc(dsAlias));
            mgr.setCurrentDataSource(dsName, dsAlias);
            mgr.updateData(dsName, null);
        }
    }, {
        key: 'createTableComps',
        value: function createTableComps(dsName) {
            this.createMainChartComps(dsName);
            this.createTimelineComps(dsName);
        }
    }, {
        key: 'createMainChartComps',
        value: function createMainChartComps(dsName) {
            var mgr = _chart_manager.ChartManager.instance;
            var tableLayout = mgr.getArea(dsName + ".charts");
            var areaName = dsName + ".main";
            var rangeAreaName = areaName + "Range";
            var area = new areas.MainArea(areaName);
            mgr.setArea(areaName, area);
            tableLayout.addArea(area);
            var rangeArea = new areas.MainRangeArea(rangeAreaName);
            mgr.setArea(rangeAreaName, rangeArea);
            tableLayout.addArea(rangeArea);
            var dp = new data_providers.MainDataProvider(areaName + ".main");
            mgr.setDataProvider(dp.getName(), dp);
            mgr.setMainIndicator(dsName, "MA");
            var range = new ranges.MainRange(areaName);
            mgr.setRange(range.getName(), range);
            range.setPaddingTop(28);
            range.setPaddingBottom(12);
            var plotter = new plotters.MainAreaBackgroundPlotter(areaName + ".background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.CGridPlotter(areaName + ".grid");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.CandlestickPlotter(areaName + ".main");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.MinMaxPlotter(areaName + ".decoration");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.MainInfoPlotter(areaName + ".info");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.SelectionPlotter(areaName + ".selection");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.CDynamicLinePlotter(areaName + ".tool");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.RangeAreaBackgroundPlotter(areaName + "Range.background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.COrderGraphPlotter(areaName + "Range.grid");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.RangePlotter(areaName + "Range.main");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.RangeSelectionPlotter(areaName + "Range.selection");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.LastClosePlotter(areaName + "Range.decoration");
            mgr.setPlotter(plotter.getName(), plotter);
        }
    }, {
        key: 'createIndicatorChartComps',
        value: function createIndicatorChartComps(dsName, indicName) {
            var mgr = _chart_manager.ChartManager.instance;
            var tableLayout = mgr.getArea(dsName + ".charts");
            var areaName = dsName + ".indic" + tableLayout.getNextRowId();
            var rangeAreaName = areaName + "Range";
            var area = new areas.IndicatorArea(areaName);
            mgr.setArea(areaName, area);
            tableLayout.addArea(area);
            var rowIndex = tableLayout.getAreaCount() >> 1;
            var heights = _chart_settings.ChartSettings.get().charts.areaHeight;
            if (heights.length > rowIndex) {
                var a = void 0,
                    i = void 0;
                for (i = 0; i < rowIndex; i++) {
                    a = tableLayout.getAreaAt(i << 1);
                    a.setTop(0);
                    a.setBottom(heights[i]);
                }
                area.setTop(0);
                area.setBottom(heights[rowIndex]);
            }
            var rangeArea = new areas.IndicatorRangeArea(rangeAreaName);
            mgr.setArea(rangeAreaName, rangeArea);
            tableLayout.addArea(rangeArea);
            var dp = new data_providers.IndicatorDataProvider(areaName + ".secondary");
            mgr.setDataProvider(dp.getName(), dp);
            if (mgr.setIndicator(areaName, indicName) === false) {
                mgr.removeIndicator(areaName);
                return;
            }
            var plotter = new plotters.MainAreaBackgroundPlotter(areaName + ".background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.CGridPlotter(areaName + ".grid");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.IndicatorPlotter(areaName + ".secondary");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.IndicatorInfoPlotter(areaName + ".info");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.SelectionPlotter(areaName + ".selection");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.RangeAreaBackgroundPlotter(areaName + "Range.background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.RangePlotter(areaName + "Range.main");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.RangeSelectionPlotter(areaName + "Range.selection");
            mgr.setPlotter(plotter.getName(), plotter);
        }
    }, {
        key: 'createTimelineComps',
        value: function createTimelineComps(dsName) {
            var mgr = _chart_manager.ChartManager.instance;
            var plotter = void 0;
            var timeline = new _timeline.Timeline(dsName);
            mgr.setTimeline(timeline.getName(), timeline);
            plotter = new plotters.TimelineAreaBackgroundPlotter(dsName + ".timeline.background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.TimelinePlotter(dsName + ".timeline.main");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.TimelineSelectionPlotter(dsName + ".timeline.selection");
            mgr.setPlotter(plotter.getName(), plotter);
        }
    }, {
        key: 'createLiveOrderComps',
        value: function createLiveOrderComps(dsName) {
            var mgr = _chart_manager.ChartManager.instance;
            var plotter = void 0;
            plotter = new plotters.BackgroundPlotter(dsName + ".main.background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.CLiveOrderPlotter(dsName + ".main.main");
            mgr.setPlotter(plotter.getName(), plotter);
        }
    }, {
        key: 'createLiveTradeComps',
        value: function createLiveTradeComps(dsName) {
            var mgr = _chart_manager.ChartManager.instance;
            var plotter = void 0;
            plotter = new plotters.BackgroundPlotter(dsName + ".main.background");
            mgr.setPlotter(plotter.getName(), plotter);
            plotter = new plotters.CLiveTradePlotter(dsName + ".main.main");
            mgr.setPlotter(plotter.getName(), plotter);
        }
    }]);

    return Template;
}();

var DefaultTemplate = exports.DefaultTemplate = function (_Template) {
    _inherits(DefaultTemplate, _Template);

    function DefaultTemplate() {
        _classCallCheck(this, DefaultTemplate);

        return _possibleConstructorReturn(this, (DefaultTemplate.__proto__ || Object.getPrototypeOf(DefaultTemplate)).apply(this, arguments));
    }

    _createClass(DefaultTemplate, null, [{
        key: 'loadTemplate',
        value: function loadTemplate(dsName, dsAlias) {
            var mgr = _chart_manager.ChartManager.instance;
            var settings = _chart_settings.ChartSettings.get();
            var frameName = new _cname.CName(dsName).getCompAt(0);
            mgr.unloadTemplate(frameName);
            this.createDataSource(dsName, dsAlias, this.createCandlestickDataSource);
            var frame = new layouts.DockableLayout(frameName);
            mgr.setFrame(frame.getName(), frame);
            mgr.setArea(frame.getName(), frame);
            frame.setGridColor(themes.Theme.Color.Grid1);
            var area = new areas.TimelineArea(dsName + ".timeline");
            mgr.setArea(area.getName(), area);
            frame.addArea(area);
            area.setDockStyle(areas.ChartArea.DockStyle.Bottom);
            area.Measuring.addHandler(area, TemplateMeasuringHandler.onMeasuring);
            var tableLayout = new layouts.TableLayout(dsName + ".charts");
            mgr.setArea(tableLayout.getName(), tableLayout);
            tableLayout.setDockStyle(areas.ChartArea.DockStyle.Fill);
            frame.addArea(tableLayout);
            this.createTableComps(dsName);
            mgr.setThemeName(frameName, settings.theme);
            return mgr;
        }
    }]);

    return DefaultTemplate;
}(Template);

var TemplateMeasuringHandler = exports.TemplateMeasuringHandler = function () {
    function TemplateMeasuringHandler() {
        _classCallCheck(this, TemplateMeasuringHandler);
    }

    _createClass(TemplateMeasuringHandler, null, [{
        key: 'onMeasuring',
        value: function onMeasuring(sender, args) {
            var width = args.Width;
            var height = args.Height;
            var areaName = sender.getNameObject().getCompAt(2);
            if (areaName === "timeline") {
                sender.setMeasuredDimension(width, 22);
            }
        }
    }]);

    return TemplateMeasuringHandler;
}();
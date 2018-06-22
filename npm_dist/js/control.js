'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Control = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kline = require('./kline');

var _kline2 = _interopRequireDefault(_kline);

var _chart_manager = require('./chart_manager');

var _chart_settings = require('./chart_settings');

var _templates = require('./templates');

var _mevent = require('./mevent');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = exports.Control = function () {
    function Control() {
        _classCallCheck(this, Control);
    }

    _createClass(Control, null, [{
        key: 'refreshFunction',
        value: function refreshFunction() {
            Control.refreshCounter++;
            var lang = _chart_manager.ChartManager.instance.getLanguage();
            if (Control.refreshCounter > 3600) {
                var num = Number(Control.refreshCounter / 3600);
                if (lang === "en-us") {
                    (0, _jquery2.default)("#chart_updated_time_text").html(num.toFixed(0) + "h");
                } else if (lang === "zh-tw") {
                    (0, _jquery2.default)("#chart_updated_time_text").html(num.toFixed(0) + "小時");
                } else {
                    (0, _jquery2.default)("#chart_updated_time_text").html(num.toFixed(0) + "小时");
                }
            } else if (Control.refreshCounter > 60 && Control.refreshCounter <= 3600) {
                var _num = Number(Control.refreshCounter / 60);
                if (lang === "en-us") {
                    (0, _jquery2.default)("#chart_updated_time_text").html(_num.toFixed(0) + "m");
                } else if (lang === "zh-tw") {
                    (0, _jquery2.default)("#chart_updated_time_text").html(_num.toFixed(0) + "分鐘");
                } else {
                    (0, _jquery2.default)("#chart_updated_time_text").html(_num.toFixed(0) + "分钟");
                }
            } else if (Control.refreshCounter <= 60) {
                if (lang === "en-us") {
                    (0, _jquery2.default)("#chart_updated_time_text").html(Control.refreshCounter + "s");
                } else {
                    (0, _jquery2.default)("#chart_updated_time_text").html(Control.refreshCounter + "秒");
                }
            }
        }
    }, {
        key: 'clearRefreshCounter',
        value: function clearRefreshCounter() {
            window.clearInterval(Control.refreshHandler);
            Control.refreshCounter = 0;
            var lang = _chart_manager.ChartManager.instance.getLanguage();
            if (lang === "en-us") {
                (0, _jquery2.default)("#chart_updated_time_text").html(Control.refreshCounter + "s");
            } else {
                (0, _jquery2.default)("#chart_updated_time_text").html(Control.refreshCounter + "秒");
            }
            Control.refreshHandler = setInterval(Control.refreshFunction, _kline2.default.instance.intervalTime);
        }
    }, {
        key: 'requestData',
        value: function requestData(showLoading) {
            window.clearTimeout(_kline2.default.instance.timer);
            if (showLoading === true) {
                (0, _jquery2.default)("#chart_loading").addClass("activated");
            }
            _kline2.default.instance.onRequestDataFunc(_kline2.default.instance.requestParam, function (res) {
                if (res && res.success) {
                    Control.requestSuccessHandler(res);
                } else {
                    if (_kline2.default.instance.debug) {
                        console.log(res);
                    }
                    _kline2.default.instance.timer = setTimeout(function () {
                        Control.requestData(true);
                    }, _kline2.default.instance.intervalTime);
                }
            });
        }
    }, {
        key: 'requestSuccessHandler',
        value: function requestSuccessHandler(res) {
            if (_kline2.default.instance.debug) {
                console.log(res);
            }
            (0, _jquery2.default)("#chart_loading").removeClass("activated");

            var chart = _chart_manager.ChartManager.instance.getChart();
            chart.setTitle();
            _kline2.default.instance.data = eval(res.data);

            var updateDataRes = _kline2.default.instance.chartMgr.updateData("frame0.k0", _kline2.default.instance.data.lines);
            _kline2.default.instance.requestParam = Control.setHttpRequestParam(_kline2.default.instance.symbol, _kline2.default.instance.range, null, _kline2.default.instance.chartMgr.getDataSource("frame0.k0").getLastDate());

            var intervalTime = _kline2.default.instance.intervalTime < _kline2.default.instance.range ? _kline2.default.instance.intervalTime : _kline2.default.instance.range;

            if (!updateDataRes) {
                _kline2.default.instance.timer = setTimeout(Control.requestData, intervalTime);
                return;
            }

            var tmp = _chart_settings.ChartSettings.get();
            //画深度图
            if (_kline2.default.instance.data.depths && tmp.charts.depthStatus === "open") {
                _chart_manager.ChartManager.instance.getChart().updateDepth(_kline2.default.instance.data.depths);
            }
            Control.clearRefreshCounter();

            _kline2.default.instance.timer = setTimeout(Control.TwoSecondThread, intervalTime);
            _chart_manager.ChartManager.instance.redraw('All', false);
        }
    }, {
        key: 'TwoSecondThread',
        value: function TwoSecondThread() {
            var f = _kline2.default.instance.chartMgr.getDataSource("frame0.k0").getLastDate();
            if (f === -1) {
                _kline2.default.instance.requestParam = Control.setHttpRequestParam(_kline2.default.instance.symbol, _kline2.default.instance.range, _kline2.default.instance.limit, null);
            } else {
                _kline2.default.instance.requestParam = Control.setHttpRequestParam(_kline2.default.instance.symbol, _kline2.default.instance.range, null, f.toString());
            }
            Control.requestData();
        }
    }, {
        key: 'readCookie',
        value: function readCookie() {
            _chart_settings.ChartSettings.get();
            _chart_settings.ChartSettings.save();
            var tmp = _chart_settings.ChartSettings.get();
            // 主图样式
            var chart_style = (0, _jquery2.default)('#chart_select_chart_style');
            chart_style.find('a').each(function () {
                if ((0, _jquery2.default)(this)[0].innerHTML === tmp.charts.chartStyle) {
                    (0, _jquery2.default)(this).addClass('selected');
                }
            });
            _chart_manager.ChartManager.instance.setChartStyle('frame0.k0', tmp.charts.chartStyle);
            // 交易品种
            var symbol = tmp.charts.symbol;
            if (!_kline2.default.instance.init) {
                symbol = _kline2.default.instance.symbol;
                _kline2.default.instance.init = true;
            }
            _kline2.default.instance.symbol = symbol;
            Control.switchSymbolSelected(symbol);
            // 周期
            var period = tmp.charts.period;
            (0, _jquery2.default)('#chart_period_' + period + '_v a').addClass('selected');
            (0, _jquery2.default)('#chart_period_' + period + '_h a').addClass('selected');
            Control.switchPeriod(period);
            // 技术指标
            if (tmp.charts.indicsStatus === 'close') {
                Control.switchIndic('off');
            } else if (tmp.charts.indicsStatus === 'open') {
                Control.switchIndic('on');
            }
            // 主指标
            var mainIndic = (0, _jquery2.default)('#chart_select_main_indicator');
            mainIndic.find('a').each(function () {
                if ((0, _jquery2.default)(this).attr('name') === tmp.charts.mIndic) {
                    (0, _jquery2.default)(this).addClass('selected');
                }
            });
            _chart_manager.ChartManager.instance.getChart().setMainIndicator(tmp.charts.mIndic);
            // 主题
            _chart_manager.ChartManager.instance.setThemeName('frame0', tmp.theme);
            // 画图工具
            Control.switchTools('off');
            if (tmp.theme === 'Dark') {
                Control.switchTheme('dark');
            } else if (tmp.theme === 'Light') {
                Control.switchTheme('light');
            }
            // 语言
            Control.chartSwitchLanguage(tmp.language || "zh-cn");
            // 深度图
            if (tmp.charts.depthStatus === "close") {
                Control.switchDepth("off");
            } else if (tmp.charts.depthStatus === "open") {
                Control.switchDepth("on");
            }
        }
    }, {
        key: 'setHttpRequestParam',
        value: function setHttpRequestParam(symbol, range, limit, since) {
            return {
                symbol: symbol,
                range: range,
                limit: limit,
                since: since
            };
        }
    }, {
        key: 'refreshTemplate',
        value: function refreshTemplate() {
            _kline2.default.instance.chartMgr = _templates.DefaultTemplate.loadTemplate("frame0.k0", "");
            _chart_manager.ChartManager.instance.redraw('All', true);
        }
    }, {
        key: 'chartSwitchLanguage',
        value: function chartSwitchLanguage(lang) {
            var langTmp = lang.replace(/-/, '_');
            (0, _jquery2.default)('#chart_language_switch_tmp').find('span').each(function () {
                var name = (0, _jquery2.default)(this).attr('name');
                var attr = (0, _jquery2.default)(this).attr(langTmp);
                name = '.' + name;
                var obj = (0, _jquery2.default)(name)[0];

                if (!obj) return;
                (0, _jquery2.default)(name).each(function () {

                    (0, _jquery2.default)(this)[0].innerHTML = attr;
                });
            });
            (0, _jquery2.default)("#chart_language_setting_div li a[name='" + lang + "']").addClass("selected");
            _chart_manager.ChartManager.instance.setLanguage(lang);
            _chart_manager.ChartManager.instance.getChart().setTitle();
            var tmp = _chart_settings.ChartSettings.get();
            tmp.language = lang;
            _chart_settings.ChartSettings.save();
            _kline2.default.instance.onLangChangeFunc(lang);
        }
    }, {
        key: 'onSize',
        value: function onSize(w, h) {
            var width = w || window.innerWidth;
            var chartWidth = width;
            var height = h || window.innerHeight;
            var container = (0, _jquery2.default)(_kline2.default.instance.element);
            container.css({
                width: width + 'px',
                height: height + 'px'
            });
            var toolBar = (0, _jquery2.default)('#chart_toolbar');
            var toolPanel = (0, _jquery2.default)('#chart_toolpanel');
            var canvasGroup = (0, _jquery2.default)('#chart_canvasGroup');
            var tabBar = (0, _jquery2.default)('#chart_tabbar');
            var toolPanelShown = toolPanel[0].style.display !== 'inline' ? false : true;
            var tabBarShown = tabBar[0].style.display !== 'block' ? false : true;
            var toolBarRect = {};
            toolBarRect.x = 0;
            toolBarRect.y = 0;
            toolBarRect.w = chartWidth;
            toolBarRect.h = 29;
            var toolPanelRect = {};
            toolPanelRect.x = 0;
            toolPanelRect.y = toolBarRect.h + 1;
            toolPanelRect.w = toolPanelShown ? 32 : 0;
            toolPanelRect.h = height - toolPanelRect.y;
            var tabBarRect = {};
            tabBarRect.w = toolPanelShown ? chartWidth - (toolPanelRect.w + 1) : chartWidth;
            tabBarRect.h = tabBarShown ? 22 : -1;
            tabBarRect.x = chartWidth - tabBarRect.w;
            tabBarRect.y = height - (tabBarRect.h + 1);
            var canvasGroupRect = {};
            canvasGroupRect.x = tabBarRect.x;
            canvasGroupRect.y = toolPanelRect.y;
            canvasGroupRect.w = tabBarRect.w;
            canvasGroupRect.h = tabBarRect.y - toolPanelRect.y;
            toolBar.css({
                left: toolBarRect.x + 'px',
                top: toolBarRect.y + 'px',
                width: toolBarRect.w + 'px',
                height: toolBarRect.h + 'px'
            });
            if (toolPanelShown) {
                toolPanel.css({
                    left: toolPanelRect.x + 'px',
                    top: toolPanelRect.y + 'px',
                    width: toolPanelRect.w + 'px',
                    height: toolPanelRect.h + 'px'
                });
            }

            canvasGroup.css({
                left: canvasGroupRect.x + 'px',
                top: canvasGroupRect.y + 'px',
                // width: canvasGroupRect.w + 'px',
                height: canvasGroupRect.h + 'px'
            });
            var mainCanvas = (0, _jquery2.default)('#chart_mainCanvas')[0];
            var overlayCanvas = (0, _jquery2.default)('#chart_overlayCanvas')[0];
            mainCanvas.width = canvasGroupRect.w;
            mainCanvas.height = canvasGroupRect.h;
            overlayCanvas.width = canvasGroupRect.w;
            overlayCanvas.height = canvasGroupRect.h;
            if (tabBarShown) {
                tabBar.css({
                    left: tabBarRect.x + 'px',
                    top: tabBarRect.y + 'px',
                    width: tabBarRect.w + 'px',
                    height: tabBarRect.h + 'px'
                });
            }
            var dlgSettings = (0, _jquery2.default)("#chart_parameter_settings");
            dlgSettings.css({
                left: chartWidth - dlgSettings.width() >> 1,
                top: height - dlgSettings.height() >> 1
            });
            var dlgLoading = (0, _jquery2.default)("#chart_loading");
            dlgLoading.css({
                left: chartWidth - dlgLoading.width() >> 1,
                top: height - dlgLoading.height() >> 2
            });
            var domElemCache = (0, _jquery2.default)('#chart_dom_elem_cache');
            var rowTheme = (0, _jquery2.default)('#chart_select_theme')[0];
            var rowTools = (0, _jquery2.default)('#chart_enable_tools')[0];
            var rowIndic = (0, _jquery2.default)('#chart_enable_indicator')[0];
            var symbolTitle = (0, _jquery2.default)("#symbol_title")[0];
            var periodsVert = (0, _jquery2.default)('#chart_toolbar_periods_vert');
            var periodsHorz = (0, _jquery2.default)('#chart_toolbar_periods_horz')[0];
            var showIndic = (0, _jquery2.default)('#chart_show_indicator')[0];
            var showTools = (0, _jquery2.default)('#chart_show_tools')[0];
            var selectTheme = (0, _jquery2.default)('#chart_toolbar_theme')[0];
            var dropDownSettings = (0, _jquery2.default)('#chart_dropdown_settings');
            var periodsVertNW = symbolTitle.offsetWidth + periodsVert[0].offsetWidth;
            var periodsHorzNW = periodsVertNW + periodsHorz.offsetWidth;
            var showIndicNW = periodsHorzNW + showIndic.offsetWidth + 4;
            var showToolsNW = showIndicNW + showTools.offsetWidth + 4;
            var selectThemeNW = showToolsNW + selectTheme.offsetWidth;
            var dropDownSettingsW = dropDownSettings.find(".chart_dropdown_t")[0].offsetWidth + 250;
            periodsVertNW += dropDownSettingsW;
            periodsHorzNW += dropDownSettingsW;
            showIndicNW += dropDownSettingsW;
            showToolsNW += dropDownSettingsW;
            selectThemeNW += dropDownSettingsW;
            if (chartWidth < periodsHorzNW) {
                domElemCache.append(periodsHorz);
            } else {
                periodsVert.after(periodsHorz);
            }
            if (chartWidth < showIndicNW) {
                domElemCache.append(showIndic);
                rowIndic.style.display = "";
            } else {
                dropDownSettings.before(showIndic);
                rowIndic.style.display = "none";
            }
            if (chartWidth < showToolsNW) {
                domElemCache.append(showTools);
                rowTools.style.display = "";
            } else {
                dropDownSettings.before(showTools);
                rowTools.style.display = "none";
            }
            if (chartWidth < selectThemeNW) {
                domElemCache.append(selectTheme);
                rowTheme.style.display = "";
            } else {
                dropDownSettings.before(selectTheme);
                rowTheme.style.display = "none";
            }

            _chart_manager.ChartManager.instance.redraw('All', true);
            _kline2.default.instance.onResizeFunc(width, height);
        }
    }, {
        key: 'mouseWheel',
        value: function mouseWheel(e, delta) {
            _chart_manager.ChartManager.instance.scale(delta > 0 ? 1 : -1);
            _chart_manager.ChartManager.instance.redraw("All", true);
            return false;
        }
    }, {
        key: 'switchTheme',
        value: function switchTheme(name) {
            (0, _jquery2.default)('#chart_toolbar_theme a').removeClass('selected');
            (0, _jquery2.default)('#chart_select_theme a').removeClass('selected');
            (0, _jquery2.default)('#chart_toolbar_theme').find('a').each(function () {
                if ((0, _jquery2.default)(this).attr('name') === name) {
                    (0, _jquery2.default)(this).addClass('selected');
                }
            });
            (0, _jquery2.default)('#chart_select_theme a').each(function () {
                if ((0, _jquery2.default)(this).attr('name') === name) {
                    (0, _jquery2.default)(this).addClass('selected');
                }
            });
            (0, _jquery2.default)(".chart_container").attr('class', "chart_container " + name);
            (0, _jquery2.default)(".marketName_ a").attr('class', name);

            if (name === 'dark') {
                (0, _jquery2.default)(".trade_container").addClass("dark").removeClass("light");
                _chart_manager.ChartManager.instance.setThemeName('frame0', 'Dark');
                var tmp = _chart_settings.ChartSettings.get();
                tmp.theme = 'Dark';
                _chart_settings.ChartSettings.save();
            } else if (name === 'light') {
                (0, _jquery2.default)(".trade_container").addClass("light").removeClass("dark");
                _chart_manager.ChartManager.instance.setThemeName('frame0', 'Light');
                var _tmp = _chart_settings.ChartSettings.get();
                _tmp.theme = 'Light';
                _chart_settings.ChartSettings.save();
            }
            var a = {};
            a.command = "set current themes";
            a.content = name;
            (0, _jquery2.default)('#chart_output_interface_text').val(JSON.stringify(a));
            (0, _jquery2.default)('#chart_output_interface_submit').submit();
            new _mevent.MEvent().raise(name);
            _chart_manager.ChartManager.instance.redraw();

            _kline2.default.instance.onThemeChangeFunc(name);
        }
    }, {
        key: 'switchTools',
        value: function switchTools(name) {
            (0, _jquery2.default)(".chart_dropdown_data").removeClass("chart_dropdown-hover");
            (0, _jquery2.default)("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
            (0, _jquery2.default)('#chart_enable_tools a').removeClass('selected');
            if (name === 'on') {
                (0, _jquery2.default)('#chart_show_tools').addClass('selected');
                (0, _jquery2.default)('#chart_enable_tools a').each(function () {
                    if ((0, _jquery2.default)(this).attr('name') === 'on') {
                        (0, _jquery2.default)(this).addClass('selected');
                    }
                });
                (0, _jquery2.default)('#chart_toolpanel')[0].style.display = 'inline';
                if (_chart_manager.ChartManager.instance._drawingTool === _chart_manager.ChartManager.DrawingTool.Cursor) {
                    (0, _jquery2.default)('#chart_Cursor').parent().addClass('selected');
                } else if (_chart_manager.ChartManager.instance._drawingTool === _chart_manager.ChartManager.DrawingTool.CrossCursor) {
                    (0, _jquery2.default)('#chart_CrossCursor').parent().addClass('selected');
                }
            } else if (name === 'off') {
                (0, _jquery2.default)('#chart_show_tools').removeClass('selected');
                (0, _jquery2.default)('#chart_enable_tools a').each(function () {
                    if ((0, _jquery2.default)(this).attr('name') === 'off') {
                        (0, _jquery2.default)(this).addClass('selected');
                    }
                });
                (0, _jquery2.default)('#chart_toolpanel')[0].style.display = 'none';
                _chart_manager.ChartManager.instance.setRunningMode(_chart_manager.ChartManager.instance._beforeDrawingTool);
                _chart_manager.ChartManager.instance.redraw("All", true);
            }
            if (_kline2.default.instance.isSized) {
                Control.onSize();
            } else {
                Control.onSize(_kline2.default.instance.width, _kline2.default.instance.height);
            }
        }
    }, {
        key: 'switchIndic',
        value: function switchIndic(name) {
            (0, _jquery2.default)('#chart_enable_indicator a').removeClass('selected');
            (0, _jquery2.default)("#chart_enable_indicator a[name='" + name + "']").addClass('selected');
            if (name === 'on') {
                (0, _jquery2.default)('#chart_show_indicator').addClass('selected');
                var tmp = _chart_settings.ChartSettings.get();
                tmp.charts.indicsStatus = 'open';
                _chart_settings.ChartSettings.save();
                var value = tmp.charts.indics[1];
                /*
                if (Template.displayVolume === false)
                    ChartManager.instance.getChart().setIndicator(2, value);
                else
                    ChartManager.instance.getChart().setIndicator(2, value);
                */
                _chart_manager.ChartManager.instance.getChart().setIndicator(1, value);
                (0, _jquery2.default)("#chart_tabbar").find('a').each(function () {
                    if ((0, _jquery2.default)(this).attr('name') === value) (0, _jquery2.default)(this).addClass('selected');
                });
                (0, _jquery2.default)('#chart_tabbar')[0].style.display = 'block';
            } else if (name === 'off') {
                (0, _jquery2.default)('#chart_show_indicator').removeClass('selected');
                _chart_manager.ChartManager.instance.getChart().setIndicator(2, 'NONE');
                var _tmp2 = _chart_settings.ChartSettings.get();
                _tmp2.charts.indicsStatus = 'close';
                _chart_settings.ChartSettings.save();
                (0, _jquery2.default)('#chart_tabbar')[0].style.display = 'none';
                (0, _jquery2.default)("#chart_tabbar a").removeClass("selected");
            }
            if (_kline2.default.instance.isSized) {
                Control.onSize();
            } else {
                Control.onSize(_kline2.default.instance.width, _kline2.default.instance.height);
            }
        }
    }, {
        key: 'switchPeriod',
        value: function switchPeriod(name) {
            (0, _jquery2.default)(".chart_container .chart_toolbar_tabgroup a").removeClass("selected");
            (0, _jquery2.default)("#chart_toolbar_periods_vert ul a").removeClass("selected");
            (0, _jquery2.default)(".chart_container .chart_toolbar_tabgroup a").each(function () {
                if ((0, _jquery2.default)(this).parent().attr('name') === name) {
                    (0, _jquery2.default)(this).addClass('selected');
                }
            });
            (0, _jquery2.default)("#chart_toolbar_periods_vert ul a").each(function () {
                if ((0, _jquery2.default)(this).parent().attr('name') === name) {
                    (0, _jquery2.default)(this).addClass('selected');
                }
            });
            _chart_manager.ChartManager.instance.showCursor();
            Control.calcPeriodWeight(name);
            if (name === 'line') {
                _chart_manager.ChartManager.instance.getChart().strIsLine = true;
                _chart_manager.ChartManager.instance.setChartStyle('frame0.k0', 'Line');
                _chart_manager.ChartManager.instance.getChart().setCurrentPeriod('line');
                var _settings = _chart_settings.ChartSettings.get();
                _settings.charts.period = name;
                _chart_settings.ChartSettings.save();
                return;
            }
            _chart_manager.ChartManager.instance.getChart().strIsLine = false;
            var p = _kline2.default.instance.tagMapPeriod[name];
            _chart_manager.ChartManager.instance.setChartStyle('frame0.k0', _chart_settings.ChartSettings.get().charts.chartStyle);
            _chart_manager.ChartManager.instance.getChart().setCurrentPeriod(p);
            var settings = _chart_settings.ChartSettings.get();
            settings.charts.period = name;
            _chart_settings.ChartSettings.save();
        }
    }, {
        key: 'switchDepth',
        value: function switchDepth(name) {
            var tmp = _chart_settings.ChartSettings.get();
            if (name === "on") {
                tmp.charts.depthStatus = "open";
                (0, _jquery2.default)("#chart_show_depth").addClass("selected");
                _chart_manager.ChartManager.instance.getChart().updateDepth(_kline2.default.instance.data.depths);
            } else if (name === "off") {
                tmp.charts.depthStatus = "close";
                (0, _jquery2.default)("#chart_show_depth").removeClass("selected");
                _chart_manager.ChartManager.instance.getChart().updateDepth(null);
            }
            _chart_settings.ChartSettings.save();
        }
    }, {
        key: 'reset',
        value: function reset(symbol) {
            _kline2.default.instance.symbol = symbol;
        }
    }, {
        key: 'switchSymbolSelected',
        value: function switchSymbolSelected(symbol, symbolName) {
            Control.reset(symbol);
            (0, _jquery2.default)(".symbol-title").text(symbolName);
            _chart_manager.ChartManager.instance.getChart()._symbol = symbol;
            var settings = _chart_settings.ChartSettings.get();
            settings.charts.symbol = symbol;
            _chart_settings.ChartSettings.save();
        }
    }, {
        key: 'switchSymbol',
        value: function switchSymbol(symbol, symbolName) {
            if (_kline2.default.instance.type === "stomp" && _kline2.default.instance.stompClient.ws.readyState === 1) {
                _kline2.default.instance.subscribed.unsubscribe();
                _kline2.default.instance.subscribed = _kline2.default.instance.stompClient.subscribe(_kline2.default.instance.subscribePath + '/' + symbol + '/' + _kline2.default.instance.range, Control.subscribeCallback);
            }
            Control.switchSymbolSelected(symbol, symbolName);
            var settings = _chart_settings.ChartSettings.get();
            if (settings.charts.period === "line") {
                _chart_manager.ChartManager.instance.getChart().strIsLine = true;
                _chart_manager.ChartManager.instance.setChartStyle('frame0.k0', 'Line');
            } else {
                _chart_manager.ChartManager.instance.getChart().strIsLine = false;
                _chart_manager.ChartManager.instance.setChartStyle('frame0.k0', _chart_settings.ChartSettings.get().charts.chartStyle);
            }
            _chart_manager.ChartManager.instance.getChart().setSymbol(symbol);
        }
    }, {
        key: 'calcPeriodWeight',
        value: function calcPeriodWeight(period) {
            var index = period;
            if (period !== 'line') index = _kline2.default.instance.periodMap[_kline2.default.instance.tagMapPeriod[period]];
            var periodWeight = _chart_settings.ChartSettings.get().charts.period_weight;
            for (var i in periodWeight) {
                if (periodWeight[i] > periodWeight[index]) {
                    periodWeight[i] -= 1;
                }
            }
            periodWeight[index] = 8;
            _chart_settings.ChartSettings.save();
        }
    }]);

    return Control;
}();

Control.refreshCounter = 0;
Control.refreshHandler = null;
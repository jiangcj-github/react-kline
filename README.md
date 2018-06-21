# Kline     [![npm version](https://badge.fury.io/js/kline.svg)](https://badge.fury.io/js/kline)

[![NPM](https://nodei.co/npm/kline.png)](https://www.npmjs.com/package/react-kline)

> 本项目在原有的kline项目上做了一些修改，最大限度减小代码体积，提供了一个轻量级的K线图解决方案:

* 原项目github地址为：[Kline](https://github.com/chxj1992/kline)
* 去除firebase相关依赖
* css样式改由<link>标签引入
* 去除sockjs相关依赖
* 核心代码kline.min.js大小为264K，gzip压缩后46K

### 演示地址

* [Demo](https://lindakai2016.github.io/react-kline/index.html)

### Features

    ✅ 支持两种主题配色切换 
    ✅ 支持简体中文,英文,繁体中文三种语言 
    ✅ 可配置的时间聚合方式
    ✅ 支持多种画线工具
    ✅ 支持多种画图算法
    ✅ 支持深度图数据及最近成交数据展示
    ✅ 支持普通轮询和Websocket Over Stomp两种连接方式

### ScreenShot!

![](screen_small.png)

![](screen_large.png)

### Requirements

* jquery
* jquery.mousewheel
* stomp (仅stomp方式需要)

### Install & Load

下载及编译

```bash
$ git clone https://github.com/lindakai2016/Kline.git
$ cd Kline
$ npm install
$ npm run build
```

* 使用标签引入, 在HTML页面头部加入

```html
    <link href="../src/css/main.css" type="text/css" rel="stylesheet">
    <script src="/lib/stomp.js"></script>
    <script src="/lib/jquery-3.3.1.min.js"></script>
    <script src="/lib/jquery.mousewheel.js"></script>
    <script src="/dist/kline.min.js"></script>
```

* 在页面中加入

```html
  <div id="kline_container"></div>
```

### Examples

* Poll(轮询)

```javascript
    var kline = new Kline({
        element: "#kline_container",
        symbol: "BTC",
        symbolName: "比特币",
        type: "poll", // poll/stomp
        url: "http://127.0.0.1:8080/mock.json"
    });
    kline.draw();
```

* Stomp Over Websocket

```javascript
   var kline = new Kline({
        element: "#kline_container",
        symbol: "BTC",
        symbolName: "比特币",
        type: "stomp", // poll/stomp
        url: 'http://127.0.0.1:8088/socket',
        subscribePath: "/kline/subscribe",
        sendPath: "/kline/send"       
    });
    kline.draw();
```


### Support Options

| 参数名称   | 参数说明          |   默认值
|:---------|:-----------------|:------------
|`element` | 容器元素选择器     | #kline_container
|`width`   | 宽度 (px)         | 1200
|`height`   | 高度度 (px)      | 650
|`theme`   | 主题 dark(暗色)/light(亮色) | dark
|`language` | 语言 zh-cn(简体中文)/en-us(英文)/zh-tw(繁体中文) | zh-cn
|`ranges` | 聚合选项 1w/1d/12h/6h/4h/2h/1h/30m/15m/5m/3m/1m/line (w:周, d:天, h:小时, m:分钟, line:分时数据) | ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]
|`symbol` | 交易代号 | 
|`symbolName`  | 交易名称 | 
|`type`  | 连接类型 stomp/poll(轮询) |  poll
|`url`  | 请求地址 | 
|`limit`  | 分页大小 | 1000
|`intervalTime`  | 请求间隔时间(ms) | 3000
|`subscribePath`   | 订阅地址 (仅stomp方式需要) | 
|`sendPath`   | 发送地址 (仅stomp方式需要) | 
|`debug`   | 是否开启调试模式 true/false |  true
|`reverseColor`   | 是否反色, 默认绿涨红跌 true/false | false
|`stompClient`   | stomp 连接对象 | null
|`showDepth`   | 是否显示深度图 | false
|`depthWidth`   | 深度图宽度 | 最小50，小于50则取50，默认50


### Methods

* draw()

    画K线图

```javascript
kline.draw();
```

* resize(int width, int height)

    设置画布大小

```javascript
kline.resize(1200, 550);
```

* setSymbol(string symbol, string symbolName)

    设置交易品种

```javascript
kline.setSymbol('usd/btc', 'USD/BTC');
```

* setTheme(string style)

    设置主题

```javascript
kline.setTheme('dark');  // dark/light
```

* setLanguage(string lang)

    设置语言

```javascript
kline.setLanguage('en-us');  // en-us/zh-ch/zh-tw
```

* setIntervalTime: function (intervalTime) 

    设置请求间隔时间(ms)

```javascript
kline.setIntervalTime(5000); 
```

* Kline.setDepth: function(showDepth,depthWidth)

    设置深度图

```javascript
kline.setDepth(true,50);
```

* connect: function () 

    建立socket连接

```javascript
kline.connect(); 
```

* disconnect: function () 

    断开socket连接

```javascript
kline.disconnect(); 
```

* pause: function () 

    暂停请求数据

```javascript
kline.pause(); 
```

* resend: function () 

    重新请求数据

```javascript
kline.resend(); 
```

### Events

| 事件函数                 |   说明
|:-----------------------|:------------
| `onResize: function(width, height)`   | 画布尺寸改变时触发
| `onLangChange: function(lang)`   | 语言改变时触发
| `onSymbolChange: function(symbol, symbolName)`   | 交易品种改变时触发
| `onThemeChange: function(theme)`   | 主题改变时触发
| `onRangeChange: function(range)`   | 聚合时间改变时触发


> Example

```javascript
    var kline = new Kline({
        element: "#kline_container",
        symbol: "BTC",
        symbolName: "比特币",
        type: "poll", // poll/stomp
        url: "http://127.0.0.1:8080/mock.json",
        onResize: function(width, height) {
            console.log("chart resized: " + width + " " + height);
        }
    });
```


### Response

> Example

```json
{
  "success": true,
  "data": {
    "lines": [
      [
        1.50790476E12,
        99.30597249871,
        99.30597249871,
        99.30597249871,
        99.30597249871,
        66.9905449283
      ]
    ],
    "trades": [
      {
        "amount": 0.02,
        "price": 5798.79,
        "tid": 373015085,
        "time": 1508136949000,
        "type": "buy"
      }
    ],
    "depths": {
      "asks": [
        [
          500654.27,
          0.5
        ]
      ],
      "bids": [
        [
          5798.79,
          0.013
        ]
      ]
    }
  }
}
```

* 响应参数说明:

* `lines`: K线图, 依次是: 时间(ms), 开盘价, 最高价, 最低价, 收盘价, 成交量
* `depths`(可选, 行情侧边栏显示): 深度图数据,  `asks`:一定比例的卖单列表, `bids`:一定比例的买单列表, 其中每项的值依次是 成交价, 成交量
* `trades`(可选, 行情侧边栏显示, 功能已屏蔽): 最近成交记录,  `amount`: 成交量, `price`:单价, `tid`:订单ID, `time`:成交时间(ms), `type`:成交类型 buy/sell

import React from 'react';
import './css/main.css';
import Kline from './js/kline.js';

class ReactKline extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            props: props,
            kline: null,
        }
    }

    componentDidMount(){
        let cfg={
            element: "#kline_container",
            width: 600,
            height: 400,
            theme: 'dark', // light,dark
            language: 'zh-cn', // zh-cn,en-us,zh-tw
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: "BTC",
            symbolName: "BTC/USD",
            type: "poll", // poll,socket
            url: "http://127.0.0.1/mock.json",
            limit: 1000,
            intervalTime: 5000,
            debug: false,
            showDepth: false,
            depthWidth: 50,
        };
        Object.assign(cfg,this.state.props);
        this.state.kline = new Kline(cfg);
        this.state.kline.draw();
    }

    resize(w,h){
        this.state.kline.resize(w, h);
    }

    setSymbol(symbol,symbolName){
        this.state.kline.setSymbol(symbol,symbolName);
    }

    setTheme(style){
        this.state.kline.setTheme(style);
    }

    setLanguage(lang){
        this.state.kline.setLanguage(lang);
    }

    setIntervalTime(intervalTime){
        this.state.kline.setIntervalTime(intervalTime);
    }

    setDepth(showDepth,depthWidth){
        this.state.kline.setDepth(showDepth,depthWidth);
    }

    connect(){
        this.state.kline.connect();
    }

    disconnect(){
        this.state.kline.disconnect();
    }

    pause(){
        this.state.kline.pause();
    }

    resend(){
        this.state.kline.resend();
    }

    render() {
        return (
            <div id="kline_container"></div>
        );
    }

}

export default ReactKline;
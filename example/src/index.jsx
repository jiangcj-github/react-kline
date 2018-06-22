import React from 'react';
import ReactDOM from 'react-dom';
import ReactKline from '../../src';

class App extends React.Component {

    onRequestData(param,callback){
        callback();
    }

    render() {
        return (
            <ReactKline
                width={600}
                height={400}
                ranges={["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]}
                symbol={"BTC"}
                symbolName={"BTC/USD"}
                intervalTime={5000}
                depthWidth={100}
                onRequestData={this.onRequestData}
            />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
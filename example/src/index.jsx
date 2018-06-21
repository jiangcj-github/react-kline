import React from 'react';
import ReactDOM from 'react-dom';
import ReactKline from '../../src';

class App extends React.Component {
    render() {
        return (
            <ReactKline
                width={600}
                height={400}
                ranges={["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]}
                symbol={"BTC"}
                symbolName={"BTC/USD"}
                intervalTime={5000}
                showDepth={false}
                depthWidth={50}
                type={"poll"}
                url={"/example/src/mock.json"}
            />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
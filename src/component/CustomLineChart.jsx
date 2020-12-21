import React from "react";
import {Spinner} from "react-bootstrap";
import {CartesianGrid, Line, LineChart, Tooltip, Legend, XAxis, YAxis} from 'recharts';

export default class CustomLineChart extends React.Component {

    render() {
        if (this.props.chartData.length > 0) {
            const lines = this.props.labels.map(i => {return <Line key={i.label} type="monotone" dataKey={i.label} strokeWidth={3} stroke={i.color} yAxisId={0}/>})
            return <div className={"chart-wrapper"}>
                <h3 className={"chart-title"}>{this.props.title}</h3>
                <LineChart
                    width={window.innerWidth - 100}
                    height={400}
                    data={this.props.chartData}
                    margin={{top: 0, right: 30, left: 20, bottom: 0}}
                >
                    <XAxis dataKey={"date"} tick={{ fill: 'white' }} tickFormatter={o => new Date(o).toLocaleDateString()}/>
                    <YAxis yAxisId={0} tick={{ fill: 'white' }}/>
                    <Tooltip isAnimationActive={false} labelFormatter={(o) => new Date(o).toLocaleDateString()}/>
                    <Legend/>
                    <CartesianGrid stroke="#fff"/>
                    {lines}
                </LineChart>
            </div>
        } else {
            return <div className={"loading-wrapper"}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
    }
}
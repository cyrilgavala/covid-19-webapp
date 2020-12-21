import React from "react";
import {Spinner} from "react-bootstrap";
import {CartesianGrid, Bar, BarChart, Tooltip, Legend, XAxis, YAxis} from 'recharts';

export default class CustomBarChart extends React.Component {

    render() {
        if (this.props.chartData.length > 0) {
            const bars = this.props.labels.map(i => {return <Bar key={i.label} type="monotone" dataKey={i.label} fill={i.color} yAxisId={0}/>})
            return <div className={"chart-wrapper"}>
                <h3 className={"chart-title"}>{this.props.title}</h3>
                <BarChart
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
                    {bars}
                </BarChart>
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
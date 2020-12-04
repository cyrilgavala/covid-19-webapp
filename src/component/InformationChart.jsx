import React from "react";
import { LineChart } from 'react-charts-d3';

class InformationChart extends React.Component {

    render() {
        return <LineChart data={this.props.data} height={400} margin={{ top: 50, left: 50, bottom: 30, right: 50 }}
            axisConfig={{
                showXAxis: true,
                showXAxisLabel: false,
                xLabelPosition: 'right',
                showYAxis: true,
                showYAxisLabel: true,
                xLabel: 'Date',
                yLabel: this.props.yLabel,
                yLabelPosition: 'middle',
            }}/>;
    }
}

export default InformationChart;
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Spinner from "../component/Spinner";

export default function CustomLineChart(props) {

    const graphElements = props.labels.map((item, index) => {
        return <Line key={item.label + index} type="monotone" dataKey={item.label} strokeWidth={2} stroke={item.color}
                     yAxisId={index % 2 === 0 ? "left" : "right"} dot={false}/>
    })
    const yAxis = props.labels.map((item, index) => {
        return <YAxis key={index % 2 === 0 ? "left" : "right"} yAxisId={index % 2 === 0 ? "left" : "right"} tick={{fill: item.color}} width={30}
                      type={"number"} domain={['auto', 'dataMax+35']} orientation={index % 2 === 0 ? "left" : "right"} scale={"auto"}/>
    })

    if (props.data.length > 0) {
        return <div className={"chart-wrapper"}>
            <div className={"chart-title"}>{props.title}</div>
            <ResponsiveContainer>
                <LineChart width={window.innerWidth} height={400} data={props.data}
                           margin={{top: 20, right: 50, left: 50, bottom: 20}}>
                    <XAxis dataKey={"date"} tick={{fill: '#f3eae5'}}
                           tickFormatter={o => new Date(o).toLocaleDateString()} height={30}/>
                    <Tooltip isAnimationActive={false} cursor={{fill: 'transparent'}}
                             labelFormatter={(o) => new Date(o).toLocaleDateString()}/>
                    <Legend height={30} verticalAlign={"top"} iconType={"plainline"}/>
                    <CartesianGrid stroke="#f3eae5"/>
                    {yAxis}
                    {graphElements}
                </LineChart>
            </ResponsiveContainer>
        </div>
    } else {
        return <Spinner theme={"light"}/>
    }
}
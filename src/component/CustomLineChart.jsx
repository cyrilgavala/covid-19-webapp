import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export default function CustomLineChart(props) {

    const graphElements = props.labels.map((item, index) => {
        return <Line key={item.label + index} type="monotone" dataKey={item.label} strokeWidth={2} stroke={item.color}
                     yAxisId={index % 2 === 0 ? "left" : "right"} dot={false}/>
    })
    const yAxis = props.labels.map((item, index) => {
        return <YAxis key={index % 2 === 0 ? "left" : "right"} yAxisId={index % 2 === 0 ? "left" : "right"} tick={{fill: item.color}}
                      type={"number"} domain={['auto', 'dataMax+25']} orientation={index % 2 === 0 ? "left" : "right"} scale={"auto"}/>
    })

    return <div className={"chart-wrapper"}>
        <div className={"chart-title"}>{props.title}</div>
        <ResponsiveContainer minWidth={800}>
            <LineChart width={window.innerWidth - 100} height={300} data={props.data} margin={{top: 0, right: 50, left: 50, bottom: 0}}>
                <XAxis dataKey={"date"} tick={{fill: '#101726'}} tickFormatter={o => new Date(o).toLocaleDateString()}/>
                <Tooltip isAnimationActive={false} cursor={{fill: 'transparent'}} labelFormatter={(o) => new Date(o).toLocaleDateString()}/>
                <Legend height={30}/>)
                <CartesianGrid stroke="#101726"/>
                {yAxis}
                {graphElements}
            </LineChart>
        </ResponsiveContainer>
    </div>
}
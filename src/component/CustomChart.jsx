import {CartesianGrid, Bar, Line, BarChart, LineChart, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default function CustomChart(props) {

  let counter = 0
  let graph
  let graphElements
  const innerElements = []
  innerElements.push(<XAxis dataKey={"date"} tick={{fill: 'white'}} tickFormatter={o => new Date(o).toLocaleDateString()}/>)
  innerElements.push(<YAxis yAxisId={0} tick={{fill: 'white'}} type={"number"} domain={['auto', 'dataMax+25']}/>)
  innerElements.push(<Tooltip isAnimationActive={false} cursor={{fill: 'transparent'}} labelFormatter={(o) => new Date(o).toLocaleDateString()}/>)
  innerElements.push(<Legend/>)
  innerElements.push(<CartesianGrid stroke="#fff"/>)
  if ("bar" === props.type) {
    graphElements = props.labels.map(i => {
      return <Bar key={i.label + counter++} type="monotone" dataKey={i.label} fill={i.color} yAxisId={0}/>
    })
    graph = <BarChart width={window.innerWidth - 100} height={400} data={props.data} margin={{top: 0, right: 50, left: 20, bottom: 0}}>
      {innerElements}
      {graphElements}
    </BarChart>
  }
  if ("line" === props.type) {
    graphElements = props.labels.map(i => {
      return <Line key={i.label + counter++} type="monotone" dataKey={i.label} strokeWidth={3} stroke={i.color} yAxisId={0}/>
    })
    graph = <LineChart width={window.innerWidth - 100} height={400} data={props.data}
                       margin={{top: 0, right: 50, left: 20, bottom: 0}}>
      {innerElements}
      {graphElements}
    </LineChart>
  }
  return <div className={"chart-wrapper"}>
    <h3 className={"chart-title"}>{props.title}</h3>
    <ResponsiveContainer>
      {graph}
    </ResponsiveContainer>
  </div>
}
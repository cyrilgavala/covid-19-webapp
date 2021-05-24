import {CartesianGrid, Line,	LineChart, Tooltip,	Legend,	XAxis, YAxis,	ResponsiveContainer} from 'recharts';

export default function CustomLineChart(props) {

	let counter = 0
	let graphElements

	graphElements = props.labels.map(i => {
		return <Line key={i.label + counter++} type="monotone" dataKey={i.label} strokeWidth={3} stroke={i.color}
		             yAxisId={0}/>
	})

	return <div className={"chart-wrapper"}>
		<h3 className={"chart-title"}>{props.title}</h3>
		<ResponsiveContainer>
			<LineChart width={window.innerWidth - 100} height={400} data={props.data} margin={{top: 0, right: 50, left: 20, bottom: 0}}>
				<XAxis dataKey={"date"} tick={{fill: 'white'}} tickFormatter={o => new Date(o).toLocaleDateString()}/>
				<YAxis yAxisId={0} tick={{fill: 'white'}} type={"number"} domain={['auto', 'dataMax+25']}/>
				<Tooltip isAnimationActive={false} cursor={{fill: 'transparent'}} labelFormatter={(o) => new Date(o).toLocaleDateString()}/>
				<Legend/>)
				<CartesianGrid stroke="#fff"/>
				{graphElements}
			</LineChart>
		</ResponsiveContainer>
	</div>
}
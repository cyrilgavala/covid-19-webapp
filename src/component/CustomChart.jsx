import {Spinner} from "react-bootstrap";
import {CartesianGrid, Bar, Line, BarChart, LineChart, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import {useEffect, useState} from "react";
import axios from "axios";

const apiUrl = "https://covid-19-api.herokuapp.com/"

export default function CustomChart(props) {

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  async function loadSeriesData(suffix, range) {

    function calculateParams(range) {
      const endDate = new Date(), startDate = new Date();
      endDate.setUTCHours(0, 0, 0, 0);
      startDate.setUTCHours(0, 0, 0, 0);
      if ("all" === range) {
        return {
          startDate: new Date(2020, 10, 26).toISOString(),
          endDate: endDate.toISOString()
        }
      } else {
        startDate.setDate(startDate.getDate() - range);
        return {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      }
    }

    setLoading(false)
    return axios.get(apiUrl + 'series/' + suffix, {params: calculateParams(range)});
  }

  useEffect(() => {
    const loadData = async () => {
      await loadSeriesData(props.querySuffix, props.range).then(res => setData(res.data))
      return "Statistics of " + props.querySuffix + " loaded"
    }
    loadData().then(r => console.log(r))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoading) {
    let graph
    let graphElements
    const innerElements = []
    innerElements.push(<XAxis dataKey={"date"} tick={{fill: 'white'}} tickFormatter={o => new Date(o).toLocaleDateString()}/>)
    innerElements.push(<YAxis yAxisId={0} tick={{fill: 'white'}} type={"number"} domain={['auto', 'dataMax+30']} allowDataOverflow/>)
    innerElements.push(<Tooltip isAnimationActive={false} cursor={{fill: 'transparent'}} labelFormatter={(o) => new Date(o).toLocaleDateString()}/>)
    innerElements.push(<Legend/>)
    innerElements.push(<CartesianGrid stroke="#fff"/>)
    if ("bar" === props.type) {
      graphElements = props.labels.map(i => {
        return <Bar key={i.label} type="monotone" dataKey={i.label} fill={i.color} yAxisId={0}/>
      })
      graph = <BarChart width={window.innerWidth - 100} height={400} data={data}
                        margin={{top: 0, right: 50, left: 20, bottom: 0}}>
        {innerElements}
        {graphElements}
      </BarChart>
    }
    if ("line" === props.type) {
      graphElements = props.labels.map(i => {
        return <Line key={i.label} type="monotone" dataKey={i.label} strokeWidth={3} stroke={i.color} yAxisId={0}/>
      })
      graph = <LineChart width={window.innerWidth - 100} height={400} data={data}
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
  } else {
    return <div className={"loading-wrapper"}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  }
}
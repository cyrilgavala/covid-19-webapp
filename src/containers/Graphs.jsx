import {Container, Dropdown, Spinner} from 'react-bootstrap';
import CustomChart from "../component/CustomChart";
import {useEffect, useState} from "react";
import axios from "axios";
import properties from "../config/properties";

export default function Graphs() {

  const [range, setRange] = useState("all")
  const [posPercentage, setPosPercentage] = useState([])
  const [deaths, setDeaths] = useState([])
  const [dailyTests, setDailyTests] = useState([])
  const [dailyDeaths, setDailyDeaths] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    loadData(range).then(r => console.log(r))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function reloadData(selectedRange) {
    setRange(selectedRange)
    setLoading(true)
    loadData(selectedRange).then(r => console.log(r))
  }

  async function loadData(range) {
    const params = calculateParams(range)
    await loadSeriesData("positivePercentage", params).then(res => setPosPercentage(res.data))
    await loadSeriesData("testsDaily", params).then(res => setDailyTests(res.data))
    await loadSeriesData("deaths", params).then(res => setDeaths(res.data))
    await loadSeriesData("deathsDaily", params).then(res => setDailyDeaths(res.data))
    setLoading(false)
    return "Statistical data loaded"
  }

  async function loadSeriesData(suffix, params) {
    return axios.get(properties.apiUrl + 'series/' + suffix, {params: params});
  }

  function calculateParams(range) {
    if ("all" === range) {
      return {}
    } else {
      const startDate = new Date();
      startDate.setUTCHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - range);
      return {
        startDate: startDate.toISOString(),
      }
    }
  }

  if (!isLoading) {
    return <Container fluid id="graphs-container">
      <Container id={"graphs-select-date-range"}>
        <p>Select range: </p>
        <Dropdown onSelect={value => reloadData(value)} drop={"down"}>
          <Dropdown.Toggle variant="secondary" id="select-date-range">
            {"all" === range ? "All" : "Last " + range + " days"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={"all"}>All</Dropdown.Item>
            <Dropdown.Item eventKey={90}>Last 90 days</Dropdown.Item>
            <Dropdown.Item eventKey={30}>Last 30 days</Dropdown.Item>
            <Dropdown.Item eventKey={7}>Last 7 days</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      <CustomChart key={"pp_" + range} type={"line"} title={"Positive percentage"}
                   labels={[{label: "percentage", color: "cyan"}]} data={posPercentage}/>
      <CustomChart key={"dt_" + range} type={"bar"} title={"Daily tests"} data={dailyTests}
                   labels={[{label: "tests", color: "cyan"}, {label: "confirmed", color: "lightblue"}]}/>
      <CustomChart key={"d_" + range} type={"line"} title={"Deaths"} labels={[{label: "deaths", color: "cyan"}]}
                   data={deaths}/>
      <CustomChart key={"dd_" + range} type={"bar"} title={"Deaths daily"} labels={[{label: "deaths", color: "cyan"}]}
                   data={dailyDeaths}/>
    </Container>
  } else {
    return <div className={"loading-wrapper"}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  }
}
import {Container, Dropdown} from 'react-bootstrap';
import CustomChart from "../component/CustomChart";
import {useState} from "react";

export default function Graphs() {

  const [range, setRange] = useState("all")


  return <Container fluid id="graphs-container">
    <Dropdown onSelect={value => setRange(value)} drop={"right"}>
      <Dropdown.Toggle variant="secondary" id="select-date-range">
        Select date range (Current: {"all" === range ? "All)" : "Last " + range + " days)"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={"all"}>All</Dropdown.Item>
        <Dropdown.Item eventKey={90}>Last 90 days</Dropdown.Item>
        <Dropdown.Item eventKey={30}>Last 30 days</Dropdown.Item>
        <Dropdown.Item eventKey={7}>Last 7 days</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <CustomChart key={"pp_" + range} type={"line"} title={"Positive percentage"} querySuffix={"positivePercentage"}
                 labels={[{label: "percentage", color: "cyan"}]} range={range}/>
    <CustomChart key={"dt_" + range} type={"bar"} title={"Daily tests"} querySuffix={"testsDaily"} range={range}
                 labels={[{label: "tests", color: "cyan"}, {label: "confirmed", color: "lightblue"}]}/>
    <CustomChart key={"d_" + range} type={"line"} title={"Deaths"} querySuffix={"deaths"} labels={[{label: "deaths", color: "cyan"}]}
                 range={range}/>
    <CustomChart key={"dd_" + range} type={"bar"} title={"Deaths daily"} querySuffix={"deathsDaily"}
                 labels={[{label: "deaths", color: "cyan"}]} range={range}/>
  </Container>
}
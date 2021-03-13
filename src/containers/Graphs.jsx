import {Container} from 'react-bootstrap';
import CustomChart from "../component/CustomChart";

export default function Graphs() {

  return <Container fluid id="graphs-container">
    <CustomChart type={"line"} title={"Positive percentage"} querySuffix={"positivePercentage"}
                 labels={[{label: "percentage", color: "cyan"}]}/>
    <CustomChart type={"bar"} title={"Daily tests"} querySuffix={"testsDaily"}
                 labels={[{label: "tests", color: "cyan"}, {label: "confirmed", color: "lightblue"}]}/>
    <CustomChart type={"line"} title={"Deaths"} querySuffix={"deaths"} labels={[{label: "deaths", color: "cyan"}]}/>
    <CustomChart type={"bar"} title={"Deaths daily"} querySuffix={"deathsDaily"}
                 labels={[{label: "deaths", color: "cyan"}]}/>
  </Container>
}
import React from "react";
import axios from "axios";
import {Container} from 'react-bootstrap';
import CustomLineChart from "../component/CustomLineChart";

const apiUrl = "https://covid-19-api.herokuapp.com/"

export default class Graphs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commonDataSeries: [],
            deathsSeries: [],
            positivePercentageSeries: []
        };
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.loadSeriesData("data").then(res => this.setState({commonDataSeries: res.data}));
        this.loadSeriesData("deaths").then(res => this.setState({deathsSeries: res.data}));
        this.loadSeriesData("positivePercentage").then(res => this.setState({positivePercentageSeries: res.data}));
    }

    render() {
        return <Container fluid id="graphs-container">
            <CustomLineChart title={"Common data"} chartData={this.state.commonDataSeries} labels={[{label: "recovered", color: "blue"}, {label: "confirmed", color: "lightblue"}, {label: "active", color: "cyan"}]}/>
            <CustomLineChart title={"Deaths"} chartData={this.state.deathsSeries} labels={[{label: "deaths", color: "cyan"}]}/>
            <CustomLineChart title={"Positive percentage"} chartData={this.state.positivePercentageSeries} labels={[{label: "percentage", color: "cyan"}]}/>
        </Container>
    }

    loadSeriesData(suffix) {
        return axios.get(apiUrl + 'series/' + suffix);
    }
}
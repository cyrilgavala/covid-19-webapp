import React from "react";
import axios from "axios";
import InformationCell from "../component/InformationCell";
import InformationChart from "../component/InformationChart";

const apiUrl = "https://covid-19-api.herokuapp.com/"

const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const yesterday = new Date();
yesterday.setUTCHours(0, 0, 0, 0);
yesterday.setDate(yesterday.getDate() - 1);
let since = new Date(Date.UTC(2020, 10, 24, 0, 0, 0, 0))

/** @namespace this.state.current.numberOfTests **/
/** @namespace this.state.current.confirmed **/
/** @namespace this.state.current.active **/
/** @namespace this.state.current.recovered **/
/** @namespace this.state.current.deaths **/
export default class Visualizations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: undefined,
            previous: undefined,
            firstChartData: [],
            deathsData: [],
            percentageOfPosData: []
        };
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.loadDailyData(today).then(v => this.setState({current: v.data}))
        this.loadDailyData(yesterday).then(v => this.setState({previous: v.data}))
        axios.get(apiUrl + 'days', {
            params: {
                date: since.toISOString()
            }
        }).then(res => {
            let confirmedValues = [];
            let activeValues = [];
            let recoveredValues = [];
            res.data.map(e => confirmedValues.push({
                x: new Date(e.date).toLocaleDateString(),
                y: e.confirmed
            }));
            res.data.map(e => activeValues.push({
                x: new Date(e.date).toLocaleDateString(),
                y: e.active
            }));
            res.data.map(e => recoveredValues.push({
                x: new Date(e.date).toLocaleDateString(),
                y: e.recovered
            }));
            let deathsValues = []
            res.data.map(e => deathsValues.push({
                x: new Date(e.date).toLocaleDateString(),
                y: e.deaths
            }));
            let percentageValues = [];
            for (let i = 0; i < res.data.length - 1; i++) {
                let actual = res.data[i + 1];
                let before = res.data[i];
                percentageValues.push({
                    x: new Date(actual.date).toLocaleDateString(),
                    y: this.computePercentageOfPositive(actual, before)
                })
            }
            this.setState({
                firstChartData: [{
                    key: "Confirmed",
                    values: confirmedValues
                }, {
                    key: "Active",
                    values: activeValues
                }, {
                    key: "Recovered",
                    values: recoveredValues
                }],
                percentageOfPosData: [{
                    key: "Percentage",
                    values: percentageValues
                }],
                deathsData: [{
                    key: "Deaths",
                    values: deathsValues
                }]
            })
        }).catch(error => console.log("Error occurred: {}", error));
    }

    render() {
        if (this.state.current !== undefined && this.state.previous !== undefined && this.state.firstChartData.length > 0) {
            let d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            return <div id="main-container">
                <div className="row-caption">General data valid on {d.toLocaleDateString()} </div>
                <div className="row-with-data">
                    <InformationCell label="No. of tests:" information={this.state.current.numberOfTests}/>
                    <InformationCell label="Confirmed:" information={this.state.current.confirmed}/>
                    <InformationCell label="Active:" information={this.state.current.active}/>
                    <InformationCell label="Recovered:" information={this.state.current.recovered}/>
                    <InformationCell label="Deaths:" information={this.state.current.deaths}/>
                </div>
                <div className="row-caption">Deltas comparing to the previous day</div>
                <div className="row-with-data">
                    <InformationCell label="No. of tests:"
                                     information={this.state.current.numberOfTests - this.state.previous.numberOfTests}/>
                    <InformationCell label="Confirmed:"
                                     information={this.state.current.confirmed - this.state.previous.confirmed}/>
                    <InformationCell label="Percentage of positive:"
                                     information={this.computePercentageOfPositive(this.state.current, this.state.previous) + "%"}/>
                    <InformationCell label="Active:"
                                     information={this.state.current.active - this.state.previous.active}/>
                    <InformationCell label="Recovered:"
                                     information={this.state.current.recovered - this.state.previous.recovered}/>
                    <InformationCell label="Deaths:"
                                     information={this.state.current.deaths - this.state.previous.deaths}/>
                </div>
                <div className="row-caption">Evolution since {since.toLocaleDateString()}</div>
                <InformationChart yLabel={"Number of cases"} data={this.state.firstChartData}/>
                <InformationChart yLabel={"Number of cases"} data={this.state.deathsData}/>
                <InformationChart yLabel={"Percentage of positive cases to no. of tests"} data={this.state.percentageOfPosData}/>
            </div>
        } else {
            return <div/>
        }
    }

    loadDailyData(date) {
        return axios.get(apiUrl + 'day', {
            params: {
                date: date.toISOString()
            }
        });
    }

    computePercentageOfPositive(current, previous) {
        return ((current.confirmed - previous.confirmed) / (current.numberOfTests - previous.numberOfTests) * 100).toFixed(2)
    }
}
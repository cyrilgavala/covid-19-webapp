import React from "react";
import axios from "axios";
import {CardDeck, Container, Spinner} from 'react-bootstrap';
import InformationCard from "../component/InformationCard";

const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const yesterday = new Date();
yesterday.setUTCHours(0, 0, 0, 0);
yesterday.setDate(yesterday.getDate() - 1);
const apiUrl = "https://covid-19-api.herokuapp.com/"

/** @namespace this.state.current.numberOfTests **/
/** @namespace this.state.current.confirmed **/
/** @namespace this.state.current.deaths **/
export default class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: undefined,
            previous: undefined
        };
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.loadDailyData(today).then(v => this.setState({current: v.data}))
        this.loadDailyData(yesterday).then(v => this.setState({previous: v.data}))
    }

    render() {
        if (this.state.current !== undefined && this.state.previous !== undefined) {
            return <Container fluid id="statistics-container">
                <div className="row-caption">General data valid on {new Date().toLocaleString()} </div>
                <CardDeck className="row-with-data">
                    <InformationCard label="No. of tests:" data={this.state.current.numberOfTests}
                                     delta={this.state.current.numberOfTests - this.state.previous.numberOfTests}/>
                    <InformationCard label="Confirmed:" data={this.state.current.confirmed}
                                     delta={this.state.current.confirmed - this.state.previous.confirmed}/>
                    <InformationCard label="Deaths:" data={this.state.current.deaths}
                                     delta={this.state.current.deaths - this.state.previous.deaths}/>
                </CardDeck>
            </Container>
        } else {
            return <div className={"loading-wrapper"}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
    }

    loadDailyData(date) {
        return axios.get(apiUrl + 'stats/day', {
            params: {
                date: date.toISOString()
            }
        });
    }
}
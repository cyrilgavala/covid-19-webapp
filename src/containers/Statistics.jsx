import {useEffect, useState} from "react";
import axios from "axios";
import {CardDeck, Container, Spinner} from 'react-bootstrap';
import InformationCard from "../component/InformationCard";

const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const yesterday = new Date();
yesterday.setUTCHours(0, 0, 0, 0);
yesterday.setDate(yesterday.getDate() - 1);
const apiUrl = "https://covid-19-api.herokuapp.com/"

/** @namespace current.numberOfTests **/
/** @namespace current.confirmed **/
/** @namespace current.deaths **/
export default function Statistics() {

  const [isLoading, setLoading] = useState(true)
  const [current, setCurrent] = useState({})
  const [previous, setPrevious] = useState({})

  async function loadDataForDay(date) {
    return axios.get(apiUrl + 'stats/day', {
      params: {
        date: date.toISOString()
      }
    })
  }

  useEffect(() => {
    const loadData = async (today, yesterday) => {
      await loadDataForDay(today).then(res => setCurrent(res.data))
      await loadDataForDay(yesterday).then(res => setPrevious(res.data))
      setLoading(false)
      return "Daily data loaded"
    }
    loadData(today, yesterday).then(r => console.log(r))
  }, [])

  if (!isLoading) {
    return <Container fluid id="statistics-container">
      <div className="row-caption">General data valid on {new Date().toLocaleString()} </div>
      <CardDeck className="row-with-data">
        <InformationCard label="No. of tests:" data={current.numberOfTests}
                         delta={current.numberOfTests - previous.numberOfTests}/>
        <InformationCard label="Confirmed:" data={current.confirmed}
                         delta={current.confirmed - previous.confirmed}/>
        <InformationCard label="Deaths:" data={current.deaths}
                         delta={current.deaths - previous.deaths}/>
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
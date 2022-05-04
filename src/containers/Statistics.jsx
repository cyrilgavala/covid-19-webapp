import {useEffect, useState} from "react";
import axios from "axios";
import InformationCard from "../component/InformationCard";
import properties from "../config/properties"
import Spinner from "../component/Spinner";

export default function Statistics() {

    const [current, setCurrent] = useState({})
    const [previous, setPrevious] = useState({})
    const [loading, setLoading] = useState(true)

    const loadDataForDay = async date => axios.get(properties.apiUrl + 'stats/day', {params: {date: date}})

    useEffect(() => {
        setLoading(true)
        const today = new Date(Date.UTC(2022, 3, 28, 0, 0, 0)).toISOString();
        const yesterday = new Date(Date.UTC(2022, 3, 27, 0, 0, 0)).toISOString();

        Promise.all([loadDataForDay(today), loadDataForDay(yesterday)])
            .then(response => {
                setCurrent(response[0].data)
                setPrevious(response[1].data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner theme={"light"}/>
    } else {
        return <div id="statistics-container">
            <InformationCard label="No. of tests:" data={current.numberOfTests}
                             delta={current.numberOfTests - previous.numberOfTests}/>
            <InformationCard label="Confirmed:" data={current.confirmed}
                             delta={current.confirmed - previous.confirmed}/>
            <InformationCard label="Deaths:" data={current.deaths}
                             delta={current.deaths - previous.deaths}/>
            <p>Last data are available from 28.4.2022. Also there's low probability of new data available,
                therefore web-scrap app was turned off.</p>
        </div>
    }
}
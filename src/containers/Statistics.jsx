import {useEffect, useState} from "react";
import axios from "axios";
import InformationCard from "../component/InformationCard";
import properties from "../config/properties"

export default function Statistics() {

    const [current, setCurrent] = useState({})
    const [previous, setPrevious] = useState({})

    async function loadDataForDay(date) {
        return axios.get(properties.apiUrl + 'stats/day', {
            params: {
                date: date.toISOString()
            }
        })
    }

    useEffect(() => {
        const loadData = () => {
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            const yesterday = new Date();
            yesterday.setUTCHours(0, 0, 0, 0);
            yesterday.setDate(yesterday.getDate() - 1);

            loadDataForDay(today).then(res => {
                setCurrent(res.data)
                loadDataForDay(yesterday).then(res => setPrevious(res.data))
            })
        }
        loadData()
    }, [])

    return <div id="statistics-container">
        <InformationCard label="No. of tests:" data={current.numberOfTests}
                         delta={current.numberOfTests - previous.numberOfTests}/>
        <InformationCard label="Confirmed:" data={current.confirmed}
                         delta={current.confirmed - previous.confirmed}/>
        <InformationCard label="Deaths:" data={current.deaths}
                         delta={current.deaths - previous.deaths}/>
    </div>
}
import {useEffect, useState} from "react";
import axios from "axios";
import InformationCard from "../component/InformationCard";
import properties from "../config/properties"

export default function Statistics() {

    const [current, setCurrent] = useState({})
    const [previous, setPrevious] = useState({})
    const [loading, setLoading] = useState(true)

    async function loadDataForDay(date) {
        return axios.get(properties.apiUrl + 'stats/day', {
            params: {
                date: date.toISOString()
            }
        })
    }

    useEffect(() => {
        const loadData = () => {
            setLoading(true)
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            const yesterday = new Date();
            yesterday.setUTCHours(0, 0, 0, 0);
            yesterday.setDate(yesterday.getDate() - 1);

            loadDataForDay(today).then(res => {
                setCurrent(res.data)
                loadDataForDay(yesterday).then(res => {
                    setPrevious(res.data)
                    setLoading(false)
                }).catch(() => setLoading(false))
            }).catch(() => setLoading(false))
        }
        loadData()
    }, [])

    return <div id="statistics-container">
        <InformationCard label="No. of tests:" data={current.numberOfTests} loading={loading}
                         delta={current.numberOfTests - previous.numberOfTests}/>
        <InformationCard label="Confirmed:" data={current.confirmed} loading={loading}
                         delta={current.confirmed - previous.confirmed}/>
        <InformationCard label="Deaths:" data={current.deaths} loading={loading}
                         delta={current.deaths - previous.deaths}/>
    </div>
}
import CustomLineChart from "../component/CustomLineChart";
import {useEffect, useState} from "react";
import axios from "axios";
import properties from "../config/properties";

export default function Graphs() {

    const [startDate, setStartDate] = useState("2020-11-27")
    const [endDate, setEndDate] = useState("2022-04-28")
    const [posPercentage, setPosPercentage] = useState([])
    const [deathsData, setDeathsData] = useState([])
    const [dailyTests, setDailyTests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const params = {
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString()
        }

        Promise.all([loadSeriesData("positivePercentage", params),
            loadSeriesData("testsDaily", params),
            loadSeriesData("deaths", params),
            loadSeriesData("deathsDaily", params)])
            .then(response => {
                setPosPercentage(response[0].data)
                setDailyTests(response[1].data)
                setDeathsData(response[3].data.map((item, index) => {
                    return {deathsDaily: item.deaths, deathsTotal: response[2].data[index].deaths, date: item.date}
                }))
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))

    }, [startDate, endDate])

    const loadSeriesData = async (suffix, params) => {
        return axios.get(properties.apiUrl + 'series/' + suffix, {params: params});
    }

    const handleStartDateSelect = async (event) => {
        event.preventDefault()
        setStartDate(event.target.value)
    }

    const handleEndDateSelect = async (event) => {
        event.preventDefault()
        setEndDate(event.target.value)
    }

    return <div id="graphs-container">
        {!loading && <div id="date-inputs-wrapper">
            <div className="input-wrapper">
                <div className="label-input">Start date: </div>
                <input className="date-input" type="date" min="2020-11-27" max="2022-04-27"
                       value={startDate} onChange={handleStartDateSelect}/>
            </div>
            <div className="input-wrapper">
                <div className="label-input">End date: </div>
                <input className="date-input" type="date" min="2020-11-27" max="2022-04-28"
                       value={endDate} onChange={handleEndDateSelect}/>
            </div>
        </div>}
        <CustomLineChart key={"pp_" + startDate + endDate} title="Positive percentage" loading={loading}
                         labels={[{label: "percentage", color: "var(--light)"}]}
                         data={posPercentage}/>
        <CustomLineChart key={"dt_" + startDate + endDate} title="Daily tests" data={dailyTests} loading={loading}
                         labels={[{label: "tests", color: "var(--light)"}, {label: "confirmed", color: "var(--second-graph-color)"}]}/>
        <CustomLineChart key={"d_" + startDate + endDate} title="Deaths" loading={loading}
                         labels={[{label: "deathsDaily", color: "var(--light)"}, {
                             label: "deathsTotal",
                             color: "var(--second-graph-color)"
                         }]} data={deathsData}/>
    </div>
}
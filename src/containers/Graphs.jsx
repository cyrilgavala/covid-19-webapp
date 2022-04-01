import CustomLineChart from "../component/CustomLineChart";
import {useEffect, useState} from "react";
import axios from "axios";
import properties from "../config/properties";

export default function Graphs() {

    const [startDate, setStartDate] = useState("2020-11-27")
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
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
        <div id={"date-inputs-wrapper"}>
            <div className={"input-wrapper"}>
                <label className={"label-input"}>Start date: </label>
                <input className={"date-input"} type={"date"} min={"2020-11-27"} max={new Date().toDateString()}
                       value={startDate} onChange={handleStartDateSelect}/>
            </div>
            <div className={"input-wrapper"}>
                <label className={"label-input"}>End date: </label>
                <input className={"date-input"} type={"date"} min={"2020-11-27"} max={new Date().toDateString()}
                       value={endDate} onChange={handleEndDateSelect}/>
            </div>
        </div>
        <CustomLineChart key={"pp_" + startDate + endDate} title={"Positive percentage"} loading={loading}
                         labels={[{label: "percentage", color: "#f3eae5"}]}
                         data={posPercentage}/>
        <CustomLineChart key={"dt_" + startDate + endDate} title={"Daily tests"} data={dailyTests} loading={loading}
                         labels={[{label: "tests", color: "#f3eae5"}, {label: "confirmed", color: "#c2d7e3"}]}/>
        <CustomLineChart key={"d_" + startDate + endDate} title={"Deaths"} loading={loading}
                         labels={[{label: "deathsDaily", color: "#f3eae5"}, {
                             label: "deathsTotal",
                             color: "#c2d7e3"
                         }]}
                         data={deathsData}/>
    </div>
}
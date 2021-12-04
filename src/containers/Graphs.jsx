import CustomLineChart from "../component/CustomLineChart";
import {useEffect, useState} from "react";
import axios from "axios";
import properties from "../config/properties";
import Spinner from "../component/Spinner";

export default function Graphs() {

    const [startDate, setStartDate] = useState("2020-11-27")
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
    const [posPercentage, setPosPercentage] = useState([])
    const [deathsData, setDeathsData] = useState([])
    const [dailyTests, setDailyTests] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        loadData(startDate, endDate).then(r => console.log(r))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const loadData = async (start, end) => {
        const params = translateDatesToParams(start, end)
        await loadSeriesData("positivePercentage", params).then(res => setPosPercentage(res.data))
        await loadSeriesData("testsDaily", params).then(res => setDailyTests(res.data))
        const deathsTotal = await loadSeriesData("deaths", params).then(res => {
            return res.data
        })
        const deathsDaily = await loadSeriesData("deathsDaily", params).then(res => {
            return res.data
        })

        setDeathsData(deathsDaily.map((item, index) => {
            return {deathsDaily: item.deaths, deathsTotal: deathsTotal[index].deaths, date: item.date}
        }))

        setLoading(false)
        return "Statistical data loaded"
    }

    const loadSeriesData = async (suffix, params) => {
        return axios.get(properties.apiUrl + 'series/' + suffix, {params: params});
    }

    const translateDatesToParams = (start, end) => {
        return {
            startDate: new Date(start).toISOString(),
            endDate: new Date(end).toISOString()
        }
    }

    const handleStartDateSelect = async (event) => {
        event.preventDefault()
        setStartDate(event.target.value)
        setLoading(true)
        await loadData(event.target.value, endDate)
    }

    const handleEndDateSelect = async (event) => {
        event.preventDefault()
        setEndDate(event.target.value)
        setLoading(true)
        await loadData(startDate, event.target.value)
    }

    if (!isLoading) {
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
            <CustomLineChart key={"pp_" + startDate + endDate} title={"Positive percentage"}
                             labels={[{label: "percentage", color: "#4c6353"}]}
                             data={posPercentage}/>
            <CustomLineChart key={"dt_" + startDate + endDate} title={"Daily tests"} data={dailyTests}
                             labels={[{label: "tests", color: "#4c6353"}, {label: "confirmed", color: "#73303c"}]}/>
            <CustomLineChart key={"d_" + startDate + endDate} title={"Deaths"}
                             labels={[{label: "deathsDaily", color: "#4c6353"}, {
                                 label: "deathsTotal",
                                 color: "#73303c"
                             }]}
                             data={deathsData}/>
        </div>
    } else {
        return <div className={"loading-wrapper"}>
            <Spinner/>
        </div>
    }
}
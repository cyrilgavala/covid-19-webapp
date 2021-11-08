import {Dropdown} from 'react-bootstrap';
import CustomLineChart from "../component/CustomLineChart";
import {useEffect, useState} from "react";
import axios from "axios";
import properties from "../config/properties";
import Spinner from "../component/Spinner";

export default function Graphs() {

    const [range, setRange] = useState("all")
    const [posPercentage, setPosPercentage] = useState([])
    const [deathsData, setDeathsData] = useState([])
    const [dailyTests, setDailyTests] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        loadData(range).then(r => console.log(r))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function reloadData(selectedRange) {
        setRange(selectedRange)
        setLoading(true)
        loadData(selectedRange).then(r => console.log(r))
    }

    async function loadData(range) {
        const params = calculateParams(range)
        await loadSeriesData("positivePercentage", params).then(res => setPosPercentage(res.data))
        await loadSeriesData("testsDaily", params).then(res => setDailyTests(res.data))
        const deathsTotal = await loadSeriesData("deaths", params).then(res => {return res.data})
        const deathsDaily = await loadSeriesData("deathsDaily", params).then(res => {return res.data})

        setDeathsData(deathsDaily.map((item, index) => {
            return {deathsDaily: item.deaths, deathsTotal: deathsTotal[index].deaths, date: item.date}
        }))

        setLoading(false)
        return "Statistical data loaded"
    }

    async function loadSeriesData(suffix, params) {
        return axios.get(properties.apiUrl + 'series/' + suffix, {params: params});
    }

    function calculateParams(range) {
        if ("all" === range) {
            return {}
        } else {
            const startDate = new Date();
            startDate.setUTCHours(0, 0, 0, 0);
            startDate.setDate(startDate.getDate() - range);
            return {
                startDate: startDate.toISOString(),
            }
        }
    }

    if (!isLoading) {
        return <div id="graphs-container">
            <Dropdown id={"date-range-dropdown"} onSelect={value => reloadData(value)} drop={"down"}>
                <Dropdown.Toggle variant="secondary" id="select-date-range">
                    {"Select range"}
                </Dropdown.Toggle>
                <Dropdown.Menu id={"date-range-dropdown-menu"}>
                    <Dropdown.Item eventKey={"all"}>All</Dropdown.Item>
                    <Dropdown.Item eventKey={365}>Last year</Dropdown.Item>
                    <Dropdown.Item eventKey={180}>Last half year</Dropdown.Item>
                    <Dropdown.Item eventKey={90}>Last 3 months</Dropdown.Item>
                    <Dropdown.Item eventKey={30}>Last month</Dropdown.Item>
                    <Dropdown.Item eventKey={7}>Last week</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <CustomLineChart syncId="1"
                             key={"pp_" + range}
                             title={"Positive percentage"}
                             labels={[{label: "percentage", color: "#4c6353"}]}
                             data={posPercentage}/>
            <CustomLineChart syncId="1"
                             key={"dt_" + range}
                             title={"Daily tests"}
                             data={dailyTests}
                             labels={[{label: "tests", color: "#4c6353"}, {label: "confirmed", color: "#73303c"}]}/>
            <CustomLineChart key={"d_" + range}
                             title={"Deaths"}
                             labels={[{label: "deathsDaily", color: "#4c6353"}, {label: "deathsTotal", color: "#73303c"}]}
                             data={deathsData}/>
        </div>
    } else {
        return <div className={"loading-wrapper"}>
            <Spinner/>
        </div>
    }
}
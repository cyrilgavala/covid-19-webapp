import {Container, Dropdown, Spinner} from 'react-bootstrap';
import CustomLineChart from "../component/CustomLineChart";
import {useEffect, useState} from "react";
import axios from "axios";
import properties from "../config/properties";

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
		return <Container fluid id="graphs-container">
			<Container id={"graphs-select-date-range"}>
				<p>Select range: </p>
				<Dropdown onSelect={value => reloadData(value)} drop={"down"}>
					<Dropdown.Toggle variant="secondary" id="select-date-range">
						{"all" === range ? "All" : "Last " + range + " days"}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey={"all"}>All</Dropdown.Item>
						<Dropdown.Item eventKey={90}>Last 90 days</Dropdown.Item>
						<Dropdown.Item eventKey={30}>Last 30 days</Dropdown.Item>
						<Dropdown.Item eventKey={7}>Last 7 days</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Container>
			<CustomLineChart key={"pp_" + range} title={"Positive percentage"} labels={[{label: "percentage", color: "cyan"}]}
			                 data={posPercentage}/>
			<CustomLineChart key={"dt_" + range} title={"Daily tests"} data={dailyTests}
			                 labels={[{label: "tests", color: "cyan"}, {label: "confirmed", color: "lightblue"}]}/>
			<CustomLineChart key={"d_" + range} title={"Deaths"} labels={[{label: "deathsDaily", color: "cyan"}, {label: "deathsTotal", color: "lightblue"}]}
							 data={deathsData}/>
		</Container>
	} else {
		return <div className={"loading-wrapper"}>
			<Spinner animation="border" role="status" alt={"Loading..."}/>
		</div>
	}
}
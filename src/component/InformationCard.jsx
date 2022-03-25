import Spinner from "../component/Spinner";

export default function InformationCard(props) {

  return <div className={"stat-card"}>
    <div className={"stat-card-header"}>{props.label}</div>
    {!props.loading && <div className={"stat-card-body"}>{props.data} ({"+" + props.delta})</div>}
    {props.loading && <Spinner theme={"dark"}/>}
  </div>
}
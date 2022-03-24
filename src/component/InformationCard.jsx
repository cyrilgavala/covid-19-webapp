import Spinner from "../component/Spinner";

export default function InformationCard(props) {

  return <div className={"stat-card"}>
    <div className={"stat-card-header"}>{props.label}</div>
    {!!props.data && !!props.delta && <div className={"stat-card-body"}>{props.data} ({"+" + props.delta})</div>}
    {(!props.data || !props.delta) && <Spinner theme={"dark"}/>}
  </div>
}
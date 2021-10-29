export default function InformationCard(props) {

  return <div className={"stat-card"}>
    <div className={"stat-card-header"}>{props.label}</div>
    <div className={"stat-card-body"}>{props.data} ({props.delta > 0 ? " +" + props.delta : props.delta} )</div>
  </div>
}
export default function InformationCard(props) {

  return <div className={"card"}>
    <div className={"card-header"}>{props.label}</div>
    <div className={"card-body"}>{props.data} ({props.delta > 0 ? " +" + props.delta : props.delta} )</div>
  </div>
}
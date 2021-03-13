import {Card} from 'react-bootstrap';

export default function InformationCard(props) {

  return <Card className={"information-card"} border={"light"} bg={"dark"} text={"white"}>
    <Card.Header>{props.label}</Card.Header>
    <Card.Body>
      <Card.Text>
        {props.data} ({props.delta > 0 ? " +" + props.delta : props.delta} )
      </Card.Text>
    </Card.Body>
  </Card>
}
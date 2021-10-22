import {Card} from 'react-bootstrap';

export default function InformationCard(props) {

  return <Card className={"col-sm-8 col-md-4 col-lg-4 col-xl-3"}>
    <Card.Header >{props.label}</Card.Header>
    <Card.Body>
      <Card.Text>
        {props.data} ({props.delta > 0 ? " +" + props.delta : props.delta} )
      </Card.Text>
    </Card.Body>
  </Card>
}
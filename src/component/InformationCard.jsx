import React from "react";
import {Card} from 'react-bootstrap';

class InformationCard extends React.Component {

    render() {
        return <Card className={"information-cell"} border={"light"} bg={"dark"} text={"white"}>
            <Card.Header>{this.props.label}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {this.props.data} ({this.props.delta > 0 ? " +" + this.props.delta : this.props.delta} )
                </Card.Text>
            </Card.Body>
        </Card>
    }
}

export default InformationCard;
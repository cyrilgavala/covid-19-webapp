import React from "react";
import {Spinner} from "react-bootstrap";

export default class MultiLineChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data !== undefined && this.props.data !== []) {
            return <div className={"multi-line-chart"}/>
        } else {
            return <div id={"loading-wrapper"}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
    }
}
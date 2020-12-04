import React from "react";

class InformationCell extends React.Component {

    /** @namespace this.props.information **/
    render() {
        return <div className={"information-cell" + (this.props.level !== undefined ? " " + this.props.level : "")}>{this.props.label} {this.props.information}</div>;
    }
}

export default InformationCell;
import React, { Component } from "react";

export class TargetBox extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="person_details">
        <h4>{this.props.target.name.join(" ")}</h4>
        <h6>Born: {this.props.target.born}</h6>
      </div>
    );
  }
}

export default TargetBox;

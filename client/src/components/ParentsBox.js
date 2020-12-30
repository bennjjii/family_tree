import React, { Component } from "react";

export class ParentsBox extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="parent_details">
        <h5>Parents: </h5>
        <div>
          <button
            className="parents-btn"
            uuid={this.props.father.uuid}
            onClick={this.props.handleUpd}
          >
            {this.props.father.name.join(" ")}
          </button>
          <button
            className="parents-btn"
            uuid={this.props.mother.uuid}
            onClick={this.props.handleUpd}
          >
            {this.props.mother.name.join(" ")}
          </button>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

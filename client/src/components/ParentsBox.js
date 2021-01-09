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
            name="Father"
            className="parents-btn"
            uuid={this.props.father.uuid}
            onClick={this.props.handleUpd}
          >
            {this.props.father.uuid !== ""
              ? this.props.father.name.join(" ")
              : "Add father"}
          </button>
          <button
            name="Mother"
            className="parents-btn"
            uuid={this.props.mother.uuid}
            onClick={this.props.handleUpd}
          >
            {this.props.mother.uuid !== ""
              ? this.props.mother.name.join(" ")
              : "Add mother"}
          </button>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

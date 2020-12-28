import React, { Component } from "react";

export class ParentsBox extends Component {
  constructor(props) {
    super();

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.handleUpd(e.target.name);
  }

  render() {
    return (
      <div className="parent_details">
        <h5>Parents: </h5>
        <div>
          <button
            className="parents-btn"
            name={this.props.father.uuid}
            onClick={this.handleUpdate}
          >
            {this.props.father.name.join(" ")}
          </button>
          <button
            className="parents-btn"
            name={this.props.mother.uuid}
            onClick={this.handleUpdate}
          >
            {this.props.mother.name.join(" ")}
          </button>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

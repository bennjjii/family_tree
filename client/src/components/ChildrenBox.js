import React, { Component } from "react";
import axios from "axios";
import validator from "validator";

export class ChildrenBox extends Component {
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
      <div className="children_box">
        <button className="plus_button">+</button>
        <h5>Children:</h5>
        {this.props.children.map((child) => {
          return (
            <>
              <button
                className="parents-btn"
                name={child.uuid}
                key={child.uuid}
                onClick={this.handleUpdate}
              >
                {child.name.join(" ")}
                <br />
                {child.d_o_b}
              </button>
              <br />
            </>
          );
        })}
      </div>
    );
  }
}

export default ChildrenBox;

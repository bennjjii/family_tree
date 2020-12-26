import React, { Component } from "react";
import axios from "axios";
import validator from "validator";

export class ChildrenBox extends Component {
  constructor(props) {
    super();
    this.state = {
      children: [{ name: [], uuid: "" }],
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.handleUpd(e.target.name);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.uuid_target !== prevProps.uuid_target) {
      this.setState(
        {
          children: [],
        },
        () => {
          if (validator.isUUID(this.props.uuid_target)) {
            axios
              .get(
                "http://localhost:5000/get_children/" + this.props.uuid_target
              )
              .then((resp) => {
                console.log(resp);
                let children_resp = [];
                children_resp = resp.data.map((child, index) => {
                  return {
                    name: child.name,
                    d_o_b: child.d_o_b,
                    uuid: child.uuid,
                  };
                });
                this.setState({
                  children: children_resp,
                });
              });
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="children_box">
        <button className="plus_button">+</button>
        <h5>Children:</h5>
        {this.state.children.map((child) => {
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

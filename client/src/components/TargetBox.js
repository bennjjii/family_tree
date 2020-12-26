import React, { Component } from "react";
import axios from "axios";
import validator from "validator";

export class TargetBox extends Component {
  constructor(props) {
    super();
    this.state = {
      name: ["", "", ""],
      d_o_b: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.uuid_target !== prevProps.uuid_target) {
      this.setState(
        {
          name: ["", "", ""],
          d_o_b: null,
        },
        () => {
          if (validator.isUUID(this.props.uuid_target)) {
            ///////////

            axios
              .get("http://localhost:5000/get_target/" + this.props.uuid_target)
              .then((resp) => {
                const respObj = {
                  name: resp.data.name,
                  uuid: resp.data.uuid,
                  d_o_b: resp.data.d_o_b,
                  d_o_d: resp.data.d_o_d,
                };
                this.setState(respObj);
              });

            ///////////
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="person_details">
        <h4>{this.state.name.join(" ")}</h4>
        <h6>Born: {this.state.d_o_b}</h6>
        <h6>{this.props.uuid_target}</h6>
      </div>
    );
  }
}

export default TargetBox;

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

            const getName = axios.get(
              "http://localhost:5000/get_family_member/" +
                this.props.uuid_target
            );

            const getBirthday = axios.get(
              "http://localhost:5000/get_birth/" + this.props.uuid_target
            );

            Promise.all([getName, getBirthday]).then((responses) => {
              const nameArr = [
                responses[0].data.first_name,
                responses[0].data.middle_name,
                responses[0].data.last_name,
              ];
              this.setState({
                name: nameArr,
                d_o_b: responses[1].data.d_o_b,
              });
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

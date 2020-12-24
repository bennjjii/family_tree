import React, { Component } from "react";

import axios from "axios";

import validator from "validator";

export class ParentsBox extends Component {
  constructor(props) {
    super();
    this.state = {
      mother: "",
      father: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.uuid_target !== prevProps.uuid_target) {
      this.setState(
        {
          mother: "",
          father: "",
        },
        () => {
          if (validator.isUUID(this.props.uuid_target)) {
            axios
              .get("http://localhost:5000/get_birth/" + this.props.uuid_target)
              .then((res) => {
                this.setState({
                  mother: `${res.data.mother[0]} ${res.data.mother[1]} ${res.data.mother[2]} `,
                  father: `${res.data.father[0]} ${res.data.father[1]} ${res.data.father[2]} `,
                });
              });
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="parent_details">
        <h5>Parents: </h5>
        <div className="person_box">
          <h5>{this.state.father}</h5>
        </div>
        <div className="person_box">
          <h5>{this.state.mother}</h5>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

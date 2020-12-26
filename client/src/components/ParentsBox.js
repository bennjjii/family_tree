import React, { Component } from "react";

import axios from "axios";

import validator from "validator";

export class ParentsBox extends Component {
  constructor(props) {
    super();
    this.state = {
      mother: {
        name: [],
        uuid: "",
      },
      father: {
        name: [],
        uuid: "",
      },
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    console.log("Clicked");
    this.props.handleUpd(this.state.father.uuid);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.uuid_target !== prevProps.uuid_target) {
      this.setState(
        {
          mother: {
            name: [],
            uuid: "",
          },
          father: {
            name: [],
            uuid: "",
          },
        },
        () => {
          if (validator.isUUID(this.props.uuid_target)) {
            axios
              .get("http://localhost:5000/get_birth/" + this.props.uuid_target)
              .then((res) => {
                this.setState({
                  mother: {
                    name: res.data.mother.name,
                    uuid: res.data.mother.uuid,
                  },
                  father: {
                    name: res.data.father.name,
                    uuid: res.data.father.uuid,
                  },
                });
                console.log(this.state);
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
          <a href="#" onClick={this.handleUpdate}>
            <h5>{this.state.father.name.join(" ")}</h5>
          </a>
        </div>
        <div className="person_box">
          <h5>{this.state.mother.name.join(" ")}</h5>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

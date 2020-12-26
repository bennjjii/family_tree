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
    this.props.handleUpd(e.target.name);
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
        <div>
          <button
            className="parents-btn"
            name={this.state.father.uuid}
            onClick={this.handleUpdate}
          >
            {this.state.father.name.join(" ")}
          </button>
          <button
            className="parents-btn"
            name={this.state.mother.uuid}
            onClick={this.handleUpdate}
          >
            {this.state.mother.name.join(" ")}
          </button>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

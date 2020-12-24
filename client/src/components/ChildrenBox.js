import React, { Component } from "react";
import axios from "axios";
import validator from "validator";

export class ChildrenBox extends Component {
  constructor(props) {
    super();
    this.state = {
      children: [],
    };
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
                this.setState(
                  {
                    children: resp.data,
                  },
                  () => console.log(this.state.children)
                );
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
        <div className="person_box">
          <h5>Howard Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Daryll Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Cherry Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Penelope Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Vicky Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>{this.props.uuid_target}</h5>
        </div>
      </div>
    );
  }
}

export default ChildrenBox;

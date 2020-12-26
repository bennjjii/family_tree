import React, { Component } from "react";
import harold from "./harold.png";
import axios from "axios";
import "./IdCard.css";
import ParentsBox from "./ParentsBox";
import ChildrenBox from "./ChildrenBox";
import MarriedBox from "./MarriedBox";
import TargetBox from "./TargetBox";
import validator from "validator";

export class IdCard extends Component {
  constructor() {
    super();
    this.state = {
      uuid_box: "442f0558-cc6e-47ed-bb82-0d0abe95f1ac",
      uuid_target: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
  }

  updateTarget(newTargetUUID) {
    if (this.state.uuid_target != newTargetUUID) {
      this.setState({
        uuid_target: newTargetUUID,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      uuid_target: prevState.uuid_box,
    }));
  }

  handleChange(e) {
    const { name, value, type } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="IdCard">
        <div className="top_sect">
          <ParentsBox
            uuid_target={this.state.uuid_target}
            handleUpd={this.updateTarget}
          />
        </div>
        <div className="mid_sect">
          <div className="family_image">
            <img src={harold} alt="picture" />
          </div>
          <TargetBox uuid_target={this.state.uuid_target} />
          <div className="uuid_form">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="uuid_box"
                value={this.state.uuid_box}
                onChange={this.handleChange}
              ></input>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="btm_sect">
          <MarriedBox
            uuid_target={this.state.uuid_target}
            handleUpd={this.updateTarget}
          />
          <ChildrenBox
            uuid_target={this.state.uuid_target}
            handleUpd={this.updateTarget}
          />
        </div>
      </div>
    );
  }
}

export default IdCard;

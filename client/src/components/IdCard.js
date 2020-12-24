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
      target_name: ["", "", ""],
      birthday: "",
      marriages: [],
      death: "",
      children: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.uuid_target !== prevState.uuid_target) {
  //     this.setState(
  //       {
  //         target_name: ["", "", ""],
  //       },
  //       () => {
  //         if (validator.isUUID(this.state.uuid_target)) {
  //           axios
  //             .get(
  //               "http://localhost:5000/get_family_member/" +
  //                 this.state.uuid_target
  //             )
  //             .then((res) => {
  //               const targetnames = [
  //                 res.data.first_name,
  //                 res.data.middle_name,
  //                 res.data.last_name,
  //               ];
  //               this.setState({
  //                 target_name: targetnames,
  //               });
  //             })
  //             .catch((reason) => console.log(reason));
  //         }
  //       }
  //     );
  //   }
  // }

  render() {
    return (
      <div className="IdCard">
        <div className="top_sect">
          <ParentsBox uuid_target={this.state.uuid_target} />
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
          <MarriedBox />
          <ChildrenBox uuid_target={this.state.uuid_target} />
        </div>
      </div>
    );
  }
}

export default IdCard;

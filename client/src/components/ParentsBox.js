import React, { Component } from "react";

import axios from "axios";

export class ParentsBox extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/get_birth/" + this.props.uuid_target)
      .then((res) => console.log(res));
  }

  render() {
    return (
      <div className="parent_details">
        <h5>Parents: </h5>
        <div className="person_box">
          <h5>{this.props.father}</h5>
        </div>
        <div className="person_box">
          <h5>{this.props.mother}</h5>
        </div>
      </div>
    );
  }
}

export default ParentsBox;

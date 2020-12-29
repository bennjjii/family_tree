import React, { Component } from "react";

export class NewChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      middle_name: "",
      last_name: "",
      d_o_b: null,
    };
  }
  render() {
    return (
      <div className="new-child">
        <form>
          <label>
            First name
            <br />
            <input type="text"></input>
          </label>
        </form>
      </div>
    );
  }
}

export default NewChild;

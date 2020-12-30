import React, { Component } from "react";

import DatePicker from "react-datepicker";

export class NewChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      middle_name: "",
      last_name: "",
      d_o_b: null,
      gender: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    return (
      <div className="new-child">
        <h3>Add child</h3>
        <form>
          <label>
            First name
            <br />
            <input
              type="text"
              name="first_name"
              autoComplete="off"
              value={this.state.first_name}
            ></input>
          </label>
          <br />
          <label>
            Middle name
            <br />
            <input
              type="text"
              autoComplete="no"
              name="middle_name"
              value={this.state.middle_name}
            ></input>
          </label>
          <br />
          <label>
            Last name
            <br />
            <input
              type="text"
              autoComplete="no"
              name="last_name"
              value={this.state.last_name}
            ></input>
          </label>
          <br />
          <label htmlFor="birthday">Date of birth</label>

          <br />
          <DatePicker
            id="birthday"
            shouldCloseOnSelect={true}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            autoComplete="off"
          />
          <br />

          <label>
            Gender
            <br />
            <select>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <br />

          <label>
            Father
            <br />
            <select>
              <option>Gerald Stephen Ravis</option>
            </select>
          </label>
          <br />
          <br />
          <input type="submit" value="Save"></input>
        </form>
      </div>
    );
  }
}

export default NewChild;

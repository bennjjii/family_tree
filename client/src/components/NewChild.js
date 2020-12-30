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
      targetParent: this.props.target,
      targetParentGender: this.props.targetParentGender,
      otherParent: this.props.targetSpouses[0].uuid,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBirth = this.handleChangeBirth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeBirth(date) {
    this.setState(
      {
        d_o_b: date,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="new-child" style={this.props.newChildStyle}>
        <h3>Add child</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name
            <br />
            <input
              type="text"
              name="first_name"
              autoComplete="off"
              value={this.state.first_name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
            onChange={this.handleChangeBirth}
            selected={this.state.d_o_b}
          />
          <br />

          <label>
            Gender
            <br />
            <select
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            >
              {" "}
              <option value="" selected disabled hidden>
                ---
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <br />

          <label>
            {this.props.targetGender !== "Male" ? "Father" : "Mother"}
            <br />
            <select
              name="otherParent"
              value={this.state.otherParent}
              onChange={this.handleChange}
            >
              {this.props.targetSpouses.map((spouse) => {
                return (
                  <option value={spouse.uuid}>{spouse.name.join(" ")}</option>
                );
              })}
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

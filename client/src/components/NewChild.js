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
    this.setState({
      [name]: value,
    });
  }

  handleChangeBirth(date) {
    this.setState({
      d_o_b: date,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const response = {
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      father:
        this.state.targetParentGender === "Male"
          ? this.state.targetParent
          : this.state.otherParent,
      mother:
        this.state.targetParentGender === "Female"
          ? this.state.targetParent
          : this.state.otherParent,
      d_o_b: this.state.d_o_b,
      gender: this.state.gender,
    };

    this.props.submitNewChild(response);
  }

  render() {
    return (
      <div className="new-child">
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
            scrollableYearDropdown
            yearDropdownItemNumber={40}
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

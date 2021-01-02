import React, { Component } from "react";

import DatePicker from "react-datepicker";

export class NewParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      np_first_name: "",
      np_middle_name: "",
      np_last_name: "",
      np_gender: null,
      target_d_o_b: null,
      mother: this.props.targetMother,
      father: this.props.targetFather,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
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

  handleChangeDate(date) {
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
    const response = {
      first_name: this.state.np_first_name,
      middle_name: this.state.np_middle_name,
      last_name: this.state.np_last_name,
      father:
        this.state.targetParentGender === "Male"
          ? this.state.targetParent
          : this.state.otherParent,
      mother:
        this.state.targetParentGender === "Female"
          ? this.state.targetParent
          : this.state.otherParent,
      d_o_b: this.state.target_d_o_b,
      newParentGender: this.state.np_gender,
      target_uuid: this.props.target,
    };

    this.props.submitNewChild(response);
  }

  render() {
    return (
      <div className="new-child" style={this.props.newChildStyle}>
        <h3>Add parent</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name
            <br />
            <input
              type="text"
              name="np_first_name"
              autoComplete="off"
              value={this.state.np_first_name}
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
              name="np_middle_name"
              value={this.state.np_middle_name}
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
              name="np_last_name"
              value={this.state.np_last_name}
              onChange={this.handleChange}
            ></input>
          </label>
          {/* <br />
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
            onChange={this.handleChangeDate}
            selected={this.state.d_o_b}
          />*/}
          <br />

          <label>
            Gender
            <br />
            <select
              name="np_gender"
              value={this.state.np_gender}
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

          <input type="submit" value="Save"></input>
        </form>
      </div>
    );
  }
}

export default NewParent;

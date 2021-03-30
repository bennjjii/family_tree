import React, { Component } from "react";

import DatePicker from "react-datepicker";

export class NewSpouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      middle_name: "",
      last_name: "",
      d_o_mar: null,
      target_uuid: this.props.uuid_target,
      gender: this.props.target_gender,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMarriageDate = this.handleChangeMarriageDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleChangeMarriageDate(date) {
    this.setState({
      d_o_mar: date,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const response = {
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      d_o_mar: this.state.d_o_mar,
      target_uuid: this.state.target_uuid,
      gender: this.state.gender,
    };

    this.props.submitNewSpouse(response);
  }

  render() {
    return (
      <div className="new-child">
        <h3>Add spouse</h3>
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
          <label htmlFor="marriageDate">Date of marriage</label>

          <br />
          <DatePicker
            id="marriageDate"
            shouldCloseOnSelect={true}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={40}
            autoComplete="off"
            onChange={this.handleChangeMarriageDate}
            selected={this.state.d_o_mar}
            maxDate={new Date()}
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

          <br />
          <br />
          <input type="submit" value="Save"></input>
        </form>
      </div>
    );
  }
}

export default NewSpouse;

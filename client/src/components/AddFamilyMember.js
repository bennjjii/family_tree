import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export class AddFamilyMember extends Component {
  constructor() {
    super();
    this.state = {
      uuid_family_member: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      d_o_b: "",
      d_o_d: "",
      gender: "Male",
    };

    this.onChangeBirth = this.onChangeBirth.bind(this);
    this.onChangeDeath = this.onChangeDeath.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      d_o_b: this.state.d_o_b,
      d_o_d: this.state.d_o_d,
      gender: this.state.gender,
    };

    axios.post("http://localhost:5000/add_family_member", user);
  }

  handleChange(e) {
    const { name, value, type } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onChangeBirth(date) {
    this.setState({
      d_o_b: date,
    });
  }

  onChangeDeath(date) {
    this.setState({
      d_o_d: date,
    });
  }

  render() {
    return (
      <div className="IdCard">
        <div className="new-person-form form-group">
          <h3>Add Family Member</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              First name
              <br />
              <input
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
              ></input>
            </label>
            <br />
            <label>
              Middle name
              <br />
              <input
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
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleChange}
              ></input>
            </label>
            <br />
            <br />
            <label htmlFor="birthday">Date of birth</label>
            <br />
            <DatePicker
              id="birthday"
              selected={this.state.d_o_b}
              onChange={this.onChangeBirth}
              shouldCloseOnSelect={true}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
            />
            <br />
            <br />
            <label htmlFor="death">Date of death</label>
            <br />
            <DatePicker
              id="death"
              selected={this.state.d_o_d}
              onChange={this.onChangeDeath}
              shouldCloseOnSelect={true}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
            />
            <br />
            <br />
            <select
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br />
            <br />
            <input type="submit" value="Save"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default AddFamilyMember;

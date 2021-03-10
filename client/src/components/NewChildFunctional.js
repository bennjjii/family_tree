import React, { Component, useState } from "react";

import DatePicker from "react-datepicker";

const NewChild = (props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    d_o_b: null,
    gender: null,
    targetParent: props.target,
    targetParentGender: props.targetParentGender,
    otherParent: props.targetSpouses[0].uuid,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeBirth = (date) => {
    setFormData({
      ...formData,
      d_o_b: date,
    });
    //   this.setState({
    //     d_o_b: date,
    //   });
  };

  const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const response = {
    //     first_name: this.state.first_name,
    //     middle_name: this.state.middle_name,
    //     last_name: this.state.last_name,
    //     father:
    //       this.state.targetParentGender === "Male"
    //         ? this.state.targetParent
    //         : this.state.otherParent,
    //     mother:
    //       this.state.targetParentGender === "Female"
    //         ? this.state.targetParent
    //         : this.state.otherParent,
    //     d_o_b: this.state.d_o_b,
    //     gender: this.state.gender,
    //   };
    //   this.props.submitNewChild(response);
  };

  return (
    <div className="new-child">
      <h3>Add child</h3>
      <form onSubmit={handleSubmit}>
        <label>
          First name
          <br />
          <input
            type="text"
            name="first_name"
            autoComplete="off"
            value={formData.first_name}
            onChange={handleChange}
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
            value={formData.middle_name}
            onChange={handleChange}
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
            value={formData.last_name}
            onChange={handleChange}
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
          onChange={handleChangeBirth}
          selected={formData.d_o_b}
        />
        <br />

        <label>
          Gender
          <br />
          <select name="gender" value={formData.gender} onChange={handleChange}>
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
          {props.targetGender !== "Male" ? "Father" : "Mother"}
          <br />
          <select
            name="otherParent"
            value={formData.otherParent}
            onChange={handleChange}
          >
            {props.targetSpouses.map((spouse) => {
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
};

export default NewChild;

import React, { useState } from "react";

import DatePicker from "react-datepicker";

const NewSpouse = (props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    d_o_b: null,
    uuid_target: props.state.target.uuid,
    d_o_mar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeMarriageDate = (date) => {
    setFormData({
      ...formData,
      d_o_mar: date,
    });
  };

  const handleChangeDob = (date) => {
    setFormData({
      ...formData,
      d_o_b: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.submitNewSpouse(formData);
  };

  return (
    <div className="new-child">
      <h3>Add spouse</h3>
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
        <label htmlFor="dob">Date of birth</label>

        <br />
        <DatePicker
          id="dob"
          shouldCloseOnSelect={true}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={40}
          autoComplete="off"
          onChange={handleChangeDob}
          selected={formData.d_o_b}
          maxDate={new Date()}
        />
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
          onChange={handleChangeMarriageDate}
          selected={formData.d_o_mar}
          maxDate={new Date()}
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

        <br />
        <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};

export default NewSpouse;

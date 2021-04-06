import React, { useState } from "react";

import DatePicker from "react-datepicker";

//this should add a new parent, d_o_b, and give the option to add a marriage if the other parent exists
//it should also give the option to set a married person as the other parent

//this should have a select which allows the selection of a parent's spouse, or a siblings parent

export const NewParent = (props) => {
  //enumerate possible other parents

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    d_o_b: null,
    gender: props.UIstate.newParentGender,
    uuid_target: props.state.uuid_family_member,
    married_link_visible: props.state.mothe || props.state.fathe ? true : false,
    generate_marriage: props.state.mothe || props.state.fathe ? true : false,
    d_o_mar: null,
    bride: props.state.mothe ? props.state.mothe.uuid_family_member : null,
    groom: props.state.fathe ? props.state.fathe.uuid_family_member : null,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeBirth = (date) => {
    setFormData({
      ...formData,
      d_o_b: date,
    });
  };

  const handleChangeMarriageDate = (date) => {
    setFormData({
      ...formData,
      d_o_mar: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitNewParent(formData);
  };

  return (
    <div className="new-child">
      <h3>Add parent</h3>
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
          maxDate={new Date()}
          autoComplete="off"
          onChange={handleChangeBirth}
          selected={formData.d_o_b}
        />
        <br /> <br />
        <div
          id="generate-marriage"
          style={
            formData.married_link_visible
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <input
            type="checkbox"
            name="generate_marriage"
            checked={formData.generate_marriage}
            onChange={handleChange}
          ></input>
          &nbsp;
          <label htmlFor="generate_marriage">
            Married to&nbsp;
            {props.state.fathe
              ? props.state.fathe.first_name + " " + props.state.fathe.last_name
              : props.state.mothe
              ? props.state.mothe.first_name + " " + props.state.mothe.last_name
              : ""}
            ?
          </label>
          <br />
          <label htmlFor="d_o_mar">Date of marriage</label>
          <br />
          <DatePicker
            id="d_o_mar"
            shouldCloseOnSelect={true}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={40}
            maxDate={new Date()}
            autoComplete="off"
            onChange={handleChangeMarriageDate}
            selected={formData.d_o_mar}
          />
          <br /> <br />
        </div>
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};

export default NewParent;

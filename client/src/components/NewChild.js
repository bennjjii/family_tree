import React, { useState } from "react";

import DatePicker from "react-datepicker";

//this should add a new person and d_o_b, with the target as one parent,
// and an option of a married partner, or a partner who has already also been a parent of a sibling

const NewChild = (props) => {
  //figure out possible mothers/fathers

  const allParents = [
    ...props.state.children.map((child) => {
      return {
        name:
          props.state.gender === "Male"
            ? child.mothe.first_name +
              " " +
              child.mothe.middle_name +
              " " +
              child.mothe.last_name
            : child.fathe.first_name +
              " " +
              child.fathe.middle_name +
              " " +
              child.fathe.last_name,
        uuid:
          props.state.gender === "Male"
            ? child.mothe.uuid_family_member
            : child.fathe.uuid_family_member,
      };
    }),
    ...props.state.spouses.map((spouse) => {
      return {
        name:
          props.state.gender === "Male"
            ? spouse.brid.first_name +
              " " +
              spouse.brid.middle_name +
              " " +
              spouse.brid.last_name
            : spouse.groo.first_name +
              " " +
              spouse.groo.middle_name +
              " " +
              spouse.groo.last_name,
        uuid:
          props.state.gender === "Male"
            ? spouse.brid.uuid_family_member
            : spouse.groo.uuid_family_member,
      };
    }),
  ];
  //remove duplicates
  let temp = {};
  for (let i = 0; i < allParents.length; i++) {
    temp[allParents[i].uuid] = allParents[i].name;
  }
  let reducedParents = [];
  for (let i in temp) {
    reducedParents.push({ name: temp[i], uuid: i });
  }

  console.log(reducedParents);

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    d_o_b: null,
    gender: null,
    father:
      props.state.gender === "Male" ? props.state.uuid : reducedParents[0].uuid,
    mother:
      props.state.gender === "Female"
        ? props.state.uuid
        : reducedParents[0].uuid,
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      father: formData.father,
      mother: formData.mother,
      d_o_b: formData.d_o_b,
      gender: formData.gender,
    };
    props.submitNewChild(response);
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
          maxDate={new Date()}
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
          {props.state.gender !== "Male" ? "Father" : "Mother"}
          <br />
          {/* //here gives you option to choose spouse or if another child exists  */}
          <select
            name={props.state.gender !== "Male" ? "father" : "mother"}
            value={
              props.state.gender !== "Male" ? formData.father : formData.mother
            }
            onChange={handleChange}
          >
            {reducedParents.map((parent) => {
              return <option value={parent.uuid}>{parent.name}</option>;
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

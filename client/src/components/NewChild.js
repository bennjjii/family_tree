import React, { useState } from "react";

import DatePicker from "react-datepicker";

//this should add a new person and d_o_b, with the target as one parent,
// and an option of a married partner, or a partner who has already also been a parent of a sibling

//now need to be able to add a child if there is only one parent

const NewChild = (props) => {
  //figure out possible mothers/fathers

  let reducedParents = null;
  let allParents = [
    ...(props.state.mothe || props.state.fathe
      ? props.state.children.map((child) => {
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
        })
      : []),
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

  console.log(allParents);
  //remove duplicates
  let t = {};
  for (let i = 0; i < allParents.length; i++) {
    t[allParents[i].uuid] = allParents[i].name;
  }
  reducedParents = [];
  for (let i in t) {
    //output reduced list
    reducedParents.push({ name: t[i], uuid: i });
  }

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    d_o_b: null,
    gender: null,
    father:
      props.state.gender === "Male"
        ? props.state.uuid_family_member
        : reducedParents.length
        ? reducedParents[0].uuid
        : null,
    mother:
      props.state.gender === "Female"
        ? props.state.uuid_family_member
        : reducedParents.length
        ? reducedParents[0].uuid
        : null,
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
    props.submitNewChild(formData);
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

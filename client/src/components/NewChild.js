import React, { useState, useEffect } from "react";
import _fn from "./fullName";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";

//this should add a new person and d_o_b, with the target as one parent,
// and an option of a married partner, or a partner who has already also been a parent of a sibling

//now need to be able to add a child if there is only one parent

//and need to be able to choose to add a child without a mother even if one exists

const NewChild = (props) => {
  moment.tz.setDefault("UTC");
  //figure out possible mothers/fathers

  let reducedParents = null;
  let allParents = [
    //possible mothers via other children
    ...props.state.children.reduce((acc, child) => {
      if (props.state.gender === "Male" && child.mothe) {
        return acc.concat({
          name: _fn(child.mothe),
          // child.mothe.first_name +
          // " " +
          // child.mothe.middle_name +
          // " " +
          // child.mothe.last_name,
          uuid: child.mothe.uuid_family_member,
        });
      }
      if (props.state.gender === "Female" && child.fathe) {
        return acc.concat({
          name: _fn(child.fathe),
          // child.fathe.first_name +
          // " " +
          // child.fathe.middle_name +
          // " " +
          // child.fathe.last_name,
          uuid: child.fathe.uuid_family_member,
        });
      }

      return acc;
    }, []),
    //possible mothers via spouses
    ...props.state.spouses.map((spouse) => {
      return {
        name:
          props.state.gender === "Male"
            ? _fn(spouse.brid)
            : // spouse.brid.first_name +
              //   " " +
              //   spouse.brid.middle_name +
              //   " " +
              //   spouse.brid.last_name
              _fn(spouse.groo),

        // spouse.groo.first_name +
        //   " " +
        //   spouse.groo.middle_name +
        //   " " +
        //   spouse.groo.last_name,
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
        : //are these always gonna be male if the target gender is female?
        reducedParents.length
        ? reducedParents[0].uuid
        : null,
    mother:
      props.state.gender === "Female"
        ? props.state.uuid_family_member
        : reducedParents.length
        ? reducedParents[0].uuid
        : null,
  });

  useEffect(() => {
    console.log(formData);
    console.log(reducedParents);
  }, [formData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    //console.log(eval(value));
    if (value == 0) {
      value = null;
    }
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
    props.submitNewChild({
      ...formData,
      d_o_b: moment(
        `${formData.d_o_b.getFullYear()}-${
          formData.d_o_b.getMonth() + 1
        }-${formData.d_o_b.getDate()}`,
        "YYYY-MM-DD"
      ).toISOString(),
    });
  };

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <h3>Add child</h3>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input
          type="text"
          name="first_name"
          autoComplete="off"
          value={formData.first_name}
          onChange={handleChange}
        ></input>

        <label>Middle name</label>
        <input
          type="text"
          autoComplete="no"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
        ></input>

        <label>Last name</label>

        <input
          type="text"
          autoComplete="no"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        ></input>

        <label htmlFor="birthday">Date of birth</label>

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
        <label>Gender</label>

        <select name="gender" value={formData.gender} onChange={handleChange}>
          {" "}
          <option value="" selected disabled hidden>
            ---
          </option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>{props.state.gender !== "Male" ? "Father" : "Mother"}</label>

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
          <option value={0}>No other parent</option>
        </select>

        <input type="submit" value="Save" className="bubble-button"></input>
      </form>
    </div>
  );
};

export default NewChild;

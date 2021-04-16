import React, { useState, useEffect } from "react";
import _fn from "./fullName";

import DatePicker from "react-datepicker";

//this should add a new parent, d_o_b, and give the option to add a marriage if the other parent exists
//it should also give the option to set a married person as the other parent

//this should have a select which allows the selection of a parent's spouse, or a sibling's parent

//if existing parent options exist, the user will be presented with these options and the ability to save
//they will also have the option to add a new parent
//if there are no parent options, the usual new parent form will be presented

//will either create a new parent, or will update a child with a uuid

//this should grey out create marriage box if parents are already married
//otherwise we create two of the same marriages

export const NewParent = (props) => {
  //enumerate other possible parents

  let allParents = [
    //via other siblings
    ...(props.state.siblingsViaFather
      ? props.state.siblingsViaFather.reduce((total, sibling) => {
          if (sibling.mothe) {
            return total.concat({
              name: _fn(sibling.mothe),
              // sibling.mothe.first_name +
              // " " +
              // sibling.mothe.middle_name +
              // " " +
              // sibling.mothe.last_name,
              uuid: sibling.mothe.uuid_family_member,
            });
          } else {
            return total;
          }
        }, [])
      : []),
    ...(props.state.siblingsViaMother
      ? props.state.siblingsViaMother.reduce((total, sibling) => {
          if (sibling.fathe) {
            return total.concat({
              name: _fn(sibling.fathe),
              // sibling.fathe.first_name +
              // " " +
              // sibling.fathe.middle_name +
              // " " +
              // sibling.fathe.last_name,

              uuid: sibling.mothe.uuid_family_member,
            });
          } else {
            return total;
          }
        }, [])
      : []),
    //spouses
    ...(props.state.fathersWife
      ? props.state.fathersWife.map((marriage) => {
          return {
            name: _fn(marriage.brid),
            // marriage.brid.first_name +
            // " " +
            // marriage.brid.middle_name +
            // " " +
            // marriage.brid.last_name,
            uuid: marriage.brid.uuid_family_member,
          };
        })
      : []),
    ...(props.state.mothersHusband
      ? props.state.mothersHusband.map((marriage) => {
          return {
            name: _fn(marriage.groo),
            // marriage.groo.first_name +
            // " " +
            // marriage.groo.middle_name +
            // " " +
            // marriage.groo.last_name,
            uuid: marriage.groo.uuid_family_member,
          };
        })
      : []),
  ];
  let t = {};
  for (let i = 0; i < allParents.length; i++) {
    t[allParents[i].uuid] = allParents[i].name;
  }
  let reducedParents = [];
  for (let i in t) {
    reducedParents.push({ name: t[i], uuid: i });
  }

  //////////////////////////////////////////////

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    d_o_b: null,
    gender: props.UIstate.newParentGender,
    uuid_target: props.state.uuid_family_member,
    //only shows if one other parent
    married_link_visible: props.state.mothe || props.state.fathe ? true : false,
    marriage_checked: props.state.mothe || props.state.fathe ? true : false,
    already_married_to_selected: false,
    d_o_mar: null,
    bride: props.state.mothe ? props.state.mothe.uuid_family_member : null,
    groom: props.state.fathe ? props.state.fathe.uuid_family_member : null,
    existing_parent: reducedParents.length ? reducedParents[0].uuid : "new",
  });

  useEffect(() => {
    //check here whether already married
    //bloated and can be refactored but right now this works so do it later
    console.log(formData);
    let alreadyMarried = false;

    if (props.state.fathersWife) {
      props.state.fathersWife.forEach((marriage) => {
        if (marriage.brid.uuid_family_member === formData.existing_parent) {
          alreadyMarried = true;
        }
      });
    }
    if (props.state.mothe) {
      props.state.mothersHusband.forEach((marriage) => {
        if (marriage.groo.uuid_family_member === formData.existing_parent) {
          alreadyMarried = true;
        }
      });
    }
    setFormData({
      ...formData,
      already_married_to_selected: alreadyMarried,
    });
  }, []);

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
      {/* {formData.existing_parent} */}
      <form onSubmit={handleSubmit}>
        <div
          id="new-parent-select"
          style={
            reducedParents.length ? { display: "block" } : { display: "none" }
          }
        >
          <label>
            Parent
            <br />
            <select
              name={"existing_parent"}
              onChange={handleChange}
              value={formData.existing_parent}
            >
              {reducedParents.map((parent) => {
                return <option value={parent.uuid}>{parent.name}</option>;
              })}
              <option value={"new"}>New parent</option>
            </select>
          </label>
          <br />
        </div>
        <div
          id="new-parent-details"
          style={
            formData.existing_parent === "new"
              ? { display: "block" }
              : { display: "none" }
          }
        >
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
          {formData.already_married_to_selected
            ? "Already married to" +
              props.state.first_name +
              " " +
              props.state.last_name
            : ""}
        </div>
        <div
          id="generate-marriage"
          style={
            formData.married_link_visible &&
            !formData.already_married_to_selected
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <br />
          <input
            type="checkbox"
            name="marriage_checked"
            checked={formData.marriage_checked}
            onChange={handleChange}
          ></input>
          &nbsp;
          <label htmlFor="marriage_checked">
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

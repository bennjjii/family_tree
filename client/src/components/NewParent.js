import React, { useState } from "react";

import DatePicker from "react-datepicker";

//this should add a new parent, d_o_b, and give the option to add a marriage if the other parent exists
//it should also give the option to set a married person as the other parent

//this should have a select which allows the selection of a parent's spouse, or a siblings parent

export const NewParent = (props) => {
  //enumerate possible other parents

  let reducedParents = null;
  let allParents = [
    //siblingsViaParents
    ...(props.state.siblingsViaFather
      ? props.state.siblingsViaFather.reduce((total, sibling) => {
          if (sibling.mothe) {
            return total.concat({
              name:
                sibling.mothe.first_name +
                " " +
                sibling.mothe.middle_name +
                " " +
                sibling.mothe.last_name,
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
              name:
                sibling.fathe.first_name +
                " " +
                sibling.fathe.middle_name +
                " " +
                sibling.fathe.last_name,

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
            name:
              marriage.brid.first_name +
              " " +
              marriage.brid.middle_name +
              " " +
              marriage.brid.last_name,
            uuid: marriage.brid.uuid_family_member,
          };
        })
      : []),
    ...(props.state.mothersHusband
      ? props.state.mothersHusband.map((marriage) => {
          return {
            name:
              marriage.groo.first_name +
              " " +
              marriage.groo.middle_name +
              " " +
              marriage.groo.last_name,
            uuid: marriage.groo.uuid_family_member,
          };
        })
      : []),
  ];

  // console.log(allParents);
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

  console.log(reducedParents);

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
          Existing parent
          <br />
          <select name={"existing_parent"} onChange={handleChange}>
            {reducedParents.map((parent) => {
              return <option value={parent.uuid}>{parent.name}</option>;
            })}
          </select>
        </label>
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

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const EditFamilyMember = (props) => {
  const [formData, setFormData] = useState({
    uuid_family_member: undefined,
    first_name: undefined,
    middle_name: undefined,
    last_name: undefined,
    d_o_b: null,
  });

  useEffect(() => {
    switch (props.mode) {
      case "father":
        setFormData({
          uuid_family_member: props.state.fathe.uuid_family_member,
          first_name: props.state.fathe.first_name,
          middle_name: props.state.fathe.middle_name,
          last_name: props.state.fathe.last_name,
          d_o_b: new Date(props.state.fathe.d_o_b),
        });
        break;
      case "mother":
        setFormData({
          uuid_family_member: props.state.mothe.uuid_family_member,
          first_name: props.state.mothe.first_name,
          middle_name: props.state.mothe.middle_name,
          last_name: props.state.mothe.last_name,
          d_o_b: new Date(props.state.mothe.d_o_b),
        });
        break;
      case "child":
        let selectedChild = props.state.children.filter((child) => {
          return child.uuid_family_member === props.UUID;
        })[0];
        setFormData({
          uuid_family_member: selectedChild.uuid_family_member,
          first_name: selectedChild.first_name,
          middle_name: selectedChild.middle_name,
          last_name: selectedChild.last_name,
          d_o_b: new Date(selectedChild.d_o_b),
        });
        break;
    }
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
    console.log(formData.d_o_b);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitEditedFamilyMember(formData);
  };

  return (
    <div className="edit-family-member">
      <form onSubmit={handleSubmit}>
        <h3>Edit</h3>

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

        {/* <label>
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
        <br /> */}
        <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};
export default EditFamilyMember;

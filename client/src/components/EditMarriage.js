import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const EditMarriage = (props) => {
  const [formData, setFormData] = useState({
    d_o_mar: null,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitNewFamilyMemberDetails(formData);
  };

  return (
    <div className="edit-family-member">
      <form onSubmit={handleSubmit}>
        <h3>Edit marriage</h3>

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
        <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};
export default EditMarriage;

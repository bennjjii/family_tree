import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const EditMarriage = (props) => {
  const [formData, setFormData] = useState({
    uuid_marriage: undefined,
    d_o_mar: undefined,
  });

  useEffect(() => {
    let selectedMarriage = props.state.spouses.filter((marriage) => {
      return marriage.uuid_marriage === props.UUID;
    })[0];
    setFormData({
      d_o_mar: new Date(selectedMarriage.d_o_mar),
      uuid_marriage: selectedMarriage.uuid_marriage,
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

  const handleChangeMarriageDate = (date) => {
    setFormData({
      ...formData,
      d_o_mar: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitEditedMarriageDetails(formData);
  };

  return (
    <div className="edit-family-member">
      <form onSubmit={handleSubmit}>
        <h3>Edit marriage</h3>

        <DatePicker
          id="marriage"
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

        <br />
        <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};
export default EditMarriage;
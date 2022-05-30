import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import { useForm, Controller } from "react-hook-form";
import FormError from "./FormError";

const EditMarriage = (props) => {
  const [formData, setFormData] = useState({
    uuid_marriage: undefined,
  });
  moment.tz.setDefault("UTC");

  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm();

  const onSubmit = (data) => {
    // console.log(data.d_o_mar);
    // console.log(formState);

    props.submitEditedMarriageDetails({
      ...formData,
      d_o_mar: moment(
        `${data.d_o_mar.getFullYear()}-${
          data.d_o_mar.getMonth() + 1
        }-${data.d_o_mar.getDate()}`,
        "YYYY-MM-DD"
      ).toISOString(),
    });
  };

  useEffect(() => {
    let selectedMarriage = props.state.spouses.filter((marriage) => {
      return marriage.uuid_marriage === props.UUID;
    })[0];
    setFormData({
      uuid_marriage: selectedMarriage.uuid_marriage,
    });
    setValue(
      "d_o_mar",
      selectedMarriage.d_o_mar ? new Date(selectedMarriage.d_o_mar) : undefined
    );
  }, []);

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit marriage</h3>
        <label>Date of marriage:</label>
        <div style={{ position: "relative" }}>
          <Controller
            control={control}
            name="d_o_mar"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                id="marriage"
                shouldCloseOnSelect={true}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={40}
                maxDate={new Date()}
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                inputRef={ref}
              />
            )}
            rules={{ required: true }}
          />
          {formState.errors.d_o_mar ? (
            <FormError message="please enter a date" />
          ) : null}
        </div>

        <input className="bubble-button" type="submit" value="Save"></input>
      </form>
    </div>
  );
};
export default EditMarriage;

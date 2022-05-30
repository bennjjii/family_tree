import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import dateSanitiser from "./services/dateSanitiser";
import { useForm, Controller } from "react-hook-form";
import FormError from "./FormError";

const EditFamilyMember = (props) => {
  const { register, handleSubmit, formState, control, setValue } = useForm();
  const [formData, setFormData] = useState({
    uuid_family_member: undefined,
  });

  useEffect(() => {
    switch (props.mode) {
      case "father":
        setFormData({
          uuid_family_member: props.state.fathe.uuid_family_member,
        });
        setValue("first_name", props.state.fathe.first_name);
        setValue("middle_name", props.state.fathe.middle_name);
        setValue("last_name", props.state.fathe.last_name);
        setValue(
          "d_o_b",
          props.state.fathe.d_o_b
            ? new Date(props.state.fathe.d_o_b)
            : undefined
        );
        break;
      case "mother":
        setFormData({
          uuid_family_member: props.state.mothe.uuid_family_member,
        });
        setValue("first_name", props.state.mothe.first_name);
        setValue("middle_name", props.state.mothe.middle_name);
        setValue("last_name", props.state.mothe.last_name);
        setValue(
          "d_o_b",
          props.state.mothe.d_o_b
            ? new Date(props.state.mothe.d_o_b)
            : undefined
        );
        break;
      case "child":
        let selectedChild = props.state.children.filter((child) => {
          return child.uuid_family_member === props.UUID;
        })[0];
        setFormData({
          uuid_family_member: selectedChild.uuid_family_member,
        });
        setValue("first_name", selectedChild.first_name);
        setValue("middle_name", selectedChild.middle_name);
        setValue("last_name", selectedChild.last_name);
        setValue(
          "d_o_b",
          selectedChild.d_o_b ? new Date(selectedChild.d_o_b) : undefined
        );
        break;
      case "target":
        setFormData({
          uuid_family_member: props.state.uuid_family_member,
        });
        setValue("first_name", props.state.first_name);
        setValue("middle_name", props.state.middle_name);
        setValue("last_name", props.state.last_name);
        setValue(
          "d_o_b",
          props.state.d_o_b ? new Date(props.state.d_o_b) : undefined
        );
        break;
    }
  }, []);

  const onSubmit = (data) => {
    //console.log(dateSanitiser(data.d_o_b));
    let finalForm = {
      ...data,
      uuid_family_member: formData.uuid_family_member,
      d_o_b: dateSanitiser(data.d_o_b),
    };

    props.submitEditedFamilyMember(finalForm);
  };

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit</h3>

        <label>First name</label>
        <div style={{ position: "relative" }}>
          <input
            {...register("first_name", {
              required: true,
              pattern: /^[a-zA-Z0-9]*$/g,
            })}
            type="text"
            autoComplete="off"
          />{" "}
          {formState.errors.first_name &&
            formState.errors.first_name.type === "required" && (
              <FormError message="please enter a name :)" />
            )}
          {formState.errors.first_name &&
            formState.errors.first_name.type === "pattern" && (
              <FormError message="please do not use spaces" />
            )}
        </div>

        <label>Middle name</label>
        <div style={{ position: "relative" }}>
          <input
            {...register("middle_name", {
              pattern: /^[a-zA-Z0-9]*$/g,
            })}
            type="text"
            autoComplete="no"
          />
          {formState.errors.middle_name && (
            <FormError message="please do not use spaces" />
          )}
        </div>

        <label>Last name</label>
        <div style={{ position: "relative" }}>
          <input
            {...register("last_name", {
              pattern: /^[a-zA-Z0-9]*$/g,
            })}
            type="text"
            autoComplete="no"
          />
          {formState.errors.last_name && (
            <FormError message="please do not use spaces" />
          )}
        </div>

        <label htmlFor="birthday">Date of birth</label>
        <div style={{ position: "relative" }}>
          <Controller
            control={control}
            name="d_o_b"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                id="birthday"
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
            rules={{
              required: false,
            }}
          />
          {formState.errors.d_o_b && (
            <FormError message="please enter a date" />
          )}
        </div>

        <input type="submit" value="Save" className="bubble-button" />
      </form>
    </div>
  );
};
export default EditFamilyMember;

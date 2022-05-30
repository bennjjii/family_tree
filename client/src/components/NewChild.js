import React, { useState, useEffect } from "react";
import _fn from "./fullName";
import dateSanitiser from "./services/dateSanitiser";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import FormError from "./FormError";

//this should add a new person and d_o_b, with the target as one parent,
// and an option of a married partner, or a partner who has already also been a parent of a sibling

//now need to be able to add a child if there is only one parent

//and need to be able to choose to add a child without a mother even if one exists

const NewChild = (props) => {
  const { register, handleSubmit, formState, control, setValue } = useForm();

  //figure out possible mothers/fathers

  let reducedParents = null;
  let allParents = [
    //possible mothers via other children
    ...props.state.children.reduce((acc, child) => {
      if (props.state.gender === "Male" && child.mothe) {
        return acc.concat({
          name: _fn(child.mothe),
          uuid: child.mothe.uuid_family_member,
        });
      }
      if (props.state.gender === "Female" && child.fathe) {
        return acc.concat({
          name: _fn(child.fathe),
          uuid: child.fathe.uuid_family_member,
        });
      }

      return acc;
    }, []),
    //possible mothers via spouses
    ...props.state.spouses.map((spouse) => {
      return {
        name:
          props.state.gender === "Male" ? _fn(spouse.brid) : _fn(spouse.groo),

        uuid:
          props.state.gender === "Male"
            ? spouse.brid.uuid_family_member
            : spouse.groo.uuid_family_member,
      };
    }),
  ];

  //console.log(allParents);
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

  // const handleChangeBirth = (date) => {
  //   setFormData({
  //     ...formData,
  //     d_o_b: date,
  //   });
  // };

  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   props.submitNewChild({
  //     ...formData,
  //     d_o_b: moment(
  //       `${formData.d_o_b.getFullYear()}-${
  //         formData.d_o_b.getMonth() + 1
  //       }-${formData.d_o_b.getDate()}`,
  //       "YYYY-MM-DD"
  //     ).toISOString(),
  //   });
  // };

  const onSubmit = (data) => {
    console.log(data);
    let finalForm = {
      ...data,
      d_o_b: dateSanitiser(data.d_o_b),
      father: formData.father,
      mother: formData.mother,
    };
    console.log(finalForm);
    props.submitNewChild(finalForm);
  };

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <h3>Add child</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First name</label>
        <div style={{ position: "relative" }}>
          <input
            {...register("first_name", {
              required: true,
              pattern: /^[a-zA-Z0-9]*$/g,
            })}
            type="text"
            autoComplete="off"
          />
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
          />{" "}
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
          />{" "}
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
        </div>
        <br />
        <label>Gender</label>
        <div style={{ position: "relative" }}>
          <select
            {...register("gender", {
              validate: (v) => {
                return !!v;
              },
            })}
          >
            {" "}
            <option value="" selected disabled hidden>
              ---
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>
          {formState.errors.gender && (
            <FormError message="please select an option" />
          )}
        </div>

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

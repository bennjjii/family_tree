import React, { useState, useEffect } from "react";
import _fn from "./fullName";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import FormError from "./FormError";
import dateSanitiser from "./services/dateSanitiser";

//this should add a new parent, d_o_b, and give the option to add a marriage if the other parent exists
//it should also give the option to set a married person as the other parent

//this should have a select which allows the selection of a parent's spouse, or a sibling's parent

//if existing parent options exist, the user will be presented with these options and the ability to save
//they will also have the option to add a new parent
//if there are no parent options, the usual new parent form will be presented

//will either create a new parent, or will update a child with a uuid

//this should grey out create marriage box if parents are already married
//otherwise we create two of the same marriages

const NewParent = (props) => {
  const { register, handleSubmit, formState, control, setValue } = useForm();

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

              uuid: sibling.fathe.uuid_family_member,
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

            uuid: marriage.brid.uuid_family_member,
          };
        })
      : []),
    ...(props.state.mothersHusband
      ? props.state.mothersHusband.map((marriage) => {
          return {
            name: _fn(marriage.groo),
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
    d_o_b: undefined,
    gender: props.UIstate.newParentGender,
    uuid_target: props.state.uuid_family_member,
    //only shows if one other parent
    married_link_visible: props.state.mothe || props.state.fathe ? true : false,
    marriage_checked: props.state.mothe || props.state.fathe ? true : false,
    already_married_to_selected: false,
    d_o_mar: undefined,
    bride: props.state.mothe ? props.state.mothe.uuid_family_member : null,
    groom: props.state.fathe ? props.state.fathe.uuid_family_member : null,
    existing_parent: reducedParents.length ? reducedParents[0].uuid : "new",
  });

  useEffect(() => {
    //check here whether already married
    // console.log(formData);
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

  const onSubmit = (data) => {
    let finalForm = {
      ...formData,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      d_o_b: dateSanitiser(data.d_o_b),
      d_o_mar: dateSanitiser(data.d_o_mar),
    };
    props.submitNewParent(finalForm);
  };

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <h3>Add parent</h3>
      {/* {formData.existing_parent} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          id="new-parent-select"
          style={
            reducedParents.length ? { display: "block" } : { display: "none" }
          }
        >
          <label>Parent</label>
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
        </div>
        {/* determines whether to show new parent form */}
        <div
          id="new-parent-details"
          style={
            formData.existing_parent === "new"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <label>First name</label>
          <div style={{ position: "relative" }}>
            <input
              {...register("first_name", {
                validate: (v) => {
                  if (formData.existing_parent !== "new") {
                    return true;
                  } else {
                    // console.log(v);
                    return v.length > 0;
                  }
                },
                pattern: /^[a-zA-Z0-9]*$/g,
              })}
              type="text"
              autoComplete="off"
              // value={formData.first_name}
              // onChange={handleChange}
            />
            {formState.errors.first_name &&
              formState.errors.first_name.type === "validate" && (
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
              {...register("middle_name", { pattern: /^[a-zA-Z0-9]*$/g })}
              type="text"
              autoComplete="no"
            />{" "}
            {formState.errors.middle_name ? (
              <FormError message="please do not use spaces" />
            ) : null}
          </div>
          <label>Last name</label>
          <div style={{ position: "relative" }}>
            <input
              {...register("last_name", { pattern: /^[a-zA-Z0-9]*$/g })}
              type="text"
              autoComplete="no"
            />
            {formState.errors.last_name ? (
              <FormError message="please do not use spaces" />
            ) : null}
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

          {/* think this is wrong */}
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
          <hr />
          <span>
            <input
              type="checkbox"
              name="marriage_checked"
              checked={formData.marriage_checked}
              onChange={handleChange}
            ></input>
            <label htmlFor="marriage_checked">
              Married to&nbsp;
              {props.state.fathe
                ? props.state.fathe.first_name +
                  " " +
                  props.state.fathe.last_name
                : props.state.mothe
                ? props.state.mothe.first_name +
                  " " +
                  props.state.mothe.last_name
                : ""}
              ?
            </label>
          </span>
          <label htmlFor="d_o_mar">Date of marriage</label>
          <div style={{ position: "relative" }}>
            <Controller
              control={control}
              name="d_o_mar"
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
        </div>
        <input type="submit" value="Save" className="bubble-button"></input>
      </form>
    </div>
  );
};

export default NewParent;

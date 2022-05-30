import { useState, useEffect } from "react";
import _fn from "./fullName";
import dateSanitiser from "./services/dateSanitiser";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import FormError from "./FormError";

//this should allow the creation of a marriage to a partner who has already been
//employed as a parent, or a new person

//this should also give option to gather other children and insert as new spouses children
//if spouse being created is the first spouse

//checkbox for add all children should hide if target has no children -- done

const NewSpouse = (props) => {
  const { register, handleSubmit, formState, control, setValue } = useForm();

  //so check children for other parents
  let allParents = [
    ...(props.state.children
      ? props.state.children.reduce((acc, child) => {
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
        }, [])
      : []),
  ];

  let t = {};
  for (let i = 0; i < allParents.length; i++) {
    t[allParents[i].uuid] = allParents[i].name;
  }
  let reducedParents = [];
  for (let i in t) {
    //output reduced list
    reducedParents.push({ name: t[i], uuid: i });
  }

  //make list of all spouses in same format

  let allSpouses = props.state.spouses.map((spouse) => {
    return {
      name: spouse.brid ? _fn(spouse.brid) : _fn(spouse.groo),

      uuid: spouse.brid
        ? spouse.brid.uuid_family_member
        : spouse.groo.uuid_family_member,
    };
  });

  //process both lists and remove items from them if they appear in the other list

  const duplicateFilter = (arr1, arr2) => {
    return [
      ...arr1.reduce((acc, parent) => {
        let unique = true;
        arr2.forEach((item) => {
          if (item.uuid === parent.uuid) {
            unique = false;
          }
        });

        if (unique) {
          return acc.concat(parent);
        } else {
          return acc;
        }
      }, []),
      //dont need this because we dont want the option to add a parent as a spouse if is already in the list
      // ...arr2.reduce((acc, parent) => {
      //   let unique = true;
      //   arr1.forEach((item) => {
      //     if (item.uuid === parent.uuid) {
      //       unique = false;
      //     }
      //   });
      //   if (unique) {
      //     return acc.concat(parent);
      //   } else {
      //     return acc;
      //   }
      // }, []),
    ];
  };

  //testing code

  // const setA = [
  //   {
  //     name: "james",
  //     uuid: "46",
  //   },
  //   {
  //     name: "lily",
  //     uuid: "64",
  //   },
  //   {
  //     name: "harry",
  //     uuid: "764",
  //   },
  //   {
  //     name: "dudley",
  //     uuid: "9474",
  //   },
  // ];

  // const setB = [
  //   {
  //     name: "lily",
  //     uuid: "64",
  //   },
  //   {
  //     name: "james",
  //     uuid: "46",
  //   },
  //   {
  //     name: "harry",
  //     uuid: "764",
  //   },
  //   {
  //     name: "auntpetunia",
  //     uuid: "36",
  //   },
  // ];

  let filteredParents = duplicateFilter(reducedParents, allSpouses);
  // console.log(allParents);
  // console.log(allSpouses);
  // console.log(filteredParents);

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    //gender convention here is opposite of new parent
    target_gender: props.state.gender,
    d_o_b: undefined,
    uuid_target: props.state.uuid_family_member,
    d_o_mar: undefined,
    selected_parent: filteredParents.length
      ? filteredParents[0].uuid
      : undefined,
    add_existing_children: false,
    existing_children: props.state.children.map((child) => {
      return child.uuid_family_member;
    }),
  });

  // useEffect(() => {
  //   //check here whether already married
  //   //bloated and can be refactored but right now this works so do it later
  //   console.log(formData);
  //   console.log(formState.errors);
  // }, []);

  const handleChange = (e) => {
    let { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      if (value == 0) {
        value = null;
      }
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

  const handleChangeDob = (date) => {
    setFormData({
      ...formData,
      d_o_b: date,
    });
  };

  const onSubmit = (data) => {
    // console.log(formState.errors);
    // console.log(formData);
    // console.log(data);
    let finalForm = {
      ...formData,
      ...data,
      d_o_b: dateSanitiser(data.d_o_b),
      d_o_mar: dateSanitiser(data.d_o_mar),
      selected_parent: formData.selected_parent
        ? formData.selected_parent
        : null,
    };
    // console.log(finalForm);
    props.submitNewSpouse(finalForm);
  };

  return (
    <div className="idcard-form translucent-card">
      <button className="cancel-button" onClick={() => props.cancel()}>
        <i className="fas fa-times" />
      </button>
      <h3>Add spouse</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          id="select-existing-parent"
          style={
            filteredParents.length ? { display: "block" } : { display: "none" }
          }
        >
          <select
            name="selected_parent"
            onChange={handleChange}
            value={formData.selected_parent}
          >
            {filteredParents.length
              ? filteredParents.map((parent) => {
                  return <option value={parent.uuid}>{parent.name}</option>;
                })
              : null}
            <option value={0}>New spouse</option>
          </select>
        </div>
        <div
          id="new-parent"
          style={
            formData.selected_parent
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <label>First name</label>
          <div style={{ position: "relative" }}>
            <input
              {...register("first_name", {
                validate: (v) => {
                  if (!formData.selected_parent) {
                    return !!v;
                  } else {
                    return true;
                  }
                },
                pattern: /^[a-zA-Z0-9]*$/g,
              })}
              type="text"
              autoComplete="off"
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

          <label htmlFor="dob">Date of birth</label>
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
                  autoComplete="off"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  maxDate={new Date()}
                  inputRef={ref}
                />
              )}
              rules={{
                required: false,
              }}
            />
          </div>
        </div>
        <label htmlFor="marriageDate">Date of marriage</label>

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
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                maxDate={new Date()}
                inputRef={ref}
              />
            )}
            rules={{
              required: false,
            }}
          />
        </div>

        <div
          id="add-children"
          style={
            !props.state.spouses.length && formData.existing_children.length
              ? { display: "block" }
              : { display: "none" }
          }
        >
          {/* only selectable if 0 spouses exist */}
          <input
            type="checkbox"
            name="add_existing_children"
            checked={formData.add_existing_children}
            onChange={handleChange}
          ></input>{" "}
          <label htmlFor="add_existing_children">
            Add all children of&nbsp;
            {props.state.first_name}?
          </label>
        </div>

        <input type="submit" value="Save" className="bubble-button"></input>
      </form>
    </div>
  );
};

export default NewSpouse;

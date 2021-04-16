import { useState, useEffect } from "react";
import _fn from "./fullName";

import DatePicker from "react-datepicker";

//this should allow the creation of a marriage to a partner who has already been
//employed as a parent, or a new person

//this should also give option to gather other children and insert as new spouses children
//if spouse being created is the first spouse

//checkbox for add all children should hide if target has no children -- done

const NewSpouse = (props) => {
  //so check children for other parents
  let allParents = [
    ...(props.state.children
      ? props.state.children.reduce((acc, child) => {
          if (props.state.gender === "Male" && child.mothe) {
            return acc.concat({
              name: _fn(child.mothe),
              // child.mothe.first_name +
              // " " +
              // child.mothe.middle_name +
              // " " +
              // child.mothe.last_name,
              uuid: child.mothe.uuid_family_member,
            });
          }
          if (props.state.gender === "Female" && child.fathe) {
            return acc.concat({
              name: _fn(child.fathe),
              // child.fathe.first_name +
              // " " +
              // child.fathe.middle_name +
              // " " +
              // child.fathe.last_name,
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

      // spouse.brid.first_name +
      //   " " +
      //   spouse.brid.middle_name +
      //   " " +
      //   spouse.brid.last_name
      // spouse.groo.first_name +
      //   " " +
      //   spouse.groo.middle_name +
      //   " " +
      //   spouse.groo.last_name,

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
    d_o_b: null,
    uuid_target: props.state.uuid_family_member,
    d_o_mar: null,
    selected_parent: filteredParents.length ? filteredParents[0].uuid : null,
    add_existing_children: false,
    existing_children: props.state.children.map((child) => {
      return child.uuid_family_member;
    }),
  });

  useEffect(() => {
    //check here whether already married
    //bloated and can be refactored but right now this works so do it later
    console.log(formData);
  }, [formData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    props.submitNewSpouse(formData);
  };

  return (
    <div className="new-spouse-component">
      <h3>Add spouse</h3>
      <form onSubmit={handleSubmit}>
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
            <option value={0}>New parent</option>
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
          <label htmlFor="dob">Date of birth</label>

          <br />
          <DatePicker
            id="dob"
            shouldCloseOnSelect={true}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={40}
            autoComplete="off"
            onChange={handleChangeDob}
            selected={formData.d_o_b}
            maxDate={new Date()}
          />
          <br />
          <br />

          {/* <label>
            Gender
            <br />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              {" "}
              <option value="" selected disabled hidden>
                ---
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label> */}

          <br />
        </div>
        <label htmlFor="marriageDate">Date of marriage</label>
        <br />
        <DatePicker
          id="marriageDate"
          shouldCloseOnSelect={true}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={40}
          autoComplete="off"
          onChange={handleChangeMarriageDate}
          selected={formData.d_o_mar}
          maxDate={new Date()}
        />
        <br /> <br />
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
        <br /> <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};

export default NewSpouse;

import { Component, useState } from "react";

const Child = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [inputStyle, setInputStyle] = useState({
    display: "none",
  });
  const [textStyle, setTextStyle] = useState({
    display: "inline-block",
  });

  const handleClick = (e) => {
    console.log(e);
    if (editMode === false) {
      setEditMode(true);
      setInputStyle({
        display: "inline-block",
      });
      setTextStyle({
        display: "none",
      });
    } else {
      setEditMode(false);
      setInputStyle({
        display: "none",
      });
      setTextStyle({
        display: "inline-block",
      });
    }
  };

  return (
    <div key={props.child.uuid_family_member + "child"}>
      <button
        className="parents-btn"
        name={props.child.first_name}
        onClick={props.updateTarget}
        uuid={props.child.uuid_family_member}
      >
        <form>
          <input style={inputStyle}></input>
        </form>
        <span
          style={textStyle}
          uuid={props.child.uuid_family_member}
          className="child-name"
        >
          {props.child.first_name +
            " " +
            props.child.middle_name +
            " " +
            props.child.last_name}
        </span>

        <br />
        {props.child.d_o_b}
        <i onClick={handleClick} className="far fa-edit"></i>
      </button>

      <br />
    </div>
  );
};

export default Child;

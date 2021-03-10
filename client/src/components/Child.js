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
    <>
      <button
        className="parents-btn"
        name={props.name}
        onClick={props.handleUpdate}
        uuid={props.uuid}
        key={props.key + "btn"}
      >
        <form>
          <input style={inputStyle}></input>
        </form>
        <span style={textStyle} uuid={props.uuid} className="child-name">
          {props.name.join(" ")}
        </span>

        <br key={props.key + "br1"} />
        {props.d_o_b}
        <i onClick={handleClick} className="far fa-edit"></i>
      </button>

      <br key={props.key + "br2"} />
    </>
  );
};

export default Child;

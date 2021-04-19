import { useState } from "react";
import EditDelete from "./EditDelete";
import _fn from "./fullName";

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
        className="nav-btn"
        name={props.child.first_name}
        onClick={props.updateTarget}
        uuid={props.child.uuid_family_member}
      >
        {_fn(props.child)}

        <br />
        {props.child.d_o_b}
        <br />
        {props.child.gender}
        <EditDelete />
      </button>

      <br />
    </div>
  );
};

export default Child;

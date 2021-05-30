import { useState } from "react";
import EditDelete from "./EditDelete";
import _fn from "./fullName";
import { useAuth } from "./services/ProvideAuth";

const Child = (props) => {
  const thisContext = useAuth();

  return (
    <div key={props.child.uuid_family_member + "child"}>
      <button
        id="nav-btn"
        className="idcard-button transparent-card transparent-bg shadow-sm"
        name={props.child.first_name}
        onClick={props.updateTarget}
        uuid={props.child.uuid_family_member}
      >
        {_fn(props.child)}
        {/* Children: {props.child.children.length} */}
        <br />
        {props.child.d_o_b}
        <br />
        {/* {props.child.gender} */}
        {!thisContext.showPublic.publicMode && (
          <EditDelete
            source="child"
            uuid={props.child.uuid_family_member}
            permitDelete={!props.child.children.length}
          />
        )}
      </button>

      <br />
    </div>
  );
};

export default Child;

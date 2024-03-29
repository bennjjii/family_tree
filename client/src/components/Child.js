import { useState } from "react";
import EditDelete from "./EditDelete";
import _fn from "./fullName";
import { useAuth } from "./services/ProvideAuth";
import moment from "moment";

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
        disabled={thisContext.blockUI}
      >
        {!thisContext.showPublic.publicMode && (
          <EditDelete
            source="child"
            uuid={props.child.uuid_family_member}
            permitDelete={!props.child.children.length}
          />
        )}
        {_fn(props.child)}
        <br />
        {props.child.d_o_b &&
          moment(props.child.d_o_b, "YYYY-MM-DD").format("Do MMMM YYYY")}
        <br />
        {/* {props.child.gender} */}
      </button>

      <br />
    </div>
  );
};

export default Child;

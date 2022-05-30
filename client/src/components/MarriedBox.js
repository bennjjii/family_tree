import React from "react";
import EditDelete from "./EditDelete";
import { useAuth } from "./services/ProvideAuth";
import moment from "moment";
import _fn from "./fullName";

function MarriedBox(props) {
  const thisContext = useAuth();
  return (
    <div className="idcard-component transparent-card shadow-sm">
      {!thisContext.showPublic.publicMode && (
        <button
          disabled={thisContext.showPublic.publicMode || thisContext.blockUI}
          className="bubble-button"
          onClick={props.showNewSpouse}
        >
          +
        </button>
      )}
      <h5>married:</h5>
      <br />
      {props.spouses &&
        props.spouses.map((spouse) => {
          return (
            <div
              key={
                spouse.brid
                  ? spouse.brid.uuid_family_member + "married"
                  : spouse.groo.uuid_family_member + "married"
              }
            >
              <button
                id="nav-btn"
                className="idcard-button transparent-card transparent-bg shadow-sm"
                uuid={
                  spouse.brid
                    ? spouse.brid.uuid_family_member
                    : spouse.groo.uuid_family_member
                }
                onClick={props.handleUpd}
                disabled={thisContext.blockUI}
              >
                {!thisContext.showPublic.publicMode && (
                  <EditDelete
                    source={"marriage"}
                    uuid={
                      // spouse.brid
                      //   ? spouse.brid.uuid_family_member
                      //   : spouse.groo.uuid_family_member
                      spouse.uuid_marriage
                    }
                    permitDelete={true}
                  />
                )}
                {spouse.brid ? _fn(spouse.brid) : _fn(spouse.groo)}
                <br />
                {spouse.d_o_mar
                  ? `Married: ${moment(spouse.d_o_mar, "YYYY-MM-DD").format(
                      "Do MMMM YYYY"
                    )}`
                  : " "}
              </button>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default MarriedBox;

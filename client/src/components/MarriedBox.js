import React from "react";
import EditDelete from "./EditDelete";
import { useAuth } from "./services/ProvideAuth";

function MarriedBox(props) {
  const thisContext = useAuth();
  return (
    <div className="married_box">
      {!thisContext.showPublic.publicMode && (
        <button
          disabled={thisContext.showPublic.publicMode}
          className="plus_button"
          onClick={props.showNewSpouse}
        >
          +
        </button>
      )}
      <h5>Married:</h5>
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
                className="nav-btn"
                uuid={
                  spouse.brid
                    ? spouse.brid.uuid_family_member
                    : spouse.groo.uuid_family_member
                }
                onClick={props.handleUpd}
              >
                {spouse.brid ? spouse.brid.first_name : spouse.groo.first_name}
                <br />
                {spouse.d_o_mar}
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
              </button>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default MarriedBox;

import React from "react";

function MarriedBox(props) {
  return (
    <div className="married_box">
      <button className="plus_button" onClick={props.showNewSpouse}>
        +
      </button>
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
                className="parents-btn"
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
              </button>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default MarriedBox;

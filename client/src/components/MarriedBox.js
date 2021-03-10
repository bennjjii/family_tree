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
            <>
              <button
                className="parents-btn"
                uuid={spouse.uuid}
                onClick={props.handleUpd}
              >
                {spouse.name.join(" ")}
                <br />
                {spouse.d_o_mar}
              </button>
              <br />
            </>
          );
        })}
    </div>
  );
}

export default MarriedBox;

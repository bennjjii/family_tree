import React, { Component } from "react";

export class MarriedBox extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="married_box">
        <button className="plus_button">+</button>
        <h5>Married:</h5>
        {this.props.spouses.map((spouse) => {
          return (
            <>
              <button
                className="parents-btn"
                uuid={spouse.uuid}
                onClick={this.props.handleUpd}
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
}

export default MarriedBox;

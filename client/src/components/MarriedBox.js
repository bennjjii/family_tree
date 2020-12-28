import React, { Component } from "react";

export class MarriedBox extends Component {
  constructor(props) {
    super();

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.handleUpd(e.target.name);
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
                name={spouse.uuid}
                onClick={this.handleUpdate}
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

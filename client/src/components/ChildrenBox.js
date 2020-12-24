import React, { Component } from "react";

export class ChildrenBox extends Component {
  render() {
    return (
      <div className="children_box">
        <button className="plus_button">+</button>
        <h5>Children:</h5>
        <div className="person_box">
          <h5>Howard Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Daryll Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Cherry Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Penelope Scott</h5>
        </div>
        <br />
        <div className="person_box">
          <h5>Vicky Scott</h5>
        </div>
      </div>
    );
  }
}

export default ChildrenBox;

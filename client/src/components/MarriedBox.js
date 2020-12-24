import React, { Component } from "react";

export class MarriedBox extends Component {
  render() {
    return (
      <div className="married_box">
        <button className="plus_button">+</button>
        <h5>Married:</h5>
        <div className="person_box">
          <h5>Molly Scott (1935?)</h5>
        </div>
      </div>
    );
  }
}

export default MarriedBox;

import React, { Component } from "react";
import harold from "./harold.png";
import "./IdCard.css";

export class IdCard extends Component {
  render() {
    return (
      <div className="IdCard">
        <div className="top_sect">
          <div className="family_image">
            <img src={harold} alt="picture" />
          </div>
          <div className="person_details">
            <h4>Harold Scott</h4>
            <h6>Born: 1912</h6>
          </div>
        </div>
        <div className="married_box">
          <h5>Married:</h5>
          <h5>
            Molly Scott (1935?) <span className="plus_button">+</span>
          </h5>
        </div>
        <div className="married_box">
          <h5>Children:</h5>
          <h5>Howard Scott</h5>
          <h5>Daryll Scott</h5>
          <h5>Cherry Scott</h5>
          <h5>Penelope Scott</h5>
          <h5>Vicky Scott</h5>
        </div>
      </div>
    );
  }
}

export default IdCard;

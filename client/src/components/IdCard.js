import React, { Component } from "react";
import harold from "./harold.png";
import "./IdCard.css";

export class IdCard extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Clicked");
  }

  render() {
    return (
      <div className="IdCard">
        <div className="top_sect">
          <div className="family_image">
            <img src={harold} alt="picture" />
          </div>
          <div className="person_details">
            <h4>Harold Scott</h4>
            <h6>Born: 14 Aug 1913</h6>
            <h6>Died: 2002?</h6>
          </div>
        </div>
        <div className="btm_sect">
          <div className="married_box">
            <button className="plus_button" onClick={this.handleClick}>
              +
            </button>
            <h5>Married:</h5>

            <h5>Molly Scott (1935?)</h5>
          </div>
          <div className="children_box">
            <button className="plus_button" onClick={this.handleClick}>
              +
            </button>
            <h5>Children:</h5>
            <h5>Howard Scott</h5>
            <h5>Daryll Scott</h5>
            <h5>Cherry Scott</h5>
            <h5>Penelope Scott</h5>
            <h5>Vicky Scott</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default IdCard;

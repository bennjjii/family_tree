import React, { Component } from "react";
import axios from "axios";
import validator from "validator";

export class MarriedBox extends Component {
  constructor(props) {
    super();
    this.state = {
      spouses: [
        // {
        //   name: [],
        //   uuid: "",
        //   d_o_mar: null,
        //   d_o_div: null,
        // },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.uuid_target !== prevProps.uuid_target) {
      this.setState(
        {
          spouses: [],
        },
        () => {
          if (validator.isUUID(this.props.uuid_target)) {
            axios
              .get(
                "http://localhost:5000/get_marriage/" + this.props.uuid_target
              )
              .then((resp) => {
                let marriage_resp = [];
                marriage_resp = resp.data.map((marriage, index) => {
                  return {
                    name: marriage.spouse,
                    d_o_mar: marriage.d_o_mar,
                    uuid: marriage.uuid,
                  };
                });
                this.setState({
                  spouses: marriage_resp,
                });
              });
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="married_box">
        <button className="plus_button">+</button>
        <h5>Married:</h5>
        {this.state.spouses.map((spouse) => {
          return (
            <>
              <div className="person_box" key={spouse.uuid}>
                <h5>{spouse.name.join(" ")}</h5>
                <h5>{spouse.d_o_mar}</h5>
              </div>
            </>
          );
        })}
      </div>
    );
  }
}

export default MarriedBox;

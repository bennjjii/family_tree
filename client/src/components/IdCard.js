import React, { Component } from "react";
import harold from "./harold.png";
import "./IdCard.css";
import axios from "axios";

export class IdCard extends Component {
  constructor() {
    super();
    this.state = {
      uuid_target: "",
      firstname: "",
      middlename: "",
      lastname: "",
      mother: "",
      father: "",
      birthday: "",
      marriages: [],
      death: "",
      children: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.getPerson = this.getPerson.bind(this);
  }

  handleClick() {
    console.log("Clicked");
  }

  getPerson(uuid) {
    return new Promise((resolve, reject) => {
      const names = {
        first: "",
        middle: "",
        last: "",
      };
      axios
        .get("http://localhost:5000/get_family_member/" + uuid)
        .then((res) => {
          names.first = res.data.first_name;
          names.middle = res.data.middle_name || "";
          names.last = res.data.last_name;
          resolve(names);
          return;
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  apiCall() {
    //get target data

    this.getPerson(this.state.uuid_target)
      .then((res) => {
        this.setState({
          firstname: res.first,
          middlename: res.middle,
          lastname: res.last,
        });
      })
      .catch((err) => console.log(err));

    //get target birthday

    axios
      .get("http://localhost:5000/get_birth/" + this.state.uuid_target)
      .then((res) => {
        console.log(res);
        const { mother, father, d_o_b } = res.data || {};

        //get father name if in DB

        if (father) {
          this.getPerson(father).then((res) => {
            this.setState({
              father: `${res.first} ${res.middle} ${res.last}`,
            });
          });
        } else {
          this.setState({ father: "" });
        }

        //get mother's name if in DB

        if (mother) {
          this.getPerson(mother).then((res) => {
            this.setState({
              mother: `${res.first} ${res.middle} ${res.last}`,
            });
          });
        } else {
          this.setState({ mother: "" });
        }
      })
      .catch((reason) => console.log(reason + "lower"));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.apiCall();
  }

  handleChange(e) {
    const { name, value, type } = e.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/get_family_member/" + this.state.uuid_target)
      .then((res) => {
        console.log(res);
        this.setState({
          firstname: res.data.first_name,
          middlename: res.data.middle_name,
          lastname: res.data.last_name,
        });
      })
      .catch((reason) => console.log(reason));
  }

  render() {
    return (
      <div className="IdCard">
        <div className="top_sect">
          <div className="parent_details">
            <h5>Parents: </h5>
            <div className="person_box">
              <h5>{this.state.father}</h5>
            </div>
            <div className="person_box">
              <h5>{this.state.mother}</h5>
            </div>
          </div>
        </div>
        <div className="mid_sect">
          <div className="family_image">
            <img src={harold} alt="picture" />
          </div>
          <div className="person_details">
            <h4>
              {this.state.firstname} {this.state.middlename}{" "}
              {this.state.lastname}
            </h4>
            <h6>Born: 14 Aug 1913</h6>
            <h6></h6>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="uuid_target"
                value={this.state.uuid_target}
                onChange={this.handleChange}
              ></input>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="btm_sect">
          <div className="married_box">
            <button className="plus_button" onClick={this.handleClick}>
              +
            </button>
            <h5>Married:</h5>
            <div className="person_box">
              <h5>Molly Scott (1935?)</h5>
            </div>
          </div>
          <div className="children_box">
            <button className="plus_button" onClick={this.handleClick}>
              +
            </button>
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
        </div>
      </div>
    );
  }
}

export default IdCard;

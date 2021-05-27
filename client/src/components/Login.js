import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import { authContext } from "./services/ProvideAuth";
import PublicTreeButton from "./PublicTreeButton";

export class Login extends Component {
  static contextType = authContext;
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.flexStyle = {
      maxWidth: "70%",
      margin: "auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    axios.defaults.withCredentials = true;
  }

  async componentDidMount() {
    await this.context.getAccessToken(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const loginDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    this.context.login(loginDetails, this.props.history);
  }

  render() {
    return (
      <>
        <br />
        <h2>Checkout these families:</h2>
        <br />
        <br />
        <div style={this.flexStyle}>
          <PublicTreeButton
            familyTreeName="House of Windsor"
            familyTreeRoute="windsor"
          />
          <PublicTreeButton
            familyTreeName="Jackson Family"
            familyTreeRoute="jackson"
          />
          <PublicTreeButton
            familyTreeName="House of Tudor"
            familyTreeRoute="tudor"
          />
          <PublicTreeButton
            familyTreeName="Japanese Imperial Family"
            familyTreeRoute="japaneseimperialfamily"
          />
        </div>

        <form onSubmit={this.onSubmit} className="loginForm">
          <h4>Or login and build your own</h4>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
              className="form-control"
              id="username"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              className="form-control"
              id="pwd"
            />
          </div>
          <button type="submit" className="btn btn-default">
            Submit
          </button>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </form>
        <br />
      </>
    );
  }
}

export default Login;

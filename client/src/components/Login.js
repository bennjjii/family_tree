import React, { Component } from "react";

import axios from "axios";

import { Link, History } from "react-router-dom";
import { authContext } from "./ProvideAuth";

export class Login extends Component {
  static contextType = authContext;
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    axios.defaults.withCredentials = true;
  }

  componentDidMount() {
    this.context.getAccessToken(this);
    console.log(this.context.jwt);
  }

  componentDidUpdate() {
    console.log(this.context.jwt);
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
    this.context.login(loginDetails, this);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="loginForm">
        <h2>Login</h2>
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
    );
  }
}

export default Login;

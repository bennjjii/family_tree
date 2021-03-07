import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import Axios from "axios";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    Axios.defaults.withCredentials = true;
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
    axios.post("http://localhost:5000/login", loginDetails).then((resp) => {
      localStorage.setItem("token", resp.data.accessToken);
      console.log(localStorage.getItem("token"));
    });
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

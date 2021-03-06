import React, { Component } from "react";

import { Link } from "react-router-dom";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    };

    console.log(loginDetails);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="loginForm">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email address:</label>
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            className="form-control"
            id="email"
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
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={this.state.rememberMe}
              onChange={this.handleChange}
            />{" "}
            Remember me
          </label>
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

import React, { Component } from "react";
import axios from "axios";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
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
    const userDetails = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/register", userDetails)
      .then((response) => {
        this.props.history.push("/", { from: "Register" });
      });

    console.log(userDetails);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="loginForm">
        <h3>Register</h3>
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
        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;

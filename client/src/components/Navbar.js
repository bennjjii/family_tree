import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a href="/" className="navbar-brand">
          FamilyMonkey
        </a>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <a href="/create" className="nav-link">
                Account
              </a>
            </li>
            <li className="navbar-item">
              <a href="/user" className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

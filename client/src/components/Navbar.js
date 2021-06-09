import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./services/ProvideAuth";

const Navbar = (props) => {
  const auth = useAuth();
  const history = useHistory();

  return (
    <nav className="navbar navbar-light transparent-bg transparent-card shadow-sm navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        Geneol0
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/app" className="nav-link">
              App
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/account" className="nav-link">
              Account
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/login"
              className="nav-link"
              onClick={() => auth.logout(history)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

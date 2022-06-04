import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./services/ProvideAuth";

const Navbar = (props) => {
  const auth = useAuth();
  const history = useHistory();

  return (
    <nav className="navbar navbar-light transparent-bg transparent-card shadow-sm navbar-expand-lg">
      <Link
        to="#"
        className="navbar-brand"
        onClick={() => auth.clearShowPublic(history)}
      >
        HouseofMe
      </Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            {auth.user && (
              <Link
                to="#"
                className="nav-link"
                onClick={() => auth.logout(history)}
              >
                logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import IdCard from "./components/IdCard";
import Login from "./components/Login";
import Register from "./components/Register";
import { ProvideAuth, authContext } from "./components/services/ProvideAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadPublicRoute from "./components/LoadPublicRoute";
import LoadPublicRoute2 from "./components/LoadPublicRoute2";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProvideAuth>
        <Router>
          <div className="App">
            <Navbar ctx={this} />
            <Switch>
              {/* <LoadPublicRoute
                path="/public/:publicRoute"
                exact
                component={IdCard}
              /> */}
              <Route
                path="/public/:publicRoute"
                exact
                component={LoadPublicRoute2}
              />
              <ProtectedRoute path="/app" exact component={IdCard} />
              <ProtectedRoute path="/" exact component={IdCard} />
              {/* <Route path="/" exact component={Login} /> */}
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    );
  }
}

export default App;

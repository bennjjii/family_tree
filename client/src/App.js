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
import { ProvideAuth } from "./components/services/ProvideAuth";
import ProtectedRoute from "./components/ProtectedRoute";
//import LoadPublicRoute from "./components/LoadPublicRoute";
import LoadPublicRoute from "./components/LoadPublicRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <ProvideAuth>
      <Router>
        <div className="app">
          <Navbar />
          <Switch>
            <Route
              path="/public_tree/:publicRoute"
              exact
              component={LoadPublicRoute}
            />
            <ProtectedRoute path="/app" exact component={IdCard} />
            <ProtectedRoute path="/" exact component={IdCard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
      // </ProvideAuth>
    );
  }
}

export default App;

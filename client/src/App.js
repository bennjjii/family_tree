import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { ProvideAuth, authContext } from "./components/ProvideAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AddFamilyMember from "./components/AddFamilyMember";

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
            <Navbar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <ProtectedRoute path="/app" exact component={IdCard} />
              <Route path="/add" exact component={AddFamilyMember} />
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    );
  }
}

export default App;

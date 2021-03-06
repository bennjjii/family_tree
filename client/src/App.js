import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import IdCard from "./components/IdCard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddFamilyMember from "./components/AddFamilyMember";
import React from "react";
//import { UserProvider } from "./components/UserContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserAuthenticated: false,
    };
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route
            exact
            path="/"
            render={() => {
              return this.state.isUserAuthenticated ? (
                <Redirect to="/app" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/app" exact component={IdCard} />
          <Route path="/add" exact component={AddFamilyMember} />
        </div>
      </Router>
    );
  }
}

export default App;

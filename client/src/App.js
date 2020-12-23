import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import MainView from "./components/MainView";
//import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" component={MainView} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;

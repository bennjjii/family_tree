import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import IdCard from "./components/IdCard";
import AddFamilyMember from "./components/AddFamilyMember";
//import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={IdCard} />
        <Route path="/add" exact component={AddFamilyMember} />
      </div>
    </Router>
  );
}

export default App;

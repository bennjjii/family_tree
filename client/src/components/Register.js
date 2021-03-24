import axios from "axios";
import { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [familyTreeName, setFamilyTreeName] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      username: username,
      email: email,
      password: password,
      family_tree_name: familyTreeName,
    };

    axios
      .post("http://localhost:5000/register", userDetails)
      .then((response) => {
        props.history.push("/", { from: "Register" });
      });

    console.log(userDetails);
  };

  return (
    <form onSubmit={onSubmit} className="loginForm">
      <h3>Register</h3>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          id="username"
        />
      </div>
      <div className="form-group">
        <label>Email address:</label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="pwd"
        />
      </div>
      <div className="form-group">
        <label>Family Tree Name:</label>
        <input
          type="text"
          value={familyTreeName}
          name="familyTreeName"
          onChange={(e) => setFamilyTreeName(e.target.value)}
          className="form-control"
          id="pwd"
        />
      </div>
      <button type="submit" className="btn btn-default">
        Submit
      </button>
    </form>
  );
};

export default Login;

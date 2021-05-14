import axios from "axios";
import DatePicker from "react-datepicker";
import { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [familyTreeName, setFamilyTreeName] = useState(null);
  const [name, setName] = useState(["", "", ""]);
  const [gender, setGender] = useState(null);
  const [d_o_b, setDob] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      username: username,
      email: email,
      password: password,
      first_name: name[0],
      middle_name: name[1],
      last_name: name[2],
      d_o_b: d_o_b,
      gender: gender,
      family_tree_name: familyTreeName,
    };

    axios.post("/register", userDetails).then((response) => {
      props.history.push("/", { from: "Register" });
    });

    console.log(userDetails);
  };

  return (
    <div className="register-form">
      <h3>Register</h3>
      <form onSubmit={onSubmit}>
        <div className="registerForm">
          <div className="formcol-1">
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
              <label>Your first name:</label>
              <input
                type="text"
                value={name[0]}
                name="first_name"
                onChange={(e) => setName([e.target.value, name[1], name[2]])}
                className="form-control"
                id="first-name"
              />
            </div>
          </div>
          <div className="formcol-2">
            <div className="form-group">
              <label>Your middle name:</label>
              <input
                type="text"
                value={name[1]}
                name="first_name"
                onChange={(e) => setName([name[0], e.target.value, name[2]])}
                className="form-control"
                id="middle-name"
              />
            </div>
            <div className="form-group">
              <label>Your Last name:</label>
              <input
                type="text"
                value={name[2]}
                name="first_name"
                onChange={(e) => setName([name[0], name[1], e.target.value])}
                className="form-control"
                id="last-name"
              />
            </div>

            <label htmlFor="birthday">Date of birth</label>
            <div className="form-group">
              <DatePicker
                id="birthday"
                shouldCloseOnSelect={true}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={60}
                maxDate={new Date()}
                autoComplete="off"
                onChange={(date) => setDob(date)}
                selected={d_o_b}
                className="form-control"
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
                id="family-tree-name"
              />
            </div>
          </div>
        </div>{" "}
        <div className="form-group">
          <label>
            Gender
            <br />
            <select
              name="gender"
              value={gender}
              className="form-control"
              onChange={(e) => setGender(e.target.value)}
            >
              {" "}
              <option value="" selected disabled hidden>
                ---
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

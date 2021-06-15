import axios from "axios";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [familyTreeName, setFamilyTreeName] = useState(null);
  const [name, setName] = useState(["", "", ""]);
  const [gender, setGender] = useState(null);
  const [d_o_b, setDob] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  moment.tz.setDefault("UTC");

  const validateForm = () => {};

  const onSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      username: username,
      email: email,
      password: password,
      first_name: name[0],
      middle_name: name[1],
      last_name: name[2],
      d_o_b: moment(
        `${d_o_b.getFullYear()}-${d_o_b.getMonth() + 1}-${d_o_b.getDate()}`,
        "YYYY-MM-DD"
      ).toISOString(),
      gender: gender,
      family_tree_name: familyTreeName,
    };

    validateForm(userDetails);

    axios
      .post("/register", userDetails)
      .then((response) => {
        props.history.push("/", { from: "Register" });
      })
      .catch((err) => {
        console.log(err);
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
              {/* must be unique */}
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
              {/* must be unique */}
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
              {/* must be 8 characters */}
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
              {/* required */}
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
            {/* required */}
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
                utcOffset={0}
              />
            </div>
            <div className="form-group">
              <label>Family Tree Name:</label>
              {/* required */}
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
          {/* required */}
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
        <button type="submit" className="btn btn-default bubble-button-login">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;

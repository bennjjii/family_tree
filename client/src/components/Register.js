import axios from "axios";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import dateSanitiser from "./services/dateSanitiser";
import { useForm, Controller } from "react-hook-form";
import FormError from "./FormError";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    getValues,
    setError,
  } = useForm();
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [familyTreeName, setFamilyTreeName] = useState(null);
  const [name, setName] = useState(["", "", ""]);
  const [gender, setGender] = useState(null);
  const [d_o_b, setDob] = useState(null);

  // const onSubmit2 = (e) => {
  //   e.preventDefault();
  //   const userDetails = {
  //     username: username,
  //     email: email,
  //     password: password,
  //     first_name: name[0],
  //     middle_name: name[1],
  //     last_name: name[2],
  //     d_o_b: null,
  //     gender: gender,
  //     family_tree_name: familyTreeName,
  //   };

  //   axios
  //     .post("/register", userDetails)
  //     .then((response) => {
  //       props.history.push("/", { from: "Register" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   console.log(userDetails);
  // };

  const onSubmit = async (data) => {
    let finalForm = {
      ...data,
      d_o_b: dateSanitiser(data.d_o_b),
    };
    console.log(finalForm);
    try {
      await axios.post("/register", finalForm);
      history.push("/", { from: "Register" });
    } catch (err) {
      console.log(err.response);
      switch (err.response.data[0].path) {
        case "username":
          setError("username", {
            type: "manual",
            message: "this username is already taken",
          });
          break;
        case "email":
          setError("email", {
            type: "manual",
            message: "this email is already taken",
          });
          break;
      }
    }
  };
  console.log(formState);

  return (
    <div className="register-form">
      <h3>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <div className="registerForm">
          <div className="formcol-1">
            <div className="form-group">
              {/* must be unique */}
              <label>Username:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("username", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]*$/g,
                  })}
                  type="text"
                  className="form-control"
                />
                {formState.errors.username &&
                  formState.errors.username.type === "required" && (
                    <FormError message="please enter a username" />
                  )}
                {formState.errors.username &&
                  formState.errors.username.type === "pattern" && (
                    <FormError message="please avoid entering spaces" />
                  )}
                {formState.errors.username &&
                  formState.errors.username.type === "manual" && (
                    <FormError message="this username is already taken" />
                  )}
              </div>
            </div>
            <div className="form-group">
              {/* must be unique */}
              <label>Email address:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S{1,}@\S{2,}\.\S{2,}$/gi,
                  })}
                  type="email"
                  className="form-control"
                />
                {formState.errors.email &&
                  formState.errors.email.type === "required" && (
                    <FormError message="please enter an email address" />
                  )}
                {formState.errors.email &&
                  formState.errors.email.type === "pattern" && (
                    <FormError message="please enter a valid email address" />
                  )}
                {formState.errors.email &&
                  formState.errors.email.type === "manual" && (
                    <FormError message="this email is already taken" />
                  )}
              </div>
            </div>
            <div className="form-group">
              {/* must be 8 characters */}
              <label>Password:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  type="password"
                  className="form-control"
                />
                {formState.errors.password &&
                  formState.errors.password.type === "required" && (
                    <FormError message="please enter a password" />
                  )}
                {formState.errors.password &&
                  formState.errors.password.type === "minLength" && (
                    <FormError message="please enter a password of at least 8 characters" />
                  )}
              </div>
            </div>
            <div className="form-group">
              {/* must be 8 characters */}
              <label>Repeat password:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("repeatPassword", {
                    validate: (v) => {
                      return v === getValues("password");
                    },
                  })}
                  type="password"
                  className="form-control"
                />
                {formState.errors.repeatPassword &&
                  formState.errors.repeatPassword.type === "validate" && (
                    <FormError message="please ensure passwords match" />
                  )}
              </div>
            </div>
            <div className="form-group">
              {/* required */}
              <label>Your first name:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("first_name", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]*$/g,
                  })}
                  type="text"
                  className="form-control"
                />
                {formState.errors.first_name &&
                  formState.errors.first_name.type === "required" && (
                    <FormError message="please enter a name" />
                  )}
                {formState.errors.first_name &&
                  formState.errors.first_name.type === "pattern" && (
                    <FormError message="please avoid entering spaces" />
                  )}
              </div>
            </div>
          </div>
          <div className="formcol-2">
            <div className="form-group">
              <label>Your middle name:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("middle_name")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Your Last name:</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("last_name")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <label htmlFor="birthday">Date of birth</label>
            {/* required */}
            <div className="form-group">
              <div style={{ position: "relative" }}>
                <Controller
                  control={control}
                  name="d_o_b"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      id="birthday"
                      shouldCloseOnSelect={true}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={60}
                      maxDate={new Date()}
                      autoComplete="off"
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      className="form-control"
                    />
                  )}
                  rules={{ required: false }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Family Tree Name:</label>
              {/* required */}
              <div style={{ position: "relative" }}>
                <input
                  {...register("family_tree_name", {
                    required: true,
                  })}
                  type="text"
                  className="form-control"
                  id="family-tree-name"
                />
                {formState.errors.family_tree_name && (
                  <FormError message="please enter a name" />
                )}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="form-group">
          {/* required */}
          <label>
            Gender
            <br />
            <div style={{ position: "relative" }}>
              <select
                {...register("gender", {
                  validate: (v) => {
                    return !!v;
                  },
                })}
                className="form-control"
              >
                {" "}
                <option value="" selected disabled hidden>
                  ---
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {formState.errors.gender && (
                <FormError message="please select an option" />
              )}
            </div>
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

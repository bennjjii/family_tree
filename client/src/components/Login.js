import React, { useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./services/ProvideAuth";
import PublicTreeButton from "./PublicTreeButton";
import { useForm } from "react-hook-form";
import FormError from "./FormError";

const Login = (props) => {
  axios.defaults.withCredentials = true;
  const auth = useAuth();
  const history = useHistory();
  const { register, handleSubmit, formState, setError } = useForm();

  const flexStyle = {
    maxWidth: "70%",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  useEffect(() => {
    auth.getAccessToken(history);
  }, []);

  const onSubmit = async (data) => {
    try {
      await auth.login(data, history);
    } catch (err) {
      console.log(err.message);
      switch (err.message) {
        case "409":
          console.log("object");
          setError("username", {
            type: "manual",
          });
          break;
        case "401":
          setError("password", {
            type: "manual",
          });
          break;
      }
    }
  };

  return (
    <>
      <br />
      <h2>Check out a house:</h2>
      <br />
      <br />
      <div style={flexStyle}>
        <PublicTreeButton
          familyTreeName="House of Windsor"
          familyTreeRoute="windsor"
        />
        <PublicTreeButton
          familyTreeName="House of Jackson"
          familyTreeRoute="jackson"
        />
        <PublicTreeButton
          familyTreeName="House of Tudor"
          familyTreeRoute="tudor"
        />
        <PublicTreeButton
          familyTreeName="Imperial House of Japan"
          familyTreeRoute="japaneseimperialfamily"
        />
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <h4>Or build your own...</h4>
        <div className="form-group">
          <label>Username:</label>
          <div style={{ position: "relative" }}>
            <input
              {...register("username", {
                required: true,
              })}
              type="text"
              className="form-control"
              id="username"
            />
            {formState.errors.username &&
              formState.errors.username.type === "required" && (
                <FormError message="please enter a username" />
              )}
            {formState.errors.username &&
              formState.errors.username.type === "manual" && (
                <FormError message="username does not exist" />
              )}
          </div>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div style={{ position: "relative" }}>
            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              className="form-control"
              id="pwd"
            />
            {formState.errors.password &&
              formState.errors.password.type === "required" && (
                <FormError message="please enter a password" />
              )}
            {formState.errors.password &&
              formState.errors.password.type === "manual" && (
                <FormError message="incorrect password" />
              )}
          </div>
        </div>
        <button type="submit" className="btn btn-default bubble-button-login">
          Login
        </button>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </form>
      <br />
    </>
  );
};

export default Login;

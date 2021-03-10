import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

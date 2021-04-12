import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./services/ProvideAuth";

//Just checks if there is an auth'ed user and switches the displayed component depending
//client could technically still view App view but they wouldn't have any data from the backend
//so would just be an empty form

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
                pathname: "/login",
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

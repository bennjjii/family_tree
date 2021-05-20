import React, { Component, useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./services/ProvideAuth";
import axios from "axios";

//Just checks if there is an auth'ed user and switches the displayed component depending
//client could technically still view App view but they wouldn't have any data from the backend
//so would just be an empty form

const LoadPublicRoute = ({ component: Component, ...rest }) => {
  console.log(rest.computedMatch.params.publicRoute);
  let [treeData, setTreeData] = useState(true);
  useEffect(async () => {
    try {
      let res = await axios.get(
        `/find_public_tree/${rest.computedMatch.params.publicRoute}`
      );

      console.log(res);
      setTreeData(true);
    } catch (error) {
      setTreeData(false);
      console.log(error);
    }
  }, [rest]);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (treeData) {
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

export default LoadPublicRoute;

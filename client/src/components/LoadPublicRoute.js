import React, { Component, useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./services/ProvideAuth";
import axios from "axios";

//Just checks if there is an auth'ed user and switches the displayed component depending
//client could technically still view App view but they wouldn't have any data from the backend
//so would just be an empty form

const LoadPublicRoute = (props) => {
  const auth = useAuth();
  //console.log(props.match.params.publicRoute);

  useEffect(() => {
    async function publicRoute() {
      try {
        let res = await axios.get(
          `/find_public_tree/${props.match.params.publicRoute}`
        );

        //console.log(res.data);
        auth.setShowPublic({ ...res.data, publicMode: true });
        props.history.push("/app");
      } catch (error) {
        props.history.push("/login");
      }
    }
    publicRoute();
  }, [props]);
  return null;
};

export default LoadPublicRoute;

import { createContext, useContext, useState } from "react";

import jwt_decode from "jwt-decode";
import axios from "axios";
axios.defaults.withCredentials = true;

export const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const getAccessToken = (context) => {
    axios
      .post("http://localhost:5000/refresh")
      .then((res) => {
        try {
          const decodedUser = jwt_decode(res.data).username;
          setUser(decodedUser);
          setJwt(res.data);
          context.props.history.push("/app", { from: "Login" });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };
  const login = (loginDetails, context) => {
    axios.post("http://localhost:5000/login", loginDetails).then((resp) => {
      if (resp.data.auth) {
        // setUser(loginDetails.username);
        // setJwt(resp.data.accessToken);

        context.props.history.push("/login", { from: "Login" });
      }
    });
  };

  const logout = (props) => {
    setUser(null);
    setJwt(null);
  };

  return { user, jwt, login, logout, getAccessToken };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

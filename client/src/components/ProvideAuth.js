import { createContext, useContext, useState } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

export const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("banana");
  const login = (loginDetails, context) => {
    axios.post("http://localhost:5000/login", loginDetails).then((resp) => {
      if (resp.data.accessToken) {
        localStorage.setItem("token", resp.data.accessToken);
        setUser(loginDetails.username);
        context.props.history.push("/app", { from: "Login" });
      }
    });
  };

  return { user, jwt, login };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

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
  const [uuidUser, setUuidUser] = useState(null);
  const [focus, setFocus] = useState(null);
  const [uuidFamilyTree, setUuidFamilyTree] = useState(null);
  const [jwt, setJwt] = useState(null);
  //here we can handle displaying public trees
  const [showPublic, setShowPublic] = useState({
    publicMode: false,
  });
  //this needs to set a timeout to refresh the access token after x minutes
  const getAccessToken = async (context) => {
    axios
      .post("/refresh")
      .then((res) => {
        try {
          const { username, uuid_user, uuid_family_tree, focal_member } =
            jwt_decode(res.data);
          setUser(username);
          setUuidUser(uuid_user);
          setUuidFamilyTree(uuid_family_tree);
          setFocus(focal_member);
          setJwt(res.data);
          context.props.history.push("/app", { from: "Login" });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };
  const login = (loginDetails, context) => {
    axios.post("/login", loginDetails).then((resp) => {
      if (resp.data.auth) {
        context.props.history.push("/app", { from: "Login" });
      }
    });
  };

  const logout = async (context) => {
    console.log("Logout clicked");
    await axios.post("/logout", { username: user }).then((resp) => {
      console.log(resp);
      if (resp.data.success) {
        setUser(null);
        setUuidUser(null);
        setJwt(null);
        setShowPublic({ publicMode: false });
      }
    });
    //console.log(Object.keys(context));
    //context.props.history.push("/login", { from: "App" });
  };

  return {
    user,
    uuidUser,
    uuidFamilyTree,
    focus,
    setFocus,
    jwt,
    showPublic,
    setShowPublic,
    login,
    logout,
    getAccessToken,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

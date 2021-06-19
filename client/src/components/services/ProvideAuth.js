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
  const [blockUI, setBlockUI] = useState(false);

  const clearShowPublic = (history) => {
    setShowPublic({ publicMode: false });
    history.push("/");
  };

  const getAccessToken = async (history) => {
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
          history.push("/app", { from: "Login" });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const refreshAccessToken = async () => {
    //console.log("refreshing access token");
    let httpClient = await axios
      .post("/refresh")
      .then((res) => {
        //console.log(res.data);
        try {
          setJwt(res.data);
          //console.log(jwt);
          return axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
              "Content-type": "application/json",
              authorization: res.data,
            },
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
    return httpClient;
    //console.log(jwt);
  };

  const login = async (loginDetails, history) => {
    try {
      let resp = await axios.post("/login", loginDetails);
      if (resp.data.auth) {
        history.push("/app", { from: "Login" });
      }
    } catch (err) {
      throw new Error(err.response.status);
    }
  };

  const logout = async (history) => {
    //something goes wrong here
    console.log("Logout clicked");
    await axios.post("/logout", { username: user }).then((resp) => {
      //console.log(resp);
      if (resp.data.success) {
        setUser(null);
        setUuidUser(null);
        setJwt(null);
        setShowPublic({ publicMode: false });
        history.push("/");
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
    refreshAccessToken,
    blockUI,
    setBlockUI,
    clearShowPublic,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

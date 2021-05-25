import axios from "axios";

export default class CommonHttp {
  constructor(jwt) {
    this.axios = axios.create({
      //can we delete this line vvv
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "Content-type": "application/json",
        authorization: jwt,
      },
    });
  }
}

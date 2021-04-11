import axios from "axios";

export default class CommonHttp {
  constructor(context) {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "Content-type": "application/json",
        authorization: context.jwt,
      },
    });
  }
}

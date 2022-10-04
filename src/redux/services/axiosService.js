import axios from "axios";

const baseUrl = "https://fd4e-103-73-101-34.in.ngrok.io/api";

const service = {
  post: (endpoint, token, payload) => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        token: token,
      },
    });
    return instance.post(baseUrl + endpoint, payload);
  },
  get: (endpoint) => {
    const instance = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
    return instance.get(baseUrl + endpoint);
  },
};

export default service;

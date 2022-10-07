import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const service = {
  post: (endpoint, token, payload) => {
    const instance = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
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

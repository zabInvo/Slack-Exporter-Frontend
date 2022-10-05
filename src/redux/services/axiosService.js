import axios from "axios";

const baseUrl = "https://localhost:5000/api";

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

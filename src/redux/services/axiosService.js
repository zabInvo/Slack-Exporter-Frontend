import axios from "axios";

const baseUrl = "https://localhost:5000/api";

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
};

export default service;
import a from "axios";

const axios = a.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axios;

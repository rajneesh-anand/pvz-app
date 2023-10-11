import axios from "axios";
import GetToken from "./token";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API_SERVER,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// http.interceptors.request.use(
//   (config) => {
//     const token = GetToken();
//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${token ? token : ""}`,
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default http;

import axios from "axios";

// export const API_URL = "https://webapi.titandeve.info/api";
export const API_URL = "https://webapi.bargainex.com/api";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15 * 1000,
});

instance.interceptors.request.use(async (request) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    request.headers.authorization = `Bearer ${accessToken}`;
  }

  return request;
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default instance;

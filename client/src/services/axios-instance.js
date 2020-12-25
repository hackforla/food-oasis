import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || null,
  withCredentials: true,
});

export default axiosInstance;

import axios from "axios";
import { APP_API_URL } from "../helpers/Constants";

const axiosInstance = axios.create({
  baseURL: APP_API_URL || null,
  withCredentials: true,
});

export default axiosInstance;

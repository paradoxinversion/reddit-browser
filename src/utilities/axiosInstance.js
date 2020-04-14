import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://www.reddit.com/dev/api/",
});

export default axiosInstance;

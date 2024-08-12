import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_URL;

const axiosService = axios.create({ baseURL });

axiosService.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      toast.error("Connection Time out. Please Check Your internet Connection");
    }
    if (
      error.response?.status === 401 &&
      !window.location.href.includes("/login")
    ) {
      localStorage.removeItem("root-billing-token");
      window.location = "/auth/login";
    }
    if (error.response?.status === 422) {
      toast.error(error.response?.data.error);
    }

    if (error.response?.data.message) {
      toast.error(error.response?.data.message);
    }

    return Promise.reject((error.response && error.response?.data) || error);
  }
);

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosService;

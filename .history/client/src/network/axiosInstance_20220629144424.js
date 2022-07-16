import axios from "axios";

const getRefreshTokenData = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const refreshTokenId = localStorage.getItem("refreshTokenId");
  const hasExpiry = localStorage.getItem("hasExpiry");

  return {
    refreshToken,
    refreshTokenId,
    hasExpiry,
  };
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use =
  ((configuration) => {
    console.log(configuration);
    const refreshTokenData = getRefreshTokenData();
    if (refreshTokenData) {
    }
  },
  (error) => {});

export default axiosInstance;

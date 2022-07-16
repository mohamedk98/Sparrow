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

const setRefreshTokenData = (data) => {
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("refreshTokenId", data.refreshTokenId);
  localStorage.setItem("hasExpiry", data.hasExpiry);
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const refreshTokenData = getRefreshTokenData();
    if (refreshTokenData) {
      config.data = refreshTokenData;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use
  ((response) => {
    return response;
  },
   (error) => {
    const originalRequest = error.request;
    if (error.response) {
      if (
        error.response.status === 401 ||
        (error.response.status === 403 && !originalRequest._retry)
      ) {
        originalRequest._retry = true;
        console.log("respoosne interce errr");
        try {
          // const newRefreshToken = await axiosInstance.post("/token",getRefreshTokenData())
          // setRefreshTokenData(newRefreshToken.data)
        } catch {}
      }
    }
  });

export default axiosInstance;

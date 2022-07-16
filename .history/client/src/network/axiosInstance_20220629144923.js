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
  ((request) => {
    const refreshTokenData = getRefreshTokenData();
    if (refreshTokenData) {
      request.body = refreshTokenData;
      console.log(request);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  });


  axiosInstance.interceptors.request.use =
  ((response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.request
    if (error.response) {
        if (error.response.status === 401 && !originalRequest._retry){
            
        }
    }
  });


export default axiosInstance;

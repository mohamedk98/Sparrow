import axios from "axios";

const getRefreshTokenData = () => {
 const refreshToken =  localStorage.getItem("refreshToken");
 const refreshTokenId =  localStorage.getItem("refreshTokenId");
 const hasExpiry=  localStorage.getItem("hasExpiry");
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use =
  ((configuration) => {
    console.log(configuration);
    return configuration;
    // const refreshTokenData = authenticationData
    // if (refreshTokenData){

    // }
  },
  (error) => {});

export default axiosInstance;

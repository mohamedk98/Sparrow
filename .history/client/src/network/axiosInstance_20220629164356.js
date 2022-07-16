import axios from "axios";
import { addAuthentication } from "../store/slicers/user";
import { store } from "../store/store";
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

const axiosTokenInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

//interceptor to add refresh token data to the body of each request will be send that
//depends on authentication
axiosTokenInstance.interceptors.request.use(
  /** for each request attach the refresh token data
   * from the localstorage and add it to the request body
   */
  function (config) {
    const refreshTokenData = store.getState().user.authenticationData;
    if (refreshTokenData) {
      config.data = { ...refreshTokenData };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Resposne interceptor to handle token refreshment
axiosTokenInstance.interceptors.request.use(
  //if reponse is fine just return it
  (response) => {
    return response;
  },
  async (error) => {
    //if there is 401 or 403 error, just refresh the token
    //original request configuration
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response.status === 401 ||
        (error.response.status === 403 && !originalConfig._retry)
      ) {
        originalConfig._retry = true;
        console.log("respoosne interce errr");
        try {
          const newRefreshToken = await axiosTokenInstance.post(
            "/token",
            getRefreshTokenData()
          );
          setRefreshTokenData(newRefreshToken.data);
          return axiosTokenInstance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosTokenInstance };

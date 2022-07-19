import axios from "axios";
import { addAuthentication } from "../store/userSlice/UserSlice";
//Note: using store functions to manipulate the user store as
//we cannot use useDispatch or useSelector since this file is not a function
import { store } from "../store/store";

//Normal instance for any request that doesn't need refresh token or authentication
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", //"https://zombie-hat.herokuapp.com"
  withCredentials: true,
});

//Enhanced axios instance with interceptors to work with token refreshment
const axiosTokenInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

//interceptor to add refresh token data to the body of each request will be send that
//depends on authentication
// axiosInstance.interceptors.request.use(
//   /** for each request attach the refresh token data
//    * from the localstorage and add it to the request body
//    *
//    */
//   function (config) {
//     config.headers.authorization = `Bearer ${
//       store.getState()?.user.authenticationData.accessToken
//     }`;

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );


console.log(axiosTokenInstance.defaults.headers)

axiosTokenInstance.interceptors.request.use(
  /** for each request attach the refresh token data
   * from the localstorage and add it to the request body
   *
   */
  function (config) {
    const refreshTokenData = store.getState().user.authenticationData;
    
    config.headers.authorization = `Bearer ${
      localStorage.getItem("accessToken")
    }`;
    // if (refreshTokenData) {
    //   config.data = { ...refreshTokenData };
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Resposne interceptor to handle token refreshment
axiosTokenInstance.interceptors.response.use(
  //if reponse is fine just return it
  (response) => {
    return response;
  },
  async (error) => {
    //if there is 401 or 403 error, just refresh the token
    //original request configuration
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        //using normal instance to not fall in 401 infintie loop
        const newRefreshToken = await axiosInstance.post(
          "/token",
          store?.getState()?.user.authenticationData
        );
        console.log(newRefreshToken.data);
        store.dispatch(addAuthentication(newRefreshToken.data));
        return axiosTokenInstance(originalConfig);
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance, axiosTokenInstance };

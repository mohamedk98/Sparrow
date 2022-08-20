import axios from 'axios';
import { addAuthentication } from '../store/userSlice/UserSlice';
//Note: using store functions to manipulate the user store as
//we cannot use useDispatch or useSelector since this file is not a function
import { store } from '../store/store';

//Normal instance for any request that doesn't need refresh token or authentication
const axiosInstance = axios.create({
  baseURL: 'https://zombie-hat.herokuapp.com', //"http://localhost:4000"
  withCredentials: true,
});

//Enhanced axios instance with interceptors to work with token refreshment
const axiosTokenInstance = axios.create({
  baseURL: 'https://zombie-hat.herokuapp.com',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Resposne interceptor to handle token refreshment
axiosInstance.interceptors.response.use(
  //if reponse is fine just return it
  response => {
    return response;
  },
  async error => {
    //if there is 401 or 403 error, just refresh the token
    //original request configuration
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = false;

      try {
        //using normal instance to not fall in 401 infintie loop
        const newRefreshToken = await axiosTokenInstance.post('/token', {
          params: {
            refreshToken:
              store?.getState()?.user.authenticationData.refreshToken,
            hasExpiry: store?.getState()?.user.authenticationData.hasExpiry,
          },
        });

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

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', //https://zombie-hat.herokuapp.com
  withCredentials: true, // to send token to backend for authorization reasons.
});

export default axiosInstance;

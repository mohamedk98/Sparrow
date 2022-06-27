import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://zombie-hat.herokuapp.com',
  withCredentials: true,
});

export default axiosInstance;

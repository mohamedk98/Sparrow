import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const authenticationData = useSelector(
  (state) => state.user.authenticationData
);
const dispatch = useDispatch();

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use = ((configuration) => {
    console.log(configuration)
    return configuration
    const refreshTokenData = authenticationData
    // if (refreshTokenData){
        
    // }
}, (error) => {});

export default axiosInstance;

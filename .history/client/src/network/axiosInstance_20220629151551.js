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

axiosInstance.interceptors.request.use =
  (function (request) {
    const refreshTokenData = getRefreshTokenData();
    console.log(request);
    request.headers.test = "hello";
    // if (refreshTokenData) {
    //     request.headers["x-access-token"] = refreshTokenData.refreshToken;
    //   console.log(request);
    // }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  });

// axiosInstance.interceptors.request.use =
//   ((response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.request;
//     if (error.response) {
//       if (error.response.status === 401 || error.response.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try{
//             const newRefreshToken = await axiosInstance.post("/token",getRefreshTokenData())
//             setRefreshTokenData(newRefreshToken.data)

//         }
//         catch{}
//       }
//     }
//   });

export default axiosInstance;

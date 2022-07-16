import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {axiosTokenInstance} from "../network/axiosInstance";
function Home(props) {
  const [requestData, setRequestData] = useState("No Data....");
  // const navigate = useNavigate()
  const getData = () => {
    axiosTokenInstance.get("/testAll").then((response) => {
      console.log(response.data)
    });

    const getData = () => {
      axiosTokenInstance.post("/token").then((response) => {
        console.log(response.data)
      });
    };
  };
  return (
    <>
      <h1>This is Home</h1>
      <button onClick={getData} className="btn btn-primary">get data</button>
      <button onClick={getToken} className="btn btn-success">get Token</button>
    </>
  );
}

export default Home;

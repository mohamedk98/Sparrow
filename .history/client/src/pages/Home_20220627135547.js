import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
function Home(props) {
  const [requestData, setRequestData] = useState("No Data....");
  // const navigate = useNavigate()
  const getData = () => {
    axios.get("http://localhost:4000").then((response) => {
      setRequestData(response.data);

    });
  };
  return (
<>
<h1>This is Home</h1>
</>
  );
}

export default Home;

import React, { useState } from "react";
import axios from "axios";
function Home(props) {
  const [requestData, setRequestData] = useState("No Data....");
  const getData = () => {
    axios.get("http//:localhost:3000/").then((data) => {
      setRequestData(data);
    });
  };
  return (
    <div>
      <h1>Home</h1>
      <p>{requestData}</p>
      <button onClick={getData}>get Data</button>
    </div>
  );
}

export default Home;

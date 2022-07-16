import React from 'react';
import axios from "axios"
function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={()=>axios.get("http//:localhost:3000/")}>Test request</button>
        </div>
    );
}

export default Home;
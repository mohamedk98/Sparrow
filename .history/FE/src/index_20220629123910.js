import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// TailWind & TailWind Elements
import "./tailwind/output.css";
import "../node_modules/tw-elements/dist/js/index.min.js";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//To solve hooks error when using redux, just install react-redux--> npm i react-redux


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
        <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);



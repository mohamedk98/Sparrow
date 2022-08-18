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

//Localization
import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector) 
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    supportedLngs:['en','ar'],
    fallbackLng: "en",
    interpolation: {
      format: (value, format, lng) => {
        if (format === "number") {
          return new Intl.NumberFormat(lng).format(value);
        }
      },
    },
    detection:{
      order:['cookie','path', 'htmlTag'],
      //places to cache our language setting
      caches:['cookie']
    },
    backend:{
      loadPath:'/assets/locales/{{lng}}/translation.json',
    },

  });


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

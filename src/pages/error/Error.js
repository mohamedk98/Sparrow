import React from 'react';

import facebook from '../../assets/images/Sparrow_pic.png';

import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  let navigate = useNavigate();

  return (
    <div className="bg-gray-200 h-screen">
      <nav className="relative w-full flex justify-between items-center bg-white shadow">
        <span className="container-fluid">
          <img
            className="h-14 mb-2 ml-2.5 w-full"
            src={facebook}
            alt="facebook logo"
          />
        </span>

        <span className="text-sky-700 font-bold md:text-lg mr-4">
          {t("Don't forget the real life")}
        </span>
      </nav>

      <div
        className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-red-700  items-center flex w-full justify-center mx-auto mt-52 text-2xl"
        role="alert"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times-circle"
          className="w-9 h-9 mr-2 fill-current "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          ></path>
        </svg>
        {t('404 Page Not Found')}
      </div>

      <button
        className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-1 px-8 w-fit h-fit mx-auto flex mt-10"
        type="button"
        onClick={() => {
          navigate('/login');
        }}
      >
        {t('Go To Log In Page')}
      </button>
    </div>
  );
};

export default Error;

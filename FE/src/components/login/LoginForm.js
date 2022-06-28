import { Link } from 'react-router-dom';
import React from 'react';
import facebook from '../../assets/icons/facebook.svg';
import LoginButton from './LoginButton';
import Formic from './Formic';

const LoginForm = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <div className="mt-24 text-2xl text-center lg:text-left px-12 flex flex-col mx-auto">
        <img
          className="max-w-xs lg:ml-14 mx-auto"
          src={facebook}
          alt="facebook logo"
        />
        <span className="lg:ml-20">
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="lg:ml-24 mx-auto mt-10 w-3/4 text-center">
        <div className="block rounded-lg shadow-lg bg-white p-4">
          <Formic />
          <div className="text-blue-500 mt-4 mb-5 hover:underline">
            <Link to="/reset">Forgot password?</Link>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <LoginButton
              name="Create New Account"
              type="button"
              className="bg-facebook-green text-white font-bold text-lg border-2 rounded-md border-facebook-green py-2 px-5 mt-3 hover:bg-facebook-greenHover"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

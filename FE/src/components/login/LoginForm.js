import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import React from 'react';
import facebook from '../../assets/icons/facebook.svg';

const LoginForm = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-xl lg:ml-60 lg:w-11/12 mr-10">
        <img className="max-w-xs" src={facebook} alt="facebook logo" />
        <p className="text-3xl ml-7">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <div className="w-full">
        <div className="block rounded-lg shadow-lg bg-white w-2/4 max-w-sm text-center p-4">
          <Formik className="p-6">
            {formic => (
              <Form className="flex flex-col">
                <input
                  className="border-2 rounded-md border-gray-150 p-3 mb-2"
                  text="text"
                  placeholder="Email address or phone number"
                />
                <input
                  className="border-2 rounded-md border-gray-150 p-3 mb-2"
                  text="text"
                  placeholder="Password"
                />
                <button
                  className="bg-facebook-blue text-white border-2 rounded-md border-facebook-blue py-3"
                  type="submit"
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-blue-500 my-3">
            <Link to="/forget">Forgot password?</Link>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <button
              className="bg-facebook-green text-white border-2 rounded-md border-facebook-green py-3 px-16"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

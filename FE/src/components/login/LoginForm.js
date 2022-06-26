import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import React from 'react';
import facebook from '../../assets/icons/facebook.svg';
import LoginInput from '../../pages/login/LoginInput';
import LoginButton from './LoginButton';

const LoginForm = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="flex flex-col md:ml-10 px-36 md:px-0 mt-20">
        <div>
          <img
            className="md:max-w-xs md:px-0 md:ml-3"
            src={facebook}
            alt="facebook logo"
          />
        </div>
        <p className="sm:text-2xl text-xl ml-5 md:ml-9 sm:ml-7">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <div className="lg:ml-24 md:ml-20 mx-auto mt-10 w-3/4 text-center">
        <div className="block rounded-lg shadow-lg bg-white p-4">
          <Formik className="p-6">
            {formic => (
              <Form className="flex flex-col">
                <LoginInput
                  type="text"
                  placeholder="Email address or phone number"
                />
                <LoginInput type="text" placeholder="Password" />
                <LoginButton
                  name="Log In"
                  type="submit"
                  className="bg-facebook-blue text-white border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-3"
                />
              </Form>
            )}
          </Formik>
          <div className="text-blue-500 mt-4 mb-5">
            <Link to="/forget">Forgot password?</Link>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <LoginButton
              name="Create Account"
              type="submit"
              className="bg-facebook-green text-white border-2 rounded-md border-facebook-green py-3 px-16 mt-3 hover:bg-facebook-greenHover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

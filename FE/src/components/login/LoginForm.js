import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import facebook from '../../assets/icons/facebook.svg';
import eyeShow from '../../assets/icons/eye-password-show.svg';
import eyeHide from '../../assets/icons/eye-password-hide.svg';
import LoginInput from './LoginInput';
import LoginButton from './LoginButton';

const loginInfo = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;
  // console.log(email, password);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = e => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string().required('Email address is required').email().max(100),
    password: Yup.string().required('Password is required'),
  });

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
          <Formik
            enableReinitialize // To inforce it to teset form input values when initialValues changes.
            initialValues={{ email, password }}
            validationSchema={loginValidation}
          >
            {formic => (
              <Form className="flex flex-col">
                <LoginInput
                  name="email"
                  type="text"
                  placeholder="Email address"
                  className="border-2 rounded-md p-3 mb-2 w-full"
                  onChange={loginHandler}
                />
                <div className="relative">
                  <LoginInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    className="border-2 rounded-md p-3 mb-2 w-full"
                    onChange={loginHandler}
                  />
                  <img
                    onClick={togglePassword}
                    src={showPassword ? eyeShow : eyeHide}
                    alt="eye icon"
                    className="w-5 absolute top-4 right-5 cursor-pointer"
                  />
                </div>
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

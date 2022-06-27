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
                  className="border-2 rounded-md p-3 mb-3 w-full"
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
                  {formic.getFieldMeta('password').value && (
                    <img
                      onClick={togglePassword}
                      src={showPassword ? eyeShow : eyeHide}
                      alt="eye icon"
                      className="w-5 absolute top-4 right-5 cursor-pointer"
                    />
                  )}
                </div>
                <LoginButton
                  name="Log In"
                  type="submit"
                  className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-2 mt-3"
                />
              </Form>
            )}
          </Formik>
          <div className="text-blue-500 mt-4 mb-5 hover:underline">
            <Link to="/forget">Forgot password?</Link>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <LoginButton
              name="Create New Account"
              type="submit"
              className="bg-facebook-green text-white font-bold text-lg border-2 rounded-md border-facebook-green py-2 px-5 mt-3 hover:bg-facebook-greenHover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

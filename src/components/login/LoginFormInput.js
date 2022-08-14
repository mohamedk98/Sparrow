import React, { Fragment } from 'react';
import LoginInput from './LoginInput';

const LoginFormInput = ({
  loginHandler,
  showPassword,
  formic,
  togglePassword,
  eyeShow,
  eyeHide,
  loginInputEmailClassName,
  loginInputPasswordClassName,
}) => {
  return (
    <Fragment>
      <div className="relative">
        <LoginInput
          name="email"
          type="text"
          placeholder="Email address"
          className={loginInputEmailClassName}
          onChange={loginHandler}
        />
        {formic.errors.email && formic.touched.email && (
          <Fragment>
            <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base w-fit shadow-lg h-fit right-0.5 mr-0.5 top-1.5">
              {formic.errors.email}
              <span className="absolute h-0 w-0 border-y-8 border-y-transparent border-r-[14px]  border-r-red-800 -left-3 top-3 border-transparent"></span>
            </span>
          </Fragment>
        )}
      </div>

      <div className="relative">
        <LoginInput
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          className={loginInputPasswordClassName}
          onChange={loginHandler}
        />
        {formic.getFieldMeta('password').value && (
          <span
            onClick={togglePassword}
            className="w-5 absolute top-4 right-5 cursor-pointer"
          >
            {showPassword ? eyeShow : eyeHide}
          </span>
        )}

        {formic.errors.password && formic.touched.password && (
          <Fragment>
            <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base w-fit shadow-lg h-fit right-0.5 mr-0.5 top-1.5">
              {formic.errors.password}
              <span className="absolute h-0 w-0 border-y-8 border-y-transparent border-r-[14px] border-r-red-800 -left-3 top-3 border-transparent"></span>
            </span>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default LoginFormInput;

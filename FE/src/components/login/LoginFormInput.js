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
      <LoginInput
        name="email"
        type="text"
        placeholder="Email address"
        className={loginInputEmailClassName}
        onChange={loginHandler}
      />
      <div className="relative">
        <LoginInput
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          className={loginInputPasswordClassName}
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
    </Fragment>
  );
};

export default LoginFormInput;

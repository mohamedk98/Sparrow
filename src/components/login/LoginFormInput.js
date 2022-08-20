import { t } from 'i18next';
import React, { Fragment } from 'react';
import LoginInput from './LoginInput';
import { languages } from '../languagesArray';

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
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(
    lan => lan.code === currentLanguageCode
  );
  let direction = currentLanguage.dir || 'ltr';

  return (
    <Fragment>
      <div className="relative">
        <LoginInput
          id="inputbox"
          name="email"
          type="text"
          placeholder={t('Email address')}
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
          id="pw"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('Password')}
          name="password"
          className={loginInputPasswordClassName}
          onChange={loginHandler}
        />
        {formic.getFieldMeta('password').value && (
          <span
            id="eyes"
            dir="ltr"
            onClick={togglePassword}
            className={`w-5 absolute ${
              direction === 'ltr' ? 'right-5' : 'left-5'
            }  top-4  cursor-pointer`}
          >
            {showPassword ? eyeShow : eyeHide}
          </span>
        )}

        {formic.errors.password && formic.touched.password && (
          <Fragment>
            <span
              className={`text-center right-0.5 absolute text-white  bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base w-fit shadow-lg h-fit  mr-0.5 top-1.5`}
            >
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

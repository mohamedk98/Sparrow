import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import facebook from '../../assets/images/Sparrow_pic.png';
import LoginButton from './LoginButton';
import Formic from './Formic';
import SignupModal from './SignupModal';
import SignupForm from './SignupForm';
import { t } from 'i18next';

const LoginForm = () => {
  // Show modal for SignUp:
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // To show verification alert after creating a new account:
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <div className="lg:-mt-16 -mt-20 text-2xl text-center lg:text-left px-12 flex flex-col mx-auto justify-center">
        <img
          className="max-w-xs lg:ml-14 mx-auto"
          src={facebook}
          alt="rasma logo"
        />
        <span className="lg:ml-20 whitespace-normal -mt-7">
          {t(
            'Sparrow helps you connect and share with the people in your life.'
          )}
        </span>
      </div>
      <div className="lg:ml-24 mx-auto mt-10 w-3/4 text-center">
        <div className="block rounded-lg shadow-lg bg-white p-4">
          <Formic />
          <div className="text-indigo-500 mt-4 mb-5 hover:underline">
            <Link to="/reset">
              {t('Forgot password')}
              {t('input_questionMark')}
            </Link>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            <LoginButton
              name={t('Create New Account')}
              type="button"
              className="bg-facebook-green text-white font-bold text-lg border-2 rounded-md border-facebook-green py-2 px-5 mt-3 hover:bg-facebook-greenHover"
              onClick={() => {
                setShowSignUpModal(!showSignUpModal);
              }}
            />
            {showSignUpModal && (
              <SignupModal
                showModal={showSignUpModal}
                setShowModal={setShowSignUpModal}
                SignupOrResetLoginFormComponent={
                  <SignupForm
                    setShowModal={setShowSignUpModal}
                    setShowVerificationAlert={setShowVerificationAlert}
                  />
                }
                h1={t('Sign Up')}
                h6={t("It's quick and easy.")}
              />
            )}

            {
              // show verification alert after creating a new account:
            }
            {showVerificationAlert && (
              <div
                className="alert bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 items-center w-full alert-dismissible fade show mt-3 flex"
                role="alert"
              >
                <span className="flex items-center mx-auto">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="exclamation-triangle"
                    className="w-2/12 md:w-1/12 lg:w-1/12 mr-2 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                    ></path>
                  </svg>
                  {t('Please, check your email for a verification purpose.')}
                </span>
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"
                  onClick={() => setShowVerificationAlert(false)}
                ></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

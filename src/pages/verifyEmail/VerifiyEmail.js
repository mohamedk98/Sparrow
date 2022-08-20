import React, { useState } from 'react';
import facebook from '../../assets/images/Sparrow_pic.png';
import Formic from '../../components/login/Formic';
import SignupModal from '../../components/login/SignupModal';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

const VerifiyEmail = () => {
  // Show modal for LogIn:
  const [showLogInModal, setShowLogInModal] = useState(false);

  // To redirect to home page after submitting form:
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

        <span className="text-sky-700 font-bold md:text-lg mr-4 md:mr-0">
          {t("Don't forget the real life")}
        </span>

        <button
          className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-1 px-8 w-fit h-fit mr-5"
          type="button"
          onClick={() => {
            setShowLogInModal(!showLogInModal);
          }}
        >
          {t('Log In')}
        </button>

        {showLogInModal && (
          <SignupModal
            showModal={showLogInModal}
            setShowModal={setShowLogInModal}
            SignupOrResetLoginFormComponent={
              <Formic setShowModal={setShowLogInModal} />
            }
            h1={t('Log In')}
          />
        )}
      </nav>

      <div
        className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 flex items-center mx-auto mt-28 w-fit"
        role="alert"
      >
        <span className="flex mx-auto ">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check-circle"
            className="w-4 h-4 mr-2 fill-current mt-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
            ></path>
          </svg>
          {t('You made it 🥳, Now you can login!')}
        </span>
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

export default VerifiyEmail;

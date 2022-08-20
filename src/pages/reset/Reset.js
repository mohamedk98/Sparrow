import React, { useState } from 'react';
import facebook from '../../assets/images/Sparrow_pic.png';
import Formic from '../../components/login/Formic';
import LoginButton from '../../components/login/LoginButton';
import SignupModal from '../../components/login/SignupModal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../network/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
const Reset = () => {
  // Show modal for LogIn:
  const [showLogInModal, setShowLogInModal] = useState(false);

  // To show form submition error if exists:
  const [formError, setFormError] = useState('');

  // Spineer:
  const [showSinner, setShowSpinner] = useState(false);

  // For info:
  const [info, setInfo] = useState('');

  // To redirect to home page after submitting form:
  let navigate = useNavigate();

  const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Invalid email'))
      .required(t('Email address is required')),
  });

  return (
    <div className="bg-gray-200 h-screen">
      <nav className="relative w-full flex justify-between items-center bg-white shadow">
        <span className="container-fluid">
          <img
            className="h-16 mb-2 ml-2.5 w-full"
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
            h1={'Log In'}
          />
        )}
      </nav>

      <div className="flex justify-center mt-28  ">
        <div className="block rounded-lg shadow-lg bg-white max-w-sm">
          <div className="py-3 px-6 border-b border-gray-300 text-xl font-bold">
            {t('Find Your Account')}
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-base mb-4">
              {t('Please enter your email address to search for your account.')}
            </p>

            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={ResetSchema}
              onSubmit={values => {
                setFormError('');

                setShowSpinner(!showSinner);

                axiosInstance
                  .post('/reset', {
                    email: values.email,
                  })
                  .then(response => {
                    if (response.data) {
                      setInfo(response.data);
                      setShowSpinner(showSinner);
                    }
                    // navigate('/');
                  })
                  .catch(error => {
                    setFormError(
                      error.response.data.message ||
                        `${t('Something went wrong')}`
                    );
                    if (error.response) setShowSpinner(showSinner);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="email"
                    type="email"
                    placeholder={t('Email address')}
                    className={`border-2 rounded-md p-3 mb-3 w-full ${
                      errors.email && touched.email
                        ? 'outline-red-500 border-red-500'
                        : 'outline-indigo-400'
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 text-center font-bold bg-red-200 py-2 shadow-slate-400 shadow-md mb-2">
                      {errors.email}
                    </div>
                  ) : (
                    (formError || info) && (
                      <div
                        className={`${
                          formError
                            ? 'text-red-500 bg-red-200'
                            : 'text-yellow-700 bg-yellow-100'
                        } text-center font-bold  py-2 shadow-slate-400 shadow-md mb-2`}
                      >
                        {formError || info}
                      </div>
                    )
                  )}

                  <div className="py-3 px-6 border-t border-gray-300 text-gray-600 mt-3"></div>
                  <div className="flex items-center">
                    <LoginButton
                      name={
                        showSinner ? (
                          <div
                            className="spinner-border animate-spin w-8 h-8 border-4 rounded-full text-cyan-200 mx-auto"
                            role="status"
                          ></div>
                        ) : (
                          `${t('Search')}`
                        )
                      }
                      type="submit"
                      className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-2 w-full mr-2"
                    />
                    <LoginButton
                      name={t('Cancel')}
                      type="button"
                      className="bg-gray-300 text-white font-bold text-lg border-2 rounded-md border-gray-300  hover:bg-gray-400 py-2 w-full ml-2"
                      onClick={() => {
                        navigate('/login');
                      }}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;

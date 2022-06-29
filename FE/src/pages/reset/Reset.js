import React, { useState } from 'react';
import facebook from '../../assets/icons/facebook.svg';
import Formic from '../../components/login/Formic';
import LoginButton from '../../components/login/LoginButton';
import SignupModal from '../../components/login/SignupModal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../network/axiosInstance';
import { useNavigate } from 'react-router-dom';
const Reset = () => {
  // To show form submition error if exists:
  const [formError, setFormError] = useState('');

  // Spineer:
  const [showSinner, setShowSpinner] = useState(false);

  // To redirect to home page after submitting form:
  let navigate = useNavigate();

  const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email address is required'),
  });

  return (
    <div className="bg-gray-200 h-screen">
      <nav className="relative w-full flex justify-between items-center bg-white shadow">
        <span className="container-fluid">
          <img className="h-14 mb-2" src={facebook} alt="facebook logo" />
        </span>

        <span className="text-sky-700 font-bold md:text-lg mr-4 md:mr-0">
          Don't forget the real life
        </span>

        <button
          className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-1 px-8 w-fit h-fit mr-5"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Log In
        </button>

        <SignupModal
          SignupOrResetLoginFormComponent={<Formic />}
          h1={'Log In'}
        />
      </nav>

      <div className="flex justify-center mt-28  ">
        <div className="block rounded-lg shadow-lg bg-white max-w-sm">
          <div className="py-3 px-6 border-b border-gray-300 text-xl font-bold">
            Find Your Account
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-base mb-4">
              Please enter your email address or mobile number to search for
              your account.
            </p>

            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={ResetSchema}
              onSubmit={values => {
                // console.log(values);

                setFormError('');

                setShowSpinner(!showSinner);

                axiosInstance
                  .post('/login', {
                    email: values.email,
                  })
                  .then(response => {
                    // console.log(response);
                    if (response.data) setShowSpinner(showSinner);
                    navigate('/');
                  })
                  .catch(error => {
                    // console.log(error.response.data.message);
                    setFormError(
                      error.response.data.message || 'Network Error'
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
                    placeholder="Email address"
                    className={`border-2 rounded-md p-3 mb-3 w-full ${
                      errors.email && touched.email
                        ? 'outline-red-500 border-red-500'
                        : 'outline-indigo-400'
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-center text-red-500">
                      {errors.email}
                    </div>
                  ) : null}

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
                          'Search'
                        )
                      }
                      type="submit"
                      className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-2 w-full mr-2"
                    />
                    <LoginButton
                      name="Cancel"
                      type="button"
                      className="bg-gray-300 text-white font-bold text-lg border-2 rounded-md border-gray-300  hover:bg-gray-400 py-2 w-full ml-2"
                      onClick={() => {
                        navigate('/login');
                      }}
                    />
                  </div>
                  {formError && (
                    <div className="text-red-500 text-center font-bold bg-red-200 py-2 shadow-slate-400 shadow-md mt-5 mb-2">
                      {formError}
                    </div>
                  )}
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

// "border-2 rounded-md p-3 mb-3 w-full"

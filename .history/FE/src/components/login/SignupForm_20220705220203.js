import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import LoginInput from './LoginInput';
import { axiosInstance } from '../../network/axiosInstance';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';

// user intial info:
const userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  date: '', // Month/Day/Year
  gender: '',
};

const SignupForm = () => {
  // Spineer:
  const [showSinner, setShowSpinner] = useState(false);

  // To redirect to home page after submitting form:
  let navigate = useNavigate();

  // To show form submition error if exists:
  const [formError, setFormError] = useState('');

  // For form validation:
  const [user, setUser] = useState(userInfo);

  const { firstName, lastName, email, password, date, gender } = user;
  //   console.log(firstName, lastName, email, password);

  // To show form submition error if exists:
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // To get input data:
  const signupHandler = e => {
    // console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Validation schema:
  const loginValidation = Yup.object({
    firstName: Yup.string()
      .required('First Name is required')
      .min(3, 'First Name length is 3 characters at least 🤨')
      .max(16, 'First Name length is 16 characters as max 🤨')
      .matches(
        /^[a-z]+$/i,
        'Numbers and special characters are not allowed 🤨'
      ),

    lastName: Yup.string()
      .required('Last Name is required')
      .min(3, 'Last Name length is 3 characters at least 🤨')
      .max(16, 'Last Name length is 16 characters as max.🤨')
      .matches(/^[a-z ]+$/i, 'Numbers and special characters are not allowed'),
    email: Yup.string()

      .required('Email address is required when resetting password')
      .matches(
        /\w+@\w+.(com|net|org)$/gi,
        'Enter a valid email with the end of (com | net | org)'
      )
      .max(100),

    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password length must be 8 at least')
      .max(36, 'Password length max. is 36')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'password must contain at least one upper case, one lower case, one number, and one special charcter (! @ # $ % ^ & *)'
      ),

    date: Yup.string().required('Date is required'),

    gender: Yup.string().required('Gender is required'),
  });

  return (
    <Fragment>
      <Formik
        enableReinitialize // To inforce it to teset form input values when initialValues changes.
        initialValues={{
          firstName,
          lastName,
          email,
          password,
          date,
          gender,
        }}
        validationSchema={loginValidation}
        onSubmit={values => {
          // console.log(values);

          setFormError('');

          setShowSpinner(!showSinner);
          console.group(values)
          // axiosInstance
          //   .post('/signup', {
          //     firstName: values.firstName,
          //     lastName: values.lastName,
          //     email: values.email,
          //     password: values.password,
          //     date: values.date,
          //     gender: values.gender,
          //   })
          //   .then(response => {
          //     // console.log(response);

          //     if (response.data) setShowSpinner(showSinner);

          //     navigate('/');
          //   })
          //   .catch(error => {
          //     // console.log(error, error.message);
          //     setFormError(error.response.data.message || error.message);

          //     if (error.response) setShowSpinner(showSinner);
          //   });
        }}
      >
        {formic => (
          <Form onSubmit={formic.handleSubmit} className="flex flex-col">
            <LoginInput
              name="firstName"
              type="text"
              placeholder="First name"
              className="border-2 rounded-md p-3 mb-3 mr-5 w-full"
              onChange={signupHandler}
            />
            <LoginInput
              name="lastName"
              type="text"
              placeholder="Last name"
              className="border-2 rounded-md p-3 mb-3 w-full"
              onChange={signupHandler}
            />
            <LoginInput
              name="email"
              type="text"
              placeholder="Email address"
              className="border-2 rounded-md p-3 mb-3 w-full"
              onChange={signupHandler}
            />
            <div className="relative">
              <LoginInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                className="border-2 rounded-md p-3 mb-2 w-full"
                onChange={signupHandler}
              />

              <span
                onClick={togglePassword}
                className={
                  formic.errors.firstName ||
                  formic.errors.lastName ||
                  formic.errors.email ||
                  formic.errors.password
                    ? 'hidden'
                    : 'absolute right-7 top-5'
                }
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>

            <div className="text-xs my-1">
              Date of birth
              {formic.errors.date ? (
                <div className="text-center text-red-500">
                  {formic.errors.date}
                </div>
              ) : (
                ''
              )}
              <input
                type="date"
                name="date"
                onChange={signupHandler}
                // className="block text-center m-auto border border-gray-300 px-7 py-1 text-base"
                className={`block text-center m-auto border border-gray-300 px-7 py-1 text-base rounded ${
                  formic.errors.date
                    ? ' outline-red-500 border-red-500'
                    : ' outline-indigo-400'
                }`}
              />
            </div>

            <div className="text-xs my-1 mb-5">
              Gender
              {formic.errors.gender ? (
                <div className="text-center text-red-500">
                  {formic.errors.gender}
                </div>
              ) : (
                ''
              )}
              <div className="flex justify-around text-base mt-1">
                <div
                  className={`form-check form-check-inline border border-solid  w-1/3 py-2 flex justify-around rounded ${
                    formic.errors.date
                      ? ' outline-red-500 border-red-500'
                      : ' outline-indigo-400'
                  }`}
                >
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="male"
                  >
                    Male
                  </label>
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={signupHandler}
                  />
                </div>
                <div
                  className={`form-check form-check-inline border border-solid 00 w-1/3 py-2 flex justify-around rounded ${
                    formic.errors.date
                      ? ' outline-red-500 border-red-500'
                      : ' outline-indigo-400'
                  }`}
                >
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="female"
                  >
                    Female
                  </label>
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={signupHandler}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <LoginButton
                name={
                  showSinner ? (
                    <div
                      className="spinner-border animate-spin w-8 h-8 border-4 rounded-full text-green-100 mx-auto"
                      role="status"
                    ></div>
                  ) : (
                    'Sign Up'
                  )
                }
                type="submit"
                className="bg-facebook-green text-white font-bold text-lg border-2 rounded-md border-facebook-green py-1 px-14 mt-3 mx-auto hover:bg-facebook-greenHover"
              />
            </div>
            {formError && (
              <div className="text-red-500 text-center font-bold bg-red-200 py-2 shadow-slate-400 shadow-md">
                {formError}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default SignupForm;

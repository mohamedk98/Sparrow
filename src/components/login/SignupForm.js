import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import LoginInput from './LoginInput';
import { axiosInstance } from '../../network/axiosInstance';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';

// user intial info:
const userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  date: '', // Month/Day/Year
  gender: '',
};

const SignupForm = ({
  setShowModal,

  // For Verification Alert
  setShowVerificationAlert,
}) => {
  // const dispatch = useDispatch();

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

      .required('Email address is required while resetting password')
      .matches(
        /\w+@\w+.(com|net|org)$/gi,
        'Enter a valid email with the end of (com | net | org)'
      )
      .max(100),

    password: Yup.string()
      .required('Password is required')
      // .min(8, 'Password length must be 8 at least')
      // .max(36, 'Password length max. is 36')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Password length must be eight at least, composed of at least one uppercase, one lowercase letters, one number and one special charcter (! @ # $ % ^ & *)'
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

          setShowSpinner(true);
          const userAge = new Date().getFullYear() - values.date.slice(0, 4);

          //Check if the user age is less than 18 years
          if (userAge < 18) {
            setFormError(' Your age cannot be less than 18 years ');
            setShowSpinner(false);
            return;
          }

          axiosInstance
            .post('/signup', {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              date: values.date,
              gender: values.gender,
            })
            .then(response => {
              if (response.data) {
                setShowSpinner(false);
                setShowModal(false);
                setShowVerificationAlert(true);
              }

              // navigate('/');
            })
            .catch(error => {
              // console.log(error, error.message);
              setFormError(
                error?.response?.data?.message ||
                  error?.message ||
                  'Something went wrong'
              );

              if (error.response) setShowSpinner(false);
            });
        }}
      >
        {formic => (
          <Form onSubmit={formic.handleSubmit} className="flex flex-col">
            <div className="flex justify-between">
              <LoginInput
                name="firstName"
                type="text"
                placeholder="First name"
                className="border-2 rounded-md p-3 mb-3 w-full"
                onChange={signupHandler}
              />

              {formic.errors.firstName && formic.touched.firstName && (
                <Fragment>
                  <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base shadow-lg h-fit -left-52 top-5 mt-0.5 whitespace-pre-wrap w-[13rem]">
                    {formic.errors.firstName}
                    <span className="absolute h-0 w-0 border-y-8 border-y-transparent border-l-[14px] border-l-red-800 -right-3 top-3 border-transparent"></span>
                  </span>
                </Fragment>
              )}

              <LoginInput
                name="lastName"
                type="text"
                placeholder="Last name"
                className="border-2 rounded-md p-3 mb-3 w-full"
                onChange={signupHandler}
              />
              {formic.errors.lastName && formic.touched.lastName && (
                <Fragment>
                  <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base shadow-lg h-fit -right-52 top-5 mt-0.5 whitespace-pre-wrap w-[13rem]">
                    {formic.errors.lastName}
                    <span className="absolute h-0 w-0 border-y-8 border-y-transparent border-r-[14px]  border-r-red-800 -left-3 top-3 border-transparent"></span>
                  </span>
                </Fragment>
              )}
            </div>
            <LoginInput
              name="email"
              type="text"
              placeholder="Email address"
              className="border-2 rounded-md p-3 mb-3 w-full"
              onChange={signupHandler}
            />
            {formic.errors.email && formic.touched.email && (
              <Fragment>
                <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 text-base  shadow-lg h-fit -left-56 top-16 mt-2.5 whitespace-pre-wrap w-[14rem] px-1">
                  {formic.errors.email}
                  <span className="absolute h-0 w-0 border-y-8 border-l-[14px] border-l-red-800 -right-3 top-6 border-transparent"></span>
                </span>
              </Fragment>
            )}

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
                className="absolute right-5 top-5 -mt-0.5 cursor-pointer"
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>

              <PasswordStrengthBar password={password} />

              {formic.errors.password && formic.touched.password && (
                <Fragment>
                  <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 text-base shadow-lg h-fit -right-56 top-1.5 mt-0.5 px-2.5 whitespace-pre-wrap w-[13rem]">
                    {formic.errors.password}
                    <span className="absolute h-0 w-0 border-y-8 border-r-[14px] border-transparent border-r-red-800 -left-3 top-3"></span>
                  </span>
                </Fragment>
              )}
            </div>

            <div className="text-xs my-1 relative">
              Date of birth
              {formic.errors.date && formic.touched.date && (
                <Fragment>
                  <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base w-fit shadow-lg h-fit -left-44 top-3">
                    {formic.errors.date}
                    <span className="absolute h-0 w-0 border-y-8 border-y-transparent border-l-[14px] border-l-red-800 -right-3 top-3"></span>
                  </span>
                </Fragment>
              )}
              <input
                type="date"
                name="date"
                onChange={signupHandler}
                className={`block text-center m-auto border border-gray-300 px-7 py-1 text-base rounded ${
                  formic.errors.date && formic.touched.date
                    ? ' outline-red-500 border-red-500'
                    : ' outline-indigo-400'
                }`}
              />
            </div>

            <div className="text-xs my-1 mb-5 relative">
              Gender
              {formic.errors.gender && formic.touched.gender && (
                <Fragment>
                  <span className="text-center text-white absolute bg-red-800 opacity-80 rounded-lg py-2 px-6 text-base w-fit shadow-lg h-fit -right-48 -mr-1 top-5">
                    {formic.errors.gender}
                    <span className="absolute h-0 w-0 border-y-8 border-y-transparent border-r-[14px] border-r-red-800 -left-3 top-3"></span>
                  </span>
                </Fragment>
              )}
              <div className="flex justify-around text-base mt-1">
                <div
                  className={`form-check form-check-inline border border-solid  w-1/3 py-2 flex justify-around rounded ${
                    formic.errors.gender && formic.touched.gender
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
                    formic.errors.gender && formic.touched.gender
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

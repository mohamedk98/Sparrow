import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { Link } from 'react-router-dom';
import eyeShow from '../../assets/icons/eye-password-show.svg';
import eyeHide from '../../assets/icons/eye-password-hide.svg';
import LoginInput from './LoginInput';
import SelectInput from './SelectInput';
import axiosInstance from '../../network/axiosInstance';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';

// user intial info:
const userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
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

  const { firstName, lastName, email, password, year, month, day, gender } =
    user;
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

  const years = Array.from(new Array(92), (_, index) => year - index);
  //   console.log(years);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

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
      .email('Enter a valid email 🤨')
      .max(100),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password length must be 8 at least')
      .max(36, 'Password length max. is 36')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'password must contain at least one upper case, one lower case, one number, and one special charcter (! @ # $ % ^ & *)'
      ),
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
          year,
          month,
          day,
          gender,
        }}
        validationSchema={loginValidation}
        onSubmit={values => {
          // console.log(values);

          setFormError('');

          setShowSpinner(!showSinner);

          axiosInstance
            .post('/signup', {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              year: values.year,
              month: values.month,
              day: values.day,
              gender: values.gender,
            })
            .then(response => {
              // console.log(response);

              if (response.data) setShowSpinner(showSinner);

              navigate('/');
            })
            .catch(error => {
              // console.log(error, error.message);
              setFormError(error.response.data.message || error.message);

              if (error.response) setShowSpinner(showSinner);
            });
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
              {formic.getFieldMeta('password').value && (
                <img
                  onClick={togglePassword}
                  src={showPassword ? eyeShow : eyeHide}
                  alt="eye icon"
                  className={
                    formic.errors.password
                      ? 'w-5 absolute top-16 right-5 cursor-pointer'
                      : 'w-5 absolute top-4 right-5 cursor-pointer'
                  }
                />
              )}
            </div>

            <div className="text-xs my-1">
              Date of birth
              <SelectInput
                years={years}
                months={months}
                days={days}
                signupHandler={signupHandler}
              />
            </div>

            <div className="text-xs my-1">
              Gender
              <div className="flex justify-around text-base">
                <div className="form-check form-check-inline border border-solid border-gray-300 w-1/3 py-2 flex justify-around rounded">
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
                <div className="form-check form-check-inline border border-solid border-gray-300 w-1/3 py-2 flex justify-around rounded">
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

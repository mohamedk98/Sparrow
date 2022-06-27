import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { Link } from 'react-router-dom';
import eyeShow from '../../assets/icons/eye-password-show.svg';
import eyeHide from '../../assets/icons/eye-password-hide.svg';
import LoginInput from './LoginInput';
import SelectInput from './SelectInput';

const userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  currentDay: new Date().getDay,
  gender: '',
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(userInfo);
  const {
    firstName,
    lastName,
    email,
    password,
    currentYear,
    currentMonth,
    currentDay,
    gender,
  } = user;
  //   console.log(firstName, lastName, email, password);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const signupHandler = e => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(92), (_, index) => currentYear - index);
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
          currentYear,
          currentMonth,
          currentDay,
          gender,
        }}
        validationSchema={loginValidation}
      >
        {formic => (
          <Form className="flex flex-col">
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
                      ? 'w-5 absolute top-10 right-5 cursor-pointer'
                      : 'w-5 absolute top-4 right-5 cursor-pointer'
                  }
                />
              )}
            </div>

            <div className="text-xs my-1">
              Date of birth
              <SelectInput years={years} months={months} days={days} />
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
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default SignupForm;

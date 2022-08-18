import React, { useState } from 'react';
import facebook from '../../assets/icons/facebook.svg';
import LoginButton from '../../components/login/LoginButton';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { axiosInstance } from '../../network/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { t } from 'i18next';

const ResetPassword = () => {
  // To show form submition error if exists:
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  // To show form submition error if exists:
  const [formError, setFormError] = useState('');

  // Spineer:
  const [showSinner, setShowSpinner] = useState(false);

  // To redirect to home page after submitting form:
  let navigate = useNavigate();

  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password length must be 8 at least')
      .max(36, 'Password length max. is 36')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'password must contain at least one upper case, one lower case, one number, and one special charcter (! @ # $ % ^ & *)'
      ),

    rePassword: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords does not match'),
  });

  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  const resetToken = searchParams.get('resetToken');

  console.log(email, resetToken);

  return (
    <div className="bg-gray-200 h-screen">
      <nav className="relative w-full flex justify-between items-center bg-white shadow">
        <span className="container-fluid">
          <img className="h-14 mb-2" src={facebook} alt="facebook logo" />
        </span>

        <span className="text-sky-700 font-bold md:text-lg mr-4">
          {t("Don't forget the real life")}
        </span>
      </nav>

      <div className="flex justify-center mt-28  ">
        <div className="block rounded-lg shadow-lg bg-white max-w-sm">
          <div className="py-3 px-6 border-b border-gray-300 text-xl font-bold">
            {t('Change Your Password')}
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-base mb-4">
             {t(' Make sure that the new password is different from the old one.')}
            </p>

            <Formik
              initialValues={{
                password: '',
                rePassword: '',
              }}
              validationSchema={ResetSchema}
              onSubmit={values => {
                // console.log(values);

                setFormError('');

                setShowSpinner(!showSinner);

                // ?email=${email}?resetToken=${resetToken}

                axiosInstance
                  .post(`http://localhost:3000/resetPassword`, {
                    password: values.password,
                    rePassword: values.rePassword,
                  })
                  .then(response => {
                    console.log(response);
                    if (response.data) setShowSpinner(showSinner);
                    navigate('/login');
                  })
                  .catch(error => {
                    console.log(error.response.data.message);
                    setFormError(
                      error.response.data.message || 'Something went wrong'
                    );
                    if (error.response) setShowSpinner(showSinner);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="relative">
                    <Field
                      name="password"
                      type={`${showPassword ? 'text' : 'password'}`}
                      placeholder="Password"
                      className={` border-2 rounded-md p-3 mb-3 w-full ${
                        errors.password && touched.password
                          ? 'outline-red-500 border-red-500'
                          : 'outline-indigo-400'
                      }`}
                    />
                    <span
                      onClick={togglePassword}
                      className="absolute right-3 top-5 -mt-0.5"
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                    {errors.password && touched.password ? (
                      <div className="text-center text-red-500">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <Field
                      name="rePassword"
                      type={`${showRePassword ? 'text' : 'password'}`}
                      placeholder="confirm password"
                      className={`border-2 rounded-md p-3 mb-3 w-full ${
                        errors.rePassword && touched.rePassword
                          ? 'outline-red-500 border-red-500'
                          : 'outline-indigo-400'
                      }`}
                    />
                    <span
                      onClick={toggleRePassword}
                      className="absolute right-3 top-5 -mt-0.5"
                    >
                      {showRePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                    {errors.rePassword && touched.rePassword ? (
                      <div className="text-center text-red-500">
                        {errors.rePassword}
                      </div>
                    ) : null}
                  </div>

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
                          'Change'
                        )
                      }
                      type="submit"
                      className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-2 w-full mr-2"
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

export default ResetPassword;

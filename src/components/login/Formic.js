import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../network/axiosInstance';
import { useDispatch } from 'react-redux';
import { addAuthentication } from '../../store/userSlice/UserSlice';
import LoginFormInput from './LoginFormInput';
import LoginButton from './LoginButton';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';

// User intial info:
const loginInfo = {
  email: '',
  password: '',
};

const Formic = ({ setShowModal }) => {
  const dispatch = useDispatch();
  // Spineer:
  const [showSinner, setShowSpinner] = useState(false);

  // To redirect to home page after submitting form:
  let navigate = useNavigate();

  // To show form submition error if exists:
  const [formError, setFormError] = useState('');

  // For password Eye hide/show:
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // For form validation:
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;
  // console.log(email, password);

  // To get input data:
  const loginHandler = e => {
    // console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // Validation schema:
  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Invalid email')
      .max(100),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div>
      <Formik
        enableReinitialize // To inforce it to teset form input values when initialValues changes.
        initialValues={{ email, password }}
        validationSchema={loginValidation}
        onSubmit={values => {
          // console.log(values);

          setFormError('');

          setShowSpinner(!showSinner);

          axiosInstance
            .post('/login', {
              email: values.email,
              password: values.password,
            })
            .then(response => {
              // console.log(response);
              if (response.data) setShowSpinner(showSinner);
              dispatch(addAuthentication(response.data));
              setShowModal && setShowModal(false);
              navigate('/');
            })
            .catch(error => {
              // console.log(error.response.data.message);
              setFormError(
                error?.response?.data?.message || 'Something went wrong'
              );
              if (error.response) setShowSpinner(showSinner);
            });
        }}
      >
        {formic => (
          <Form
            onSubmit={formic.handleSubmit}
            className="flex flex-col text-center"
          >
            <LoginFormInput
              loginHandler={loginHandler}
              showPassword={showPassword}
              formic={formic}
              togglePassword={togglePassword}
              eyeShow={<AiFillEye />}
              eyeHide={<AiFillEyeInvisible />}
              loginInputEmailClassName="border-2 rounded-md p-3 mb-3 w-full"
              loginInputPasswordClassName="border-2 rounded-md p-3 mb-2 w-full"
            />

            {formError && (
              <div className="text-red-500 text-center font-bold bg-red-200 py-2 shadow-slate-400 shadow-md mt-3 mb-2">
                {formError}
              </div>
            )}
            <LoginButton
              name={
                showSinner ? (
                  <div
                    className="spinner-border animate-spin w-8 h-8 border-4 rounded-full text-cyan-200 mx-auto"
                    role="status"
                  ></div>
                ) : (
                  'Log In'
                )
              }
              type="submit"
              className="bg-facebook-blue text-white font-bold text-lg border-2 rounded-md border-facebook-blue hover:bg-facebook-blueHover py-2 mt-3"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formic;

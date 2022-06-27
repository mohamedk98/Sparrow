import React, { Fragment } from 'react';
import { useField } from 'formik';

const LoginInput = ({ placeholder, className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <input
        type={field.type}
        name={field.name}
        placeholder={
          (placeholder =
            meta.touched && meta.error
              ? field.name === 'email'
                ? 'Email address is required'
                : 'Password is required'
              : placeholder)
        }
        className={
          (className =
            meta.touched && meta.error
              ? className +
                ' outline-red-500 border-red-500 placeholder-red-500 placeholder:text-red-700'
              : className + ' outline-indigo-400')
        }
        {...field}
        {...props}
      />
    </Fragment>
  );
};

export default LoginInput;

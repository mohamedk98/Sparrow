import React from 'react';
import { useField } from 'formik';

const LoginInput = ({ placeholder, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col">
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        className={
          (className =
            meta.touched && meta.error
              ? className + ' outline-red-500 border-red-500'
              : className + ' outline-indigo-400')
        }
        {...field}
        {...props}
      />
    </div>
  );
};

export default LoginInput;

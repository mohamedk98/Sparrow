import React, { useEffect } from 'react';
import { useField } from 'formik';
import { languages } from '../languagesArray';

const LoginInput = ({ id, placeholder, className, ...props }) => {
  const [field, meta] = useField(props);

  //Start change
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(
    lan => lan.code === currentLanguageCode
  );
  useEffect(() => {
    document.getElementById(`${id}`).dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage, id]);
  //End change language

  return (
    <div className="flex flex-col">
      <input
        dir="ltr"
        id={id}
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

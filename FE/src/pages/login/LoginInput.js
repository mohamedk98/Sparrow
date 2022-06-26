import React from 'react';

const LoginInput = ({ placeholder, type, name, className }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
      />
    </div>
  );
};

export default LoginInput;

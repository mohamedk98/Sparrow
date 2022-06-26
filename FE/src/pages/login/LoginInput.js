import React from 'react';

const LoginInput = ({ placeholder, type }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="border-2 rounded-md p-3 mb-2 w-full outline-indigo-400"
      />
    </div>
  );
};

export default LoginInput;

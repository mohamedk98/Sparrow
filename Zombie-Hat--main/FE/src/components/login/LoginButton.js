import React, { Fragment } from 'react';

const LoginButton = ({ name, className, type, ...props }) => {
  return (
    <Fragment>
      <button className={className} type={type} {...props}>
        {name}
      </button>
    </Fragment>
  );
};

export default LoginButton;

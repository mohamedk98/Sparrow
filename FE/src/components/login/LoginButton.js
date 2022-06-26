import React, { Fragment } from 'react';

const LoginButton = ({ name, className, type }) => {
  return (
    <Fragment>
      <button className={className} type={type}>
        {name}
      </button>
    </Fragment>
  );
};

export default LoginButton;

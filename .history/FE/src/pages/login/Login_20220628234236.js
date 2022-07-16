import React from 'react';
import Footer from '../../components/login/footer';

import LoginForm from '../../components/login/LoginForm';
import SignupForm from '../../components/login/SignupForm';
import SignupModal from '../../components/login/SignupModal';

const Login = () => {
  return (
    <div className="bg-gray-200 h-full pt-24">
      <LoginForm />
      <SignupModal
        SignupOrResetLoginFormComponent={<SignupForm />}
        h1={'Sign Up'}
        h6={"It's quick and easy."}
      />
      <Footer />
    </div>
  );
};

export default Login;

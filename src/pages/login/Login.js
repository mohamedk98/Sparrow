import React from 'react';
import Footer from '../../components/login/Footer';

import LoginForm from '../../components/login/LoginForm';
import SignupModal from '../../components/login/SignupModal';

const Login = () => {
  return (
    <div className="bg-gray-200 h-full pt-24">
      <LoginForm />
      <SignupModal />
      <Footer />
    </div>
  );
};

export default Login;

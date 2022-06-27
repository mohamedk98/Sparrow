import React from 'react';
import LoginForm from '../../components/login/LoginForm';
import Footer from '../../components/login/Footer';

const Login = () => {
  return (
    <div className="bg-gray-200 h-full pt-24">
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;

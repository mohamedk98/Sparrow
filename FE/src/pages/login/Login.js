import React from 'react';
import LoginForm from '../../components/login/LoginForm';
<<<<<<< HEAD
import Footer from '../../components/login/Footer';
=======
import SignupForm from '../../components/login/SignupForm';
>>>>>>> 7925f0d0ad71f0b77dd38758e4715c61afc99b60
import SignupModal from '../../components/login/SignupModal';


const Login = () => {
  return (
    <div className="bg-gray-200 h-full pt-24">
      <LoginForm />
<<<<<<< HEAD
=======
      <SignupModal
        SignupOrResetLoginFormComponent={<SignupForm />}
        h1={'Sign Up'}
        h6={"It's quick and easy."}
      />
>>>>>>> 7925f0d0ad71f0b77dd38758e4715c61afc99b60
      <Footer />
    </div>
  );
};

export default Login;

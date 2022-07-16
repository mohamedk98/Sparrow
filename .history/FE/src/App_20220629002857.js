// import logo from './logo.svg';
// import './App.css';

import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/error/Error';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Reset from './pages/reset/Reset';

function App() {
  const authenticationData = 0
  const dispatch = useDispatch()
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;

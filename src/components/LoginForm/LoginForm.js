import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../network/axiosInstance";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { addAdminData, addToken } from "../../Store/UserSlice/AdminDataSlice";
import logo from "../../assets/logo_sparrow.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErr(null);
    axiosInstance
      .post("/admin/login", { email: email, password: pass })
      .then((res) => {
        localStorage.setItem("token", res.data);
        dispatch(addToken(res.data));
        navigate("/home");
      })
      .catch((err) => {
        if (err.response) {
          setErr(err.response.data);
        }
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <img
            src={logo}
            alt="sparrow_logo"
            className="w-48 justify-center text-center mx-auto"
          />
          <h1 className="mb-2 text-3xl text-center text-indigo-500">Log In</h1>
          <p className="mb-6 text-sm text-center text-red-500">
            {err ? err : ""}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="Email"
            />
            <span className="flex text-red-500 text-sm w-full mb-4"></span>

            <div className="relative w-full">
              <input
                type={showPass ? "text" : "password"}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
                placeholder="Password"
              />
              {pass ? (
                <div
                  className="text-2xl absolute top-4 right-5"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              ) : (
                ""
              )}

              <span className="flex text-red-500 text-sm w-full mb-4"></span>
            </div>

            <button
              type="submit"
              className={`w-full text-center py-3 rounded bg-indigo-500 text-white hover:bg-green-dark focus:outline-none my-1`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

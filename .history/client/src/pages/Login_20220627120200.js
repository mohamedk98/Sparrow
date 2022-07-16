import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/login")
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(response);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        id="email"
        className="input input-bordered input-primary w-full max-w-xs"
        {...formik.getFieldProps("email")}
      />

      <input
        type="password"
        placeholder="password"
        id="password"
        className="input input-bordered input-primary w-full max-w-xs"
        {...formik.getFieldProps("password")}
      />
      {/* {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null} */}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;

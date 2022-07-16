import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAuth } from "../store/slicers/user";
import axiosInstance from "../network/axiosInstance";
const Login = () => {
  const navigate = useNavigate();
  //Server Errors state
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //Reset error state on submitting
      setFormError("");
      axiosInstance
        .post("/login", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          dispatch(addAuth(response.data));
          navigate("/profile"); // Navigate to home after submission
        })
        .catch((error) => {
          //Get error message from the API and add it to the state
          setFormError(error.response.data.message);
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col space-y-4 mx-auto items-center justify-center mt-5"
    >
      <input
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        className="input input-bordered input-primary w-full max-w-xs"
        {...formik.getFieldProps("email")}
      />

      <input
        type="password"
        placeholder="password"
        id="password"
        name="password"
        className="input input-bordered input-primary w-full max-w-xs"
        {...formik.getFieldProps("password")}
      />
      <div class="form-control flex space-x-2">
        <label class="label cursor-pointer">
          <span class="label-text">Remember me</span>
          <input
            type="checkbox"
            checked="checked"
            class="checkbox checkbox-primary"
          />
        </label>
      </div>
      {formError && <div className="text-red-500">{formError}</div>}

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;

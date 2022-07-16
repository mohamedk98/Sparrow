import React from "react";
import { useFormik } from "formik";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password:""
    },

    onSubmit: (values) => {
      console.log({...values})
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      {/* {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null} */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;

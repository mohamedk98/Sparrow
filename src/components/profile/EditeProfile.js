import React, { useRef, useState } from "react";
import {
  AiFillEyeInvisible,
  AiFillLock,
  AiOutlineClose,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../network/axiosInstance";
import { addUserData } from "../../store/userSlice/UserDataSlice";
import ConfirmUnblock from "./ConfirmUnblock";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AiFillEye } from "react-icons/ai";
import LoginButton from "../../components/login/LoginButton";
import { t } from "i18next";

function EditeProfile({ editProfile, setEditProfile }) {
  const userState = useSelector((state) => state.userData.userData);
  const otherUserState = useSelector(state =>state.otherUserData.otherUserData);
  const dispatch = useDispatch();
  let Navigate = useNavigate();
  const [changeName, setChangeName] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [blockList, setBlockList] = useState(false);
  const [unblock, setUnblock] = useState(false);
  const [name, setName] = useState({
    firstName: userState.firstName,
    lastName: userState.lastName,
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  /*  formik */
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  // To show form submition error if exists:
  const [formError, setFormError] = useState("");

  // Spineer:
  const [showSinner, setShowSpinner] = useState(false);

  // To redirect to home page after submitting form:
  let navigate = useNavigate();

  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length must be 8 at least")
      .max(36, "Password length max. is 36")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "password must contain at least one upper case, one lower case, one number, and one special charcter (! @ # $ % ^ & *)"
      ),

    rePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords does not match"),
  });

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const resetToken = searchParams.get("resetToken");

  console.log(email, resetToken);

  const changeNameHandler = (name, e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/profile/name`, { name })
      .then((response) => {
        dispatch(addUserData(response.data));
      })
      .catch((error) => console.log(error));
    setChangeName(false);
  };
  /* const changePasswordHandler = (password, e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/profile/password`, { password })
      .then((response) => {
        dispatch(addUserData(response.data));
      })
      .catch((error) => console.log(error));
    setChangePassword(false);
  }; */
  const unblockFriend = (id, e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/friends/friend/block/${id}`)
      .then((response) => {
        dispatch(addUserData(response.data));
        navigate(`/${userState.username}`)
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full modal backdrop-blur-md cursor-auto outline-none overflow-x-hidden overflow-y-auto">
      <div className="lg:w-3/5 w-4/5 mx-auto mt-5 p-5 shadow-lg shadow-slate-400 rounded-lg bg-white dark:bg-zinc-700 dark:text-slate-100">
        <div className="relative mb-3 text-black dark:text-slate-100">
          <div className="text-center text-xl font-semibold">
            {t('Update your Profile')}
          </div>
          <button
            className="absolute right-2 top-0 text-xl"
            onClick={() => setEditProfile(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <hr></hr>
        <div className="text-lg my-4 p-2">
          <div
            className="flex gap-2.5 items-center text-indigo-500 dark:text-slate-100 m-3 cursor-pointer hover:underline"
            onClick={() => setChangeName((prev) => !prev)}
          >
            <BiEditAlt />
            <span>{t('Change Your Name')}</span>
          </div>
          {changeName && (
            <div className="border rounded-lg p-3 m-2">
              <form>
                <div className="m-2">
                  <span className="ml-2 text-indigo-300 dark:text-slate-100">
                    {t('First Name')}
                  </span>
                  <input
                    type="text"
                    defaultValue={userState.firstName}
                    className="w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400"
                    placeholder="Your First Name"
                    onChange={(e) => {
                      setName({ ...name, firstName: e.target.value });
                    }}
                  />
                </div>
                <div className="m-2">
                  <span className="ml-2 text-indigo-300 dark:text-slate-100">
                   {t('Last Name')}
                  </span>
                  <input
                    type="text"
                    defaultValue={userState.lastName}
                    className="w-full text-black dark:text-slate-100 dark:bg-zinc-500 text-base my-2 p-4 border rounded-xl focus:outline outline-2 outline-offset-4 outline-indigo-500 focus:placeholder:text-indigo-500 hover:border-gray-400"
                    placeholder="Your First Name"
                    onChange={(e) => {
                      setName({ ...name, lastName: e.target.value });
                    }}
                  />
                </div>
                <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                  <div className="bg-indigo-500 dark:bg-indigo-500 text-white rounded-lg p-2 cursor-pointer hover:brightness-95">
                    <button
                      type="submit"
                      className="font-semibold ml-1"
                      onClick={(e) => changeNameHandler(name, e)}
                    >
                      {t('Change')}
                    </button>
                  </div>
                  <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setChangeName(false);
                      }}
                      className="font-semibold ml-1"
                    >
                      {t('cancel')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div
            className="flex gap-2.5 items-center text-indigo-500 dark:text-slate-100 m-3 cursor-pointer hover:underline"
            onClick={() => setChangePassword((prev) => !prev)}
          >
            <AiFillLock />
            <span>{t('Change Your Password')}</span>
          </div>
          {changePassword && (
            <Formik
              initialValues={{
                oldPassowrd: "",
                password: "",
                rePassword: "",
              }}
              validationSchema={ResetSchema}
              onSubmit={(values) => {
                setFormError("");
                setShowSpinner(!showSinner);

                axiosInstance
                  .patch(`profile/changePassword`, {
                    oldPassword: values.oldPassword,
                    newPassword: values.password,
                    newRePassword: values.rePassword,
                  })
                  .then((response) => {
                    console.log(response);
                    if (response.data) setShowSpinner(showSinner);
                    navigate("/login");
                  })
                  .catch((error) => {
                    console.log(error.response.data.message);
                    setFormError(
                      error.response.data.message || `${t('Something went wrong')}`
                    );
                    if (error.response) setShowSpinner(showSinner);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="relative">
                    <Field
                      name="oldPassword"
                      onChange={(e) => {
                        setPassword({ ...password, oldPassword: e.target.value });
                      }}
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Old Password"
                      className={` border-2 rounded-md p-3 mb-3 w-full ${
                        errors.password && touched.password
                          ? "outline-red-500 border-red-500"
                          : "outline-indigo-400"
                      }`}
                    />
                    <span
                      onClick={togglePassword}
                      className="absolute right-3 top-5 -mt-0.5"
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                    {errors.password && touched.password ? (
                      <div className="text-center text-red-500">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <Field
                      name="password"
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="New Password"
                      className={` border-2 rounded-md p-3 mb-3 w-full ${
                        errors.password && touched.password
                          ? "outline-red-500 border-red-500"
                          : "outline-indigo-400"
                      }`}
                    />
                    <span
                      onClick={togglePassword}
                      className="absolute right-3 top-5 -mt-0.5"
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                    {errors.password && touched.password ? (
                      <div className="text-center text-red-500">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <Field
                      name="rePassword"
                      type={`${showRePassword ? "text" : "password"}`}
                      placeholder="confirm password"
                      className={`border-2 rounded-md p-3 mb-3 w-full ${
                        errors.rePassword && touched.rePassword
                          ? "outline-red-500 border-red-500"
                          : "outline-indigo-400"
                      }`}
                    />
                    <span
                      onClick={toggleRePassword}
                      className="absolute right-3 top-5 -mt-0.5"
                    >
                      {showRePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                    {errors.rePassword && touched.rePassword ? (
                      <div className="text-center text-red-500">
                        {errors.rePassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="py-3 px-6 border-t border-gray-300 text-gray-600 mt-3"></div>
                  <div className="flex items-center">
                    <LoginButton
                      name={
                        showSinner ? (
                          <div
                            className="spinner-border animate-spin w-8 h-8 border-4 rounded-full text-cyan-200 mx-auto"
                            role="status"
                          ></div>
                        ) : (
                          "Change"
                        )
                      }
                      type="submit"
                      className="bg-indigo-500 text-white font-bold text-lg border-2 rounded-md border-indigo-500 hover:bg-indigo-500 py-2 w-full mr-2"
                    />
                  </div>
                  {formError && (
                    <div className="text-red-500 text-center font-bold bg-red-200 py-2 shadow-slate-400 shadow-md mt-5 mb-2">
                      {formError}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
          <div
            className="flex gap-2.5 items-center text-indigo-500 dark:text-slate-100 m-3 cursor-pointer hover:underline"
            onClick={() => setBlockList((prev) => !prev)}
          >
            <AiOutlineSetting />
            <span>{t('Manage Block List')}</span>
          </div>
          {blockList && (
            <div>
              <div className="m-2">
                <div className="border p-2 rounded-lg">
                  {otherUserState?.blockList?.map((friend, index) => {
                    return (
                      <div
                        key={friend.userId}
                        className="flex relative justify-between items-center rounded-lg p-3 border dark:border-zinc-600 gap-2.5 h-24"
                      >
                        <div className="flex items-center">
                          <Link to={`/${friend.userId.username}`}>
                            <img
                              src={friend.userId.profileImage}
                              alt="photos"
                              className="w-20 h-20 rounded-md hover:brightness-95"
                            ></img>
                          </Link>
                          <Link to={`/${friend.userId.username}`}>
                            <span className="text-md mx-2 font-semibold hover:underline ">
                              {friend.userId.firstName} {friend.userId.lastName}
                            </span>
                          </Link>
                        </div>
                        <button
                          className="p-2 rounded-lg bg-indigo-500 text-white dark:bg-zinc-500 dark:text-slate-100 hover:brightness-95"
                          onClick={(e) => setUnblock(true)}
                        >
                          {t('Unblock')}
                        </button>
                        {unblock && (
                          <ConfirmUnblock
                            friend={friend}
                            unblockFriend={unblockFriend}
                            setUnblock={setUnblock}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-2.5 w-3/4 justify-center m-auto mt-4">
                <div className="bg-slate-200 dark:bg-zinc-400 rounded-lg p-2 cursor-pointer hover:brightness-95">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setBlockList(false);
                    }}
                    className="font-semibold ml-1"
                  >
                    {t('Close')}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/*  <div className='mx-2'>
                        <button  
                                className='text-white bg-indigo-500 p-2 rounded-lg m-2 hover:brightness-95'
                                onClick={(e)=>infosHandler(e)}
                                >Save</button>
                        <button className=' dark:bg-zinc-500 dark:hover:brightness-95 hover:bg-slate-200 p-2 rounded-lg m-2'
                                onClick={()=>setUpdateInfos(false)}
                        >Cancel</button>
                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default EditeProfile;

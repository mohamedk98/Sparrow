import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/axiosInstance";
import { addAdminData } from "../../Store/UserSlice/AdminDataSlice";
import ChangePassword from "./ChangePassword";

function ProfilePic() {
  const adminData = useSelector((state) => state.adminData.adminData);
  const [imgPreview, setImgPreview] = useState(null);
  const [fullName, setFullName] = useState(" ");
  const [err, setErr] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editForm, setEditForm] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const imageData = new FormData();

  useEffect(() => {
    axiosInstance
      .get("/admin/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        dispatch(addAdminData(response.data));
        setFullName(response.data.fullName);
      });
  }, []);
  // const handleImgChange = (e) => {
  //   const selectedImg = e.target.files[0];
  //   const allowed_type = ["image/png", "image/jpeg", "image/jpg"];

  //   if (selectedImg && allowed_type.includes(selectedImg.type)) {
  //     let reader = new FileReader();
  //     reader.onload = (event) => {
  //       setImgPreview(event.target.result);
  //     };
  //     reader.readAsDataURL(selectedImg);
  //   } else {
  //     setErr(true);
  //   }
  // };

  //Update image Data
  // const submitData = (e) => {
  //   e.preventDefault();
  //   imageData.append("admin", imgPreview);
  //   axiosInstance
  //     .post("/admin/changeImage", imageData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "content-type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       dispatch(addAdminData(response.data));
  //     })
  //     .catch((err) => console.log(err));
  // };

  //Update image Data
  const nameChangeHandler = (e) => {
    e.preventDefault();
    axiosInstance
      .post(
        "/admin/changeName",
        { fullName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(addAdminData(response.data));
      })
      .catch((err) => console.log(err));
  };

  const oldPasswordChangeHandler = (e) => {
    setOldPassword(e.target.value);
  };
  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const changePasswordHandler = (e) => {
    // if (openForm === false) {
    //   setOpenForm(true);
    //   return false;
    // }

    e.preventDefault();
    axiosInstance
      .post(
        "/admin/changePassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(addAdminData(response.data));
        setOpenForm(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="max-w-sm flex flex-col   border-2 mb-3 shadow-md shadow-gray-300 border-gray-200 h-screen mx-auto mt-10 rounded-md ">
      {/* <button
        type="submit"
        onClick={() => setEditForm(!editForm)}
        className=" text-white bg-indigo-500 hover:bg-indigo-600 mt-3 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
      >
        Edit profile
      </button> */}
      {err && (
        <p className="text-red-500 text-lg text-center ">File not supported</p>
      )}

      <form encType="multipart/form-data">
        {/* {editForm && (
          <div
            className={`bg-gray-300 object-cover rounded-full h-44 w-44 flex flex-col items-center mx-auto justify-center text-center`}
          >
            {!imgPreview ? (
              <>
                <label
                  htmlFor="fileUpload"
                  className="text-indigo-500 font-bold text-lg cursor-pointer"
                >
                  Choose an image
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  name="admin"
                  className="hidden object-cover rounded-full h-36 w-36 mx-auto m-1 p-1"
                  onChange={handleImgChange}
                />
                <span className="text-indigo-500">(jpeg,png or jpg)</span>
              </>
            ) : (
              <img
                src={imgPreview}
                alt="profilePic"
                className="bg-cover rounded-full h-44 w-44  flex flex-col items-center mx-auto justify-center"
              />
            )}
          </div>
        )} */}

        {/* {imgPreview && (
          <div className="text-center mx-auto">
            <button
              className=" mt-2 text-white cursor-pointer border-2 hover:bg-red-600 bg-red-500 rounded-full w-32 py-2"
              onClick={() => setImgPreview(null)}
            >
              Remove image
            </button>
          </div>
        )} */}

        <div className="px-6 py-4">
          <div className="flex flex-col">
            {editForm ? (
              <div className=" text-xl text-center text-gray-800">
                <label>Full name</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="block border mb-3 border-gray-400 w-full p-2 rounded-lg "
                />
              </div>
            ) : (
              <div
                className={`object-cover rounded-full h-36 w-36 flex flex-col items-center mx-auto justify-center text-center`}
              >
                {/* {adminData?.adminData?.adminImage ? (
                  <img src={adminData?.adminData.adminImage} alt="profileImg" />
                ) : (
                  ""
                )}
                <div className=" text-xl text-center text-gray-800">
                  <p className="text-indigo-500 font-bold">
                    {adminData?.adminData?.fullName}{" "}
                  </p>
                </div> */}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-center"></div>
      </form>

      {editForm ? (
        <div>
          <div className="text-md px-6 text-center  text-gray-800">
            <div className="my-3">
              <label> Old password</label>
              <input
                type="password"
                placeholder="Enter your old password"
                name="oldPassword"
                className="block border border-gray-400 w-full p-2 rounded-lg "
                onChange={(e) => oldPasswordChangeHandler(e)}
              />
            </div>

            <div className="my-3">
              <label>New password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                name="newPassword"
                onChange={(e) => newPasswordChangeHandler(e)}
                className="block border  border-gray-400 w-full p-2 rounded-lg "
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {editForm && (
        <div className="flex flex-col items-center text-center">
          {/* <button
            type="submit"
            onClick={(e) => submitData(e)}
            className="my-auto text-white w-44 bg-indigo-500 hover:bg-indigo-600 mt-5 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
          >
            Update Image
          </button> */}
          <button
            type="submit"
            onClick={nameChangeHandler}
            className="my-auto text-white w-44 bg-indigo-500 hover:bg-indigo-600 mt-5 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
          >
            Update Name
          </button>

          <div
            onClick={changePasswordHandler}
            className="mt-5 w-44 mx-auto text-center cursor-pointer text-white bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer rounded-3xl py-2 px-4 "
          >
            Change Password
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePic;

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {axiosTokenInstance} from "../network/axiosInstance";
import { removeAuthentication } from "../store/slicers/user";

function Header() {
  const authState = useSelector((state) => state.user.authenticationData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(removeAuthentication());
    axiosTokenInstance.post("/logout").then(() => {
      navigate("/");
    });
  };
  return (
    <div className="navbar bg-green-300">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to={"/"}>
          daisyUI
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Link to={"/login"} className="text-blue-500 text-xl font-bold">
            Login
          </Link>
        </div>
        {Object.keys(authState).length !== 0 ? (
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="" to={"/profile"}>
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;

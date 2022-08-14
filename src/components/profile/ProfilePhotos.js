import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfilePhotos() {
  const userState = useSelector(state => state.userData.userData);
  return (
    <div className="bg-white dark:bg-zinc-800 dark:text-slate-100 transition duration-700 my-3 p-4 rounded-xl shadow-md">
      <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
        Photos
        <div className="font-normal text-base text-blue-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700">
          <Link to="/profile/photos">See all Photos</Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5 my-5">
        {userState?.gallery?.slice(0, 9).map((photo, index) => {
          return (
            <div key={index} className="h-auto">
              <img
                key={index}
                src={photo}
                alt="photos"
                className="w-full h-full rounded-md"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePhotos;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileFriends() {
  const userState = useSelector(state => state.userData.userData);
  return (
    <div className="bg-white dark:bg-zinc-800 dark:text-slate-100 transition duration-700 my-3 p-4 rounded-xl shadow-md">
      <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
        Friends
        <div className="font-normal text-base text-blue-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700">
          <Link to="/profile/friends">See all Friends</Link>
        </div>
      </div>
      <div>
        <span>
          {userState?.friends?.data?.length}{' '}
          {userState?.friends?.data?.length < 2 ? 'friend' : 'friends'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 my-5">
        {userState?.friends?.data?.slice(0, 9).map((friend, index) => {
          return (
            <div key={index} className="h-auto">
              <Link to={`/${friend.userId.username}`}>
                <img
                  key={index}
                  src={friend.userId.profileImage}
                  alt="photos"
                  className="w-full h-full rounded-md hover:brightness-95"
                ></img>
              </Link>
              <Link to={`/${friend.userId.username}`}>
                <span className="text-sm truncate mt-3 hover:underline">
                  {friend.userId.firstName} {friend.userId.lastName}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileFriends;

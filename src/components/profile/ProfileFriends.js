import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

function ProfileFriends() {
  const otherUserState = useSelector(
    state => state.otherUserData.otherUserData
  );
  const { username } = useParams();
  return (
    <div className="bg-white dark:bg-zinc-800 dark:text-slate-100 transition duration-700 my-3 p-4 rounded-xl shadow-md">
      <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
        {t('Friends')}
        <div className="font-normal text-base text-indigo-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700">
          <Link to={`/${username}/friends`}>{t('see_all_friends')}</Link>
        </div>
      </div>
      <div>
        <span>
          {otherUserState?.friends?.data?.length}{' '}
          {otherUserState?.friends?.data?.length < 2 ? 'friend' : 'friends'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 my-5">
        {otherUserState?.friends?.data?.slice(0, 9).map((friend, index) => {
          return (
            <div className="h-auto py-4" key={index}>
              <Link to={`/${friend?.userId?.username}`}>
                <img
                  src={friend?.userId?.profileImage}
                  alt="photos"
                  className="w-full h-full rounded-md hover:brightness-95"
                ></img>
              </Link>
              <Link to={`/${friend?.userId?.username}`}>
                <span className="text-sm mt-3 hover:underline">
                  {friend?.userId?.firstName} {friend?.userId?.lastName}
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

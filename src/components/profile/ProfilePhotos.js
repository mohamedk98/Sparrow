import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

function ProfilePhotos() {
  const otherUserState = useSelector(
    state => state.otherUserData.otherUserData
  );
  const { username } = useParams();
  return (
    <div className="bg-white dark:bg-zinc-800 dark:text-slate-100 transition duration-700 my-3 p-4 rounded-xl shadow-md">
      <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
        {t('Photos')}
        <div className="font-normal text-base text-indigo-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700">
          <Link to={`/${username}/photos`}>{t('see_all_Photos')}</Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5 my-5">
        {otherUserState?.gallery?.slice(0, 9).map((photo, index) => {
          return (
            <div key={index} className="h-auto">
              <img
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

import React, { useEffect } from 'react';
import { IoMdHappy } from 'react-icons/io';
import { AiFillCamera } from 'react-icons/ai';
import CreatePostModal from './CreatePostModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    country_code: 'sa',
    dir: 'rtl',
  },
];

const InputBox = ({ showModal, setShowModal }) => {
  // User data:
  const user = useSelector(state => state.newsFeed.profileData);
  const { t } = useTranslation();

  //Start change Language
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(
    lan => lan.code === currentLanguageCode
  );
  useEffect(() => {
    document.getElementById('textInput').dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage]);
  //End change language
  return (
    <>
      <div className="bg-white dark:bg-zinc-800 transition duration-700 dark:text-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        <div className="flex space-x-4 p-4 items-center">
          {user?.profileImage?(
          <img
            src={user?.profileImage}
            alt="profile-imag"
            className="rounded-full h-10 w-10"
            width={40}
            height={40}
            layout="fixed"
          />
          )
          :<Skeleton
          circle
          containerClassName="avatar-skeleton"
          className="dark:bg-zinc-700 w-10 h-10"
          highlightColor={`${localStorage.theme === 'dark' && '#3f3f46'}`}
        />
          }
          <form className="flex flex-1">
            <input
              dir="ltr"
              id="textInput"
              type="text"
              readOnly
              className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none cursor-pointer"
              placeholder={`${t('input_placeholder')} ${user.firstName} ${t(
                'input_questionMark'
              )}`}
              onClick={() => {
                setShowModal(!showModal);
              }}
            />
          </form>
        </div>
        <div className="flex justify-evenly p-3 border-t">
          <div
            className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <AiFillCamera className="h-7 xl:w-10 md:w-6 text-green-400" />
            <p className="text-xs sm:text-sm xl:text-base">
              {t('Photo/Video_input')}
            </p>
          </div>
        
        </div>
      </div>

      {showModal && (
        <CreatePostModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default InputBox;

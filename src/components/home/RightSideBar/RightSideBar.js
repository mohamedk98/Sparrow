import React, { useState, useEffect } from 'react';

import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { BsToggle2Off } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';
import More from '../Feed/posts/More';
import { useSelector } from 'react-redux';
import { socket } from '../../chat/socket.service';
import { useTranslation } from 'react-i18next';
import { languages } from '../../languagesArray';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RightSideBar = ({ setOpenChats }) => {
  //Start change
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(
    lan => lan.code === currentLanguageCode
  );
  useEffect(() => {
    document.getElementById('rightbar').dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage]);
  const { t } = useTranslation();
  //End change language

  const [open, setOpen] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const [showActiveContacts, setShowActiveContacts] = useState(true);
  const userData = useSelector(state => state.userData.userData);
  const chatHeadHandler = async contact => {
    socket.auth = { userId: userData._id };
    socket.connect();
    socket.on('connect', () => {});
    socket.emit('connect to user', contact._id);
    const newChat = {
      name: `${contact.firstName} ${contact.lastName}`,
      profileImage: contact.profileImage,
      id: contact._id,
    };
    setOpenChats(newChat);
  };

  const availableContacts = userData?.friends?.data?.map(
    friend => friend.userId
  );

  return (
    <div
      className="hidden lg1:flex fixed scrollbar-hide z-0 right-0 overflow-scroll"
      dir="ltr"
      id="rightbar"
    >
      <div
        className={`bg-facebook-grey  dark:bg-zinc-800 transition duration-700  h-screen p-5 pt-8 ml-3 ${
          open ? 'w-64' : 'w-24 '
        } duration-300  relative`}
      >
        <BsFillArrowRightCircleFill
          onClick={() => setOpen(!open)}
          className={`bg-facebook-grey  text-indigo-500 text-3xl rounded-full cursor-pointer ${
            !open && 'rotate-180'
          } absolute -left-3 top-9 border border-facebook-grey`}
        />
        <ul dir="ltr">
          <li className={open ? 'mt-10' : '-ml- mt-10 text-center'}>
            <span className="font-bold dark:text-white text-sm ml-2 duration-300">
              {t('contact_rightSideBar')}
            </span>
            {open && (
              <More
                // tooltipData="options"
                text={
                  <div
                    className="flex"
                    onClick={() => {
                      setShowContacts(!showContacts);
                    }}
                  >
                    {t('show_contacts')}
                    {showContacts && (
                      <BsToggleOn className="text-indigo-500 text-2xl ml-3 -mt-0.5" />
                    )}
                    {!showContacts && (
                      <BsToggle2Off className="text-2xl ml-3 -mt-0.5" />
                    )}
                  </div>
                }
                text2={
                  <div
                    className="flex mr-0.5"
                    onClick={() => {
                      setShowActiveContacts(!showActiveContacts);
                    }}
                  >
                    {t('active_status')}
                    {showActiveContacts && (
                      <BsToggleOn className="text-indigo-500 text-2xl ml-5 -mt-0.5" />
                    )}
                    {!showActiveContacts && (
                      <BsToggle2Off className="text-2xl ml-5 -mt-0.5" />
                    )}
                  </div>
                }
                containerClassName="dropdown absolute right-2 top-14 mt-3  "
                iconClassName="w-9 h-9 ml-36 hover:bg-gray-200"
                liNum1={1}
                liNum2={2}
              />
            )}
          </li>
        </ul>

        <ul
          className={
            showActiveContacts
              ? ''
              : 'bg-gray-100 opacity-40 dark:bg-zinc-800 transition duration-700 dark:text-white'
          }
        >
          {!showContacts && (
            <li
              className="cursor-pointer flex  bg-gray-200 py-1 px-16 rounded-lg text-sm mt-5 btn hover:bg-gray-300 ml-5"
              onClick={() => {
                setShowContacts(true);
              }}
            >
              see all (0)
            </li>
          )}
          {showContacts &&
            availableContacts?.map((contact, idx) => (
              <li
                className={`flex items-center gap-x-4 cursor-pointer p-2 my-2 ${
                  !open && 'w-screen'
                }`}
                key={contact?._id || idx}
                onClick={() => chatHeadHandler(contact)}
              >
                {contact?.profileImage && (
                  <img
                    src={contact?.profileImage}
                    alt="profile"
                    className={`rounded-full w-12 h-12 ${!open && 'ml-2.5'}`}
                  />
                )}

                <span
                  className={`text-black dark:text-white origin-left text-sm mt-1 duration-300 ${
                    !open && 'scale-0 -mb-7'
                  }`}
                >
                  {`${contact?.firstName} ${contact?.lastName}`}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;

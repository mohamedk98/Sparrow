import React, { useState } from 'react';

import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { BsToggle2Off } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';
import More from '../Feed/posts/More';
import { useSelector } from 'react-redux';
import { socket } from '../../chat/socket.service';
const RightSideBar = ({ setOpenChats }) => {
  const [open, setOpen] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const [showActiveContacts, setShowActiveContacts] = useState(true);
  const userData = useSelector(state => state.userData.userData);
  const chatHeadHandler = async contact => {
    socket.auth = { userId: userData._id };
    socket.connect();
    socket.on('connect', () => {
      console.log(socket.id);
    });
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
    <div className="hidden lg1:flex fixed z-50 right-0 overflow-scroll ">
      <div
        className={`bg-facebook-grey h-screen p-5 pt-8 ml-3 ${
          open ? 'w-64' : 'w-24 '
        } duration-300  relative`}
      >
        <BsFillArrowRightCircleFill
          onClick={() => setOpen(!open)}
          className={`bg-facebook-grey text-facebook-blue text-3xl rounded-full cursor-pointer ${
            !open && 'rotate-180'
          } absolute -left-3 top-9 border border-facebook-grey`}
        />
        <ul>
          <li className={open ? 'mt-10' : '-ml- mt-10 text-center'}>
            <span className="font-bold text-sm ml-2 duration-300">
              Contacts
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
                    Show contacts
                    {showContacts && (
                      <BsToggleOn className="text-facebook-blue text-2xl ml-3 -mt-0.5" />
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
                    Active Status
                    {showActiveContacts && (
                      <BsToggleOn className="text-facebook-blue text-2xl ml-5 -mt-0.5" />
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

        <ul className={showActiveContacts ? '' : 'bg-gray-100 opacity-40'}>
          {!showContacts && (
            <li
              className="cursor-pointer flex bg-gray-200 py-1 px-16 rounded-lg text-sm mt-5 btn hover:bg-gray-300 ml-5"
              onClick={() => {
                setShowContacts(true);
              }}
            >
              see all (0)
            </li>
          )}
          {showContacts &&
            availableContacts?.map(contact => (
              <li
                className={`flex items-center gap-x-4 cursor-pointer p-2 my-2 ${
                  !open && 'w-screen'
                }`}
                key={contact._id}
                onClick={() => chatHeadHandler(contact)}
              >
                <img
                  src={contact.profileImage}
                  alt="profile"
                  className={`rounded-full w-12 h-12 ${!open && 'ml-2.5'}`}
                />
                <span
                  className={`text-black origin-left text-sm mt-1 duration-300 ${
                    !open && 'scale-0 -mb-7'
                  }`}
                >
                  {`${contact.firstName} ${contact.lastName}`}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;

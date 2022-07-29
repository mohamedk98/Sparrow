import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { BsToggle2Off } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';
import profileImg from '../../../assets/images/default_profile.png';
import More from '../Feed/posts/More';

const RightSideBar = () => {
  const [open, setOpen] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const [showActiveContacts, setShowActiveContacts] = useState(true);
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate('/');
  };

  const contactsArr = [
    {
      id: 1,
      userName: 'User Name 1',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 2,
      userName: 'User Name 2',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 3,
      userName: 'User Name 3',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 4,
      userName: 'User Name 4',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 5,
      userName: 'User Name 5',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 6,
      userName: 'User Name 6',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 7,
      userName: 'User Name 7',
      icon: profileImg,
      handler: profileHandler,
    },
    {
      id: 8,
      userName: 'User Name 8',
      icon: profileImg,
      handler: profileHandler,
    },
  ];

  return (
    <div className="hidden lg:flex fixed z-10 right-0 ">
      <div
        className={`bg-facebook-grey h-screen p-5 pt-8 ${
          open ? 'w-38' : 'w-20'
        } duration-300  relative`}
      >
        <BsFillArrowRightCircleFill
          onClick={() => setOpen(!open)}
          className={`bg-facebook-grey text-facebook-blue text-3xl rounded-full cursor-pointer ${
            !open && 'rotate-180'
          } absolute -left-3 top-9 border border-facebook-grey`}
        />
        <ul>
          <li className={open ? 'mt-10' : '-ml-4 mt-10 text-center'}>
            <span className="font-bold text-sm ml-2 duration-300">
              Contacts
            </span>
            {open && (
              <More
                tooltipData="options"
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
                containerClassName="dropdown absolute right-2 top-14 mt-3 "
                iconClassName="w-9 h-9 ml-0.5 hover:bg-gray-200"
                liNum1={1}
                liNum2={2}
              />
            )}
          </li>
        </ul>

        <ul className={showActiveContacts ? '' : 'bg-gray-100 opacity-40'}>
          {!showContacts && (
            <li
              className="cursor-pointer flex bg-gray-200 py-1 px-3 rounded-lg text-sm mt-5 btn hover:bg-gray-300 ml-3"
              onClick={() => {
                setShowContacts(true);
              }}
            >
              see all (0)
            </li>
          )}
          {showContacts &&
            contactsArr.map(contact => (
              <li
                className="flex items-center gap-x-4 cursor-pointer p-2 my-2"
                key={contact.id}
                onClick={contact.handler}
              >
                <img
                  src={contact.icon}
                  alt="profile"
                  className="rounded-full w-9"
                />
                <span
                  className={`text-black origin-left text-sm mt-1 duration-300 ${
                    !open && 'scale-0 -mb-7'
                  }`}
                >
                  {contact.userName}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;

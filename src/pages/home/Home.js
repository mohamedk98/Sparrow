import React, { useState, useEffect } from 'react';
import LeftSideBar from '../../components/home/LeftSideBar/LeftSideBar';
import Feed from '../../components/home/Feed/Feed';
import { axiosInstance } from '../../network/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header/Header';
import RightSideBar from '../../components/home/RightSideBar/RightSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData } from '../../store/userSlice/UserDataSlice';
import Chat from '../../components/chat/Chat';
import AlertMessage from '../../components/home/Feed/posts/AlertMessage';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openChats, setOpenChats] = useState([]);
  const addChatHandler = contact => {
    const chatIsFound = openChats.find(chat => chat.id === contact.id);
    if (chatIsFound) {
      return false;
    }
    setOpenChats(currentOpenChats => [...currentOpenChats, contact]);
  };
  const closeChatHandler = chatId => {
    const newChatList = openChats.filter(chat => chat.id !== chatId);
    setOpenChats(newChatList);
  };

  useEffect(() => {
    //it will return user profile data
    axiosInstance
      .get('/profile')
      .then(response => {
        dispatch(addUserData(response.data));
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        navigate('/login');
      });
  }, [navigate]);

  // To show and hide alerts:
  const alert = useSelector(state => state.newsFeed.alert);

  return (
    <div className=" h-full bg-slate-200">
      <Header />
      <div className="flex ">
        <LeftSideBar />
        <Feed />
        <RightSideBar setOpenChats={addChatHandler} />
      </div>
      <div className=" fixed bottom-0 right-0 z-50">
        {openChats.map(openChat => (
          <Chat
            key={openChat.id}
            name={openChat.name}
            profileImage={openChat.profileImage}
            id={openChat.id}
            openChat={openChats}
            closeChat={closeChatHandler}
          />
        ))}
      </div>
      {alert.message && (
        <div className="fixed bottom-0 left-2 z-50">
          <AlertMessage alert={alert} />
        </div>
      )}
    </div>
  );
};

export default Home;

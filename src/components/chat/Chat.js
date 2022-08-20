import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { socket } from './socket.service';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import TextArea from '../home/Feed/posts/TextArea';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

function Chat({ profileImage, name, id, closeChat }) {
  const { t } = useTranslation();

  const [minimizeChat, setMinimizeChat] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    socket.on('message', newMessage => {
      setCurrentMessages(previousMessages => [
        ...previousMessages,
        { message: newMessage.message, senderId: newMessage.senderId },
      ]);
      scrollToBottom();
    });

    socket.on('sent messages', oldMessages => {
      const savedMessages = oldMessages.map(savedMessage => ({
        message: savedMessage.message,
        senderId: savedMessage.sender,
      }));
      setCurrentMessages(previousMessages => [
        ...previousMessages,
        ...savedMessages,
      ]);
      scrollToBottom();
    });

    scrollToBottom();
  }, []);

  const minimizeChatHandler = () => {
    setMinimizeChat(!minimizeChat);
  };

  const sendMessageHandler = message => {
    console.log(message);
    socket.emit('message', message, id);
  };

  return (
    <div className="mx-2 w-80  rounded-t-xl bg-white shadow-lg shadow-gray-500 z-auto">
      <div className="flex justify-between p-2 border-b-2 border-slate-200">
        <div className="flex">
          <img
            className="w-8 h-8 rounded-full cursor-pointer"
            src={profileImage}
            alt="profilePic"
          ></img>
          <div className="flex mx-1 px-2 cursor-pointer rounded-lg items-center hover:bg-slate-200">
            <span className=" whitespace-nowrap">{name}</span>
          </div>
        </div>
        <div className="flex text-lg py-1.5 text-blue-500">
          <AiOutlineMinus
            className="mx-1 cursor-pointer"
            onClick={() => {
              minimizeChatHandler();
            }}
          />
          <AiOutlineClose
            className="mx-1 cursor-pointer"
            onClick={() => closeChat(id)}
          />
        </div>
      </div>

      <div className={minimizeChat ? 'hidden' : 'block h-72 overflow-y-auto'}>
        {currentMessages &&
          currentMessages.map((message, idx) => {
            return (
              <Fragment key={idx}>
                {message.senderId === id ? (
                  <SenderMessage message={message.message} />
                ) : (
                  <ReceiverMessage message={message.message} />
                )}
              </Fragment>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div
        className={
          minimizeChat
            ? 'hidden'
            : 'flex justify-between p-1.5 border-t-2 border-slate-200'
        }
      >
        <div className="flex mx-2 -mb-3.5 w-full ">
          <TextArea
            dir="ltr"
            id="textarea"
            placeholder={t('Type a message...')}
            chat={true}
            sendMessageHandler={sendMessageHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;

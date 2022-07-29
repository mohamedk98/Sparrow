import React, { useEffect, useRef, useState } from 'react';

import profileImg from '../../../../assets/images/default_profile.png';

import { VscSmiley } from 'react-icons/vsc';

import EmojiPicker from '../EmojiPicker';
import More from './More';
import { axiosInstance } from '../../../../network/axiosInstance';

const TextArea = ({
  rows,
  cols,
  className,
  placeholder,
  id,
  comment,
  reply,
  editComment,
  postId,
  showMore,
  replyClassName,
  showProfileImage,
  commentId,
  value,
  autoFocus,
}) => {
  // console.log(postId, commentId);
  // For textArea value:
  const textareaRef = useRef('');
  // console.log(textareaRef.current.selectionEnd);
  const [text, setText] = useState(value || '');

  // Emojis:
  const [showPicker, setShowPicker] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  // make the carret always at the end of emoji set:
  const [carretPosition, setCarretPosition] = useState(0);
  // console.log(carretPosition);
  // console.log(textareaRef.current.selectionEnd);
  useEffect(() => {
    if (textareaRef.current.selectionEnd !== undefined) {
      textareaRef.current.selectionEnd = carretPosition;
    }
  }, [carretPosition]);

  const onEmojiClick = (event, emojiObject) => {
    // console.log(event);
    // console.log(emojiObject.emoji);
    setChosenEmoji(emojiObject);

    // Make focus on textArea Field:
    const refTxtAreaField = textareaRef.current;
    refTxtAreaField.focus();

    // index to placein the emoji:
    // console.log(refTxtAreaField.value);
    const emojiStart = text.slice(0, refTxtAreaField.selectionStart);
    // console.log(start);

    const emojiEnd = text.slice(refTxtAreaField.selectionStart);

    const newText = emojiStart + emojiObject.emoji + emojiEnd;
    // console.log(newText);

    setText(newText);

    // make the carret always at the end of emoji set:
    setCarretPosition(emojiStart.length + emojiObject.emoji.length);
  };

  const addCommentHandler = () => {
    axiosInstance
      .post(
        `/comment/${id}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {
        console.log(id);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const addreplyHandler = () => {
    axiosInstance
      .post(
        `/reply/post/${postId}/${id}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {
        console.log(id);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editCommentHandler = () => {
    axiosInstance
      .patch(
        `/comment/${postId}/${commentId}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {
        console.log(id);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={'flex mb-3 ' + replyClassName}>
      {!className && showProfileImage && (
        <a href="/">
          <img
            src={profileImg}
            className="rounded-full mr-2 h-8"
            alt="Avatar"
          />
        </a>
      )}
      <div className="w-full relative">
        <textarea
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (e.target.value.trim() === '') {
                e.preventDefault();
                e.target.value = '';
                return;
              } else {
                e.preventDefault();
                if (comment) {
                  addCommentHandler();
                }
                if (reply) {
                  addreplyHandler();
                }
                if (editComment) {
                  editCommentHandler();
                }

                e.target.value = '';
                e.target.style.height = `${32}px`;
              }
            }

            console.log(id);
          }}
          onChange={e => {
            setText(e.target.value);
            // console.log(e.target.value);
            // console.log(text);
          }}
          value={text}
          ref={textareaRef}
          cols={cols || '75'}
          rows={rows || '1'}
          onInput={e => {
            if (className) return;
            // e.target.style.height = 'auto';
            // e.target.style.height = `${e.target.scrollHeight}px`;

            e.target.style.height = 'auto';
            e.target.style.height = `${
              e.target.scrollHeight < 80 ? e.target.scrollHeight : 80
            }px`;

            console.log(e.target.scrollHeight);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={
            className ||
            'bg-gray-100 rounded-3xl px-5 py-1 outline-none w-full resize-none'
          }
          onClick={() => setShowPicker(false)}
        />

        <div
          className={
            className && showPicker
              ? 'flex absolute  left-44 -ml-5 top-2'
              : !className && showPicker
              ? 'flex absolute -top-1 right-5'
              : 'flex absolute -top-10 right-5'
          }
        >
          <div
            className={`justify-end  text-2xl text-gray-500 ${
              className && !showPicker ? 'mt-11 mb-2' : 'my-2'
            }`}
          >
            <button
              onClick={() => setShowPicker(!showPicker)}
              data-title={showPicker ? null : 'Emoji'}
              className={className ? 'top-3 -right-32' : 'top-9 right-0'}
            >
              <VscSmiley className={showPicker ? 'ml-64  text-blue-400' : ''} />
            </button>
            {showPicker ? (
              <EmojiPicker
                positionClass={
                  className ? 'top-10 left-40' : 'bottom-12 right-0'
                }
                chosenEmoji={chosenEmoji}
                onEmojiClick={onEmojiClick}
              />
            ) : null}
          </div>
        </div>
      </div>
      {!className && showMore && (
        <More
          text="edit"
          text2="delete"
          containerClassName="dropdown relative left-2 top-0.5"
          iconClassName="w-7 h-7"
          liNum1={1}
          liNum2={2}
          tooltipData="more"
        />
      )}
    </div>
  );
};

export default TextArea;
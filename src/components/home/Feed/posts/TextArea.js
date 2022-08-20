import React, { useEffect, useRef, useState } from 'react';

import { VscSmiley } from 'react-icons/vsc';

import EmojiPicker from '../EmojiPicker';
import More from './More';
import { axiosInstance } from '../../../../network/axiosInstance';
import { useDispatch } from 'react-redux';
import { forceUpdateHandler } from '../../../../store/userSlice/NewsFeedSlice';
import { languages } from '../../../languagesArray';

const TextArea = ({
  rows,
  cols,
  className,
  placeholder,
  id,
  comment,
  reply,
  replyId,
  editComment,
  postId,
  showMore,
  replyClassName,
  showProfileImage,
  commentId,
  value,
  autoFocus,
  sharedPost,
  sharedCommentID,
  editReply,
  userImage,
  getInputTextValueHandler,
  setEmptyTextArea,
  emptyTextArea,
  shareAPost,
  setEditComment,
  setEditReply,
  // For socket IO:
  chat,
  sendMessageHandler,

  // For edit a post:
  editPost,

  // Translation
  idtranslate,

  // Tree styling:
  setHover,
}) => {
  //Start change Language
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(
    lan => lan.code === currentLanguageCode
  );
  let direction = currentLanguage.dir || 'ltr';
  useEffect(() => {
    document.querySelector(`textarea[idtranslate]`).dir =
      currentLanguage.dir || 'ltr';
  }, [currentLanguage, direction]);

  //End change language

  // Force rerender:
  const dispatch = useDispatch();
  // const forceReRender = useSelector(state => state.newsFeed.forceUpdate);

  // For textArea value:
  const textareaRef = useRef('');
  const [text, setText] = useState(value || '');

  // Emojis:
  const [showPicker, setShowPicker] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  // make the carret always at the end of emoji set:
  const [carretPosition, setCarretPosition] = useState(0);

  useEffect(() => {
    if (textareaRef.current.selectionEnd !== undefined) {
      textareaRef.current.selectionEnd = carretPosition;
    }
  }, [carretPosition]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    // Make focus on textArea Field:
    const refTxtAreaField = textareaRef.current;
    refTxtAreaField.focus();

    // index to placein the emoji:
    const emojiStart = text.slice(0, refTxtAreaField.selectionStart);

    const emojiEnd = text.slice(refTxtAreaField.selectionStart);

    const newText = emojiStart + emojiObject.emoji + emojiEnd;

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
      .then(response => {})
      .catch(error => {});
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
      .then(response => {})
      .catch(error => {});
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
      .then(response => {})
      .catch(error => {});
  };

  const editReplyHandler = () => {
    axiosInstance
      .patch(
        `/reply/post/${postId}/${commentId}/${replyId}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {})
      .catch(error => {});
  };

  const addSharedCommentHandler = () => {
    axiosInstance
      .post(
        `/comment/sharedPost/${id}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {})
      .catch(error => {});
  };

  const addSharedReplyHandler = () => {
    axiosInstance
      .post(
        `/reply/sharedPost/${postId}/${id}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {})
      .catch(error => {});
  };

  const editSharedCommentHandler = () => {
    axiosInstance
      .patch(
        `/comment/sharedPost/${id}/${sharedCommentID}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {})
      .catch(error => {});
  };

  const editSharedReplyHandler = () => {
    axiosInstance
      .patch(
        `/reply/sharedPost/${postId}/${commentId}/${replyId}`,
        { content: text },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {})
      .catch(error => {});
  };

  return (
    <div className={'flex mb-3 ' + replyClassName}>
      {!className && showProfileImage && (
        <a href="/">
          <img
            src={userImage}
            className="rounded-full mr-2 h-9 w-9"
            alt="Avatar"
          />
        </a>
      )}
      <div className="w-full relative z-40">
        <textarea
          dir={direction}
          idtranslate="textarea"
          // For sharing post:
          onFocus={() => {
            shareAPost && !editPost && setEmptyTextArea(false);

            // Tree styling:
            setHover(id);
          }}
          onBlur={e => {
            (shareAPost || editPost) && getInputTextValueHandler(text);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (e.target.value.trim() === '') {
                e.preventDefault();
                e.target.value = '';
                return;
              } else {
                e.preventDefault();

                if (editPost) {
                  return;
                }

                if (comment) {
                  sharedPost ? addSharedCommentHandler() : addCommentHandler();
                }

                if (reply) {
                  sharedPost ? addSharedReplyHandler() : addreplyHandler();
                }

                if (editComment) {
                  sharedPost
                    ? editSharedCommentHandler()
                    : editCommentHandler();
                  setEditComment(false);
                }

                if (editReply) {
                  sharedPost ? editSharedReplyHandler() : editReplyHandler();
                  setEditReply(false);
                }

                if (chat) {
                  sendMessageHandler(text);
                }

                setText('');

                e.target.style.height = `${32}px`;
                setTimeout(() => {
                  dispatch(forceUpdateHandler(110000));
                }, 100);
              }
            }
          }}
          onChange={e => {
            setText(e.target.value);
          }}
          value={emptyTextArea ? '' : text}
          ref={textareaRef}
          cols={cols || '75'}
          rows={rows || '1'}
          onInput={e => {
            if (className) return;

            e.target.style.height = 'auto';
            e.target.style.height = `${
              e.target.scrollHeight < 80 ? e.target.scrollHeight : 80
            }px`;
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={
            className ||
            `bg-gray-100  dark:bg-zinc-700 dark:text-white rounded-3xl px-5 py-1 outline-none w-full resize-none ${
              direction === 'rtl' &&
              'px-12 placeholder:absolute placeholder:right-12'
            }`
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
                  className ? 'top-10 left-40' : 'bottom-14 right-0'
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

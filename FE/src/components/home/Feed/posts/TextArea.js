import React, { useEffect, useRef, useState } from 'react';

import profileImg from '../../../../assets/images/default_profile.png';

import { VscSmiley } from 'react-icons/vsc';

import EmojiPicker from '../EmojiPicker';

const TextArea = ({ placeholder }) => {
  // For textArea value:
  const textareaRef = useRef('');
  // console.log(textareaRef.current.selectionEnd);
  const [text, setText] = useState('');

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

  return (
    <div className="flex mb-3">
      <a href="/">
        <img src={profileImg} className="rounded-full mr-2 h-8" alt="Avatar" />
      </a>
      <div className="w-full relative">
        <textarea
          onChange={e => {
            setText(e.target.value);
            // console.log(e.target.value);
            // console.log(text);
          }}
          value={text}
          ref={textareaRef}
          cols="75"
          rows="1"
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder={placeholder}
          className="bg-gray-100 rounded-3xl px-5 py-1 outline-none w-full resize-none"
          onClick={() => setShowPicker(false)}
        />

        <div className="flex absolute -top-1 right-5">
          <div className="justify-end my-2 text-2xl text-gray-500">
            <button
              onClick={() => setShowPicker(!showPicker)}
              data-title={showPicker ? null : 'Emoji'}
            >
              <VscSmiley className={showPicker ? 'ml-64' : ''} />
            </button>
            {showPicker ? (
              <EmojiPicker
                positionClass="bottom-12 right-0"
                chosenEmoji={chosenEmoji}
                onEmojiClick={onEmojiClick}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextArea;

import React from 'react';

import Picker from 'emoji-picker-react';

const EmojiPicker = ({ chosenEmoji, onEmojiClick, positionClass }) => {
  return (
    <div
      className={
        'flex justify-center items-center  shadow-2xl absolute bottom-24 ' +
        positionClass
      }
    >
      <div className="max-w-sm rounded dark:bg-zinc-800 transition duration-700  bg-white text-sm">
        {
          <div className="py-1 px-5 w-fit mx-auto mt-3 mb-1 text-base border-2 shadow-sm shadow-current">
            {chosenEmoji
              ? `You chosed ${chosenEmoji.emoji}`
              : 'No emoji Chosen'}
          </div>
        }
        <Picker
          onEmojiClick={onEmojiClick}
          showLoading={true}
          preload={true}
          disableAutoFocus={true}
          searchPlaceholder="Search for Emoji"
          pickerStyle={{
            boxShadow: '-1.5px 11px 10px #222222',
            borderTop: 0,
          }}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;

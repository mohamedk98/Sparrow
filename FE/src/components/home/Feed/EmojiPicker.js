import React from 'react';

import Picker from 'emoji-picker-react';

const EmojiPicker = ({ chosenEmoji, onEmojiClick }) => {
  return (
    <div className="flex justify-center items-center shadow-2xl">
      <div className="max-w-sm rounded bg-white text-sm">
        {chosenEmoji ? (
          <div className="text-center">You chosed: {chosenEmoji.emoji}</div>
        ) : (
          <div className="text-center">No emoji Chosen</div>
        )}
        <Picker
          onEmojiClick={onEmojiClick}
          className="h-2"
          pickerStyle={{
            boxShadow: '0.5px 0.5px 3px #222222',
          }}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;

import React from 'react';

import Picker from 'emoji-picker-react';

const EmojiPicker = ({ chosenEmoji, onEmojiClick }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-sm rounded shadow-lg bg-white text-sm">
        {chosenEmoji ? (
          <span>You chose: {chosenEmoji.emoji}</span>
        ) : (
          <span className="text-sm">No emoji Chosen</span>
        )}
        <Picker onEmojiClick={onEmojiClick} disableSearchBar className="h-2" />
      </div>
    </div>
  );
};

export default EmojiPicker;

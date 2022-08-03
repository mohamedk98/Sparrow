import React from 'react';

import Picker from 'emoji-picker-react';

const EmojiPicker = ({ chosenEmoji, onEmojiClick }) => {
  return (
    <div
      className={
        'absolute h-1/2 scrollbar-hide overflow-y-auto bottom-28'
      }
    >
  
      <div className="max-w-sm rounded bg-white text-sm">
        <Picker
          onEmojiClick={onEmojiClick}
          showLoading={true}
          preload={true}
          disableAutoFocus={true}
          disableSearchBar={true}
          pickerStyle={{
            borderTop: 0,
          
          }}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;

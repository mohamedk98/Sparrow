import React, { Fragment } from 'react';

import like from '../../../../assets/reacts/like.gif';
import love from '../../../../assets/reacts/love.gif';
import haha from '../../../../assets/reacts/haha.gif';
import wow from '../../../../assets/reacts/wow.gif';
import sad from '../../../../assets/reacts/sad.gif';
import angry from '../../../../assets/reacts/angry.gif';

const reactsArray = [
  {
    name: 'like',
    image: like,
  },
  {
    name: 'love',
    image: love,
  },
  {
    name: 'haha',
    image: haha,
  },
  {
    name: 'wow',
    image: wow,
  },
  {
    name: 'sad',
    image: sad,
  },
  {
    name: 'angry',
    image: angry,
  },
];

const PostReactions = ({ visible, setVisible, reactHandler }) => {
  return (
    <Fragment>
      {visible && (
        <div
          className="flex flex-row justify-center  align-middle absolute w-3/6 p-3 mt-1 -top-14 bg-gray-50 shadow-2xl border rounded-full"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, idx) => (
            <div
              className="cursor-pointer mr-5"
              key={idx}
              onClick={() => reactHandler(react.name)}
            >
              <img src={react.image} alt={react.name} />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PostReactions;

import React, { Fragment } from 'react';

import like from '../../../../assets/reacts/like.gif';
import love from '../../../../assets/reacts/love.gif';
import haha from '../../../../assets/reacts/haha.gif';
import wow from '../../../../assets/reacts/wow.gif';
import sad from '../../../../assets/reacts/sad.gif';
import angry from '../../../../assets/reacts/angry.gif';
import care from '../../../../assets/reacts/care.gif';

const reactsArray = [
  {
    name: 'Like',
    image: like,
  },
  {
    name: 'Love',
    image: love,
  },
  {
    name: 'Care',
    image: care,
  },
  {
    name: 'Haha',
    image: haha,
  },
  {
    name: 'Wow',
    image: wow,
  },
  {
    name: 'Sad',
    image: sad,
  },
  {
    name: 'Angry',
    image: angry,
  },
];

const PostReactions = ({ visible, setVisible, reactHandler }) => {
  return (
    <Fragment>
      {visible && (
        <div
          className="flex flex-row justify-center  align-middle absolute w-8/12 pt-1 px-1 mt-2 -top-14 bg-gray-50 shadow-2xl border rounded-full"
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
              className={
                react.name === 'Care'
                  ? 'cursor-pointer ml-1 w-3/6 -mt-1'
                  : 'cursor-pointer mr-1 ml-2'
              }
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

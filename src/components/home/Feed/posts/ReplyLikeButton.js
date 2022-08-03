import React, { useState, Fragment, useEffect } from 'react';

import PostReactions from './PostReactions';
import ReactionClassHandler from './ReactionClasses';

const ReplyLikeButton = ({
  setReactionClicked,
  containerClassName,
  reactionsFullScreenClassName,
}) => {
  // console.log(reactionsFullScreenClassName);
  // Reactions type set:
  const [reactType, setReactType] = useState('');

  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Hide and show reactions:
  const [visible, setVisible] = useState(false);

  // Reactions className set:
  const [reactClass, setReactClass] = useState('');

  // reactHandler for replys not for post:
  const reactHandler = name => {
    console.log(name);
    // console.log(reactType);

    setReactType(name);

    // Handle className for like button in reply:
    ReactionClassHandler(name, setReactClass);
  };

  useEffect(() => {
    // console.log(btnClicked, reactType, reactClass);

    if (reactType === '' && reactClass === '' && btnClicked) {
      setReactType('Like');
      setReactClass('text-facebook-blue font-bold');
      setBtnClicked(!btnClicked);
    }

    if (
      (reactType === 'Like' && btnClicked) ||
      (reactType !== '' && btnClicked)
    ) {
      setReactType('');
      setReactClass('');
      setBtnClicked(!btnClicked);
    }
  }, [btnClicked, reactClass, reactType]);

  return (
    <Fragment>
      <div className="flex justify-between mb-1 -ml-3  relative">
        <PostReactions
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
          containerClassName={containerClassName}
          reactionsFullScreenClassName={
            reactionsFullScreenClassName && 'ml-0 -mt-6'
          }
        />
      </div>

      <button
        type="button"
        className={'hover:underline underline-offset-2 ' + reactClass}
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
        onClick={() => {
          setReactionClicked(false);
          setBtnClicked(!btnClicked);
          // console.log(btnClicked);

          setReactClass(!btnClicked ? 'text-facebook-blue font-bold' : '');
        }}
      >
        {reactType ? reactType : 'Like'}
      </button>
    </Fragment>
  );
};

export default ReplyLikeButton;

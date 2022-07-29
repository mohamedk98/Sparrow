import React, { useState, Fragment, useEffect } from 'react';

import PostReactions from './PostReactions';

const ReplyLikeButton = ({ setReactionClicked }) => {
  // Reactions type set:
  const [reactType, setReactType] = useState('');

  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Hide and show reactions:
  const [visible, setVisible] = useState(false);

  // Reactions className set:
  const [reactClass, setReactClass] = useState('');

  const reactHandler = name => {
    // console.log(name);
    // console.log(reactType);

    setReactType(name);

    let className = 'font-bold timepicker-clock-animation ';

    switch (name) {
      case 'Like':
        className += 'text-facebook-blue';
        break;

      case 'Love':
        className += 'text-red-500';
        break;

      case 'Care':
      case 'Haha':
      case 'Wow':
      case 'Sad':
        className += 'text-yellow-400';
        break;

      case 'Angry':
        className += 'text-rose-500';
        break;

      default:
        break;
    }

    setReactClass(className);
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

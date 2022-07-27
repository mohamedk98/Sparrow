import React, { useEffect, useMemo, useState } from 'react';

import likePNG from './../../../../assets/reacts/like.png';
import likeSVG from './../../../../assets/reacts/like.svg';
import loveSVG from '../../../../assets/reacts/love.svg';
import heartSVG from '../../../../assets/reacts/heart.svg';
import hahaSVG from '../../../../assets/reacts/haha.svg';
import wowSVG from '../../../../assets/reacts/wow.svg';
import sadSVG from '../../../../assets/reacts/sad.svg';
import angrySVG from '../../../../assets/reacts/angry.svg';

const LikeButton = ({
  reactType,
  setReactType,
  reactionClicked,
  reactClass,
  setReactClass,
  setVisible,
  setReactionClicked,
  data,
}) => {
  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Reaction src attribute set:
  const [reactTypeSRC, setReactTypeSRC] = useState(likePNG);

  const reactTypeSVG = useMemo(
    () => [
      { name: 'Like', svg: likeSVG },
      { name: 'Love', svg: loveSVG },
      { name: 'Care', svg: heartSVG },
      { name: 'Haha', svg: hahaSVG },
      { name: 'Wow', svg: wowSVG },
      { name: 'Sad', svg: sadSVG },
      { name: 'Angry', svg: angrySVG },
    ],
    []
  );

  const svgPicker = reactTypeSVG.filter(react => {
    return react.name === reactType;
  })[0];

  useEffect(() => {
    reactionClicked && setReactTypeSRC(svgPicker?.svg);

    // console.log(btnClicked, reactType, reactTypeSRC);

    if (
      reactType === '' &&
      reactClass === '' &&
      reactTypeSRC === likePNG &&
      btnClicked
    ) {
      setReactType('Like');
      setReactTypeSRC(likeSVG);
      setReactClass('text-facebook-blue font-bold');
      setBtnClicked(!btnClicked);
    }

    if (
      (reactType === 'Like' && reactTypeSRC === likeSVG && btnClicked) ||
      (reactType !== '' && reactTypeSRC === svgPicker?.svg && btnClicked)
    ) {
      setReactTypeSRC(likePNG);
      setReactType('');
      setReactClass('');
      setBtnClicked(!btnClicked);
    }

    // console.log(reactionClicked);
  }, [
    btnClicked,
    reactClass,
    reactType,
    reactTypeSRC,
    reactionClicked,
    setReactClass,
    setReactType,
    svgPicker?.svg,
  ]);

  return (
    <button
      type="button"
      className={
        'btn flex hover:bg-gray-100 justify-center py-2 my-1 px-8 md:px-11 lg:px-14 rounded-lg ' +
        reactClass
      }
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
        console.log(btnClicked);
        console.log(reactionClicked);
      }}
    >
      <div className="mt-0.5 mr-2 text-xl w-5">
        <img className="w-full" src={reactTypeSRC} alt="" />
      </div>
      {reactType ? reactType : 'Like'}
    </button>
  );
};

export default LikeButton;

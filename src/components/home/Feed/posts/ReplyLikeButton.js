import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { axiosInstance } from '../../../../network/axiosInstance';

import PostReactions from './PostReactions';
import ReactionClassHandler from './ReactionClasses';

import { useDispatch, useSelector } from 'react-redux';
import { forceUpdateHandler } from '../../../../store/userSlice/NewsFeedSlice';

const ReplyLikeButton = ({
  setReactionClicked,
  containerClassName,
  reactionsFullScreenClassName,
  postId,
  commentId,
  sharedPost,
  comment,
  replyId,
  reply,
  reactionClicked,
  curruntUserCommentReaction,
  curruntUserReplyReaction,
  // For the heart reaction size and position:
  postsProfile,
}) => {
  // Rerender:
  const dispatch = useDispatch();
  // const forceReRender = useSelector(state => state.newsFeed.forceUpdate);

  // Reactions type set:
  const [reactType, setReactType] = useState('');

  // Reactions button clicked:
  const [btnClicked, setBtnClicked] = useState(false);

  // Hide and show reactions:
  const [visible, setVisible] = useState(false);

  // Reactions className set:
  const [reactClass, setReactClass] = useState('');

  // reactHandler for replys not for post:
  const reactHandler = useCallback(
    name => {
      setReactType(name);

      // Handle className for like button in reply:
      ReactionClassHandler(name, setReactClass);

      // Send post reaction to DB:
      const reactBody = {
        reaction: name,
        postType: `${sharedPost ? 'shared' : 'post'}`,
      };

      let endPoint =
        comment && !reply
          ? `/reaction/post/${postId}/${commentId}`
          : reply && !comment
          ? `/reaction/post/${postId}/${commentId}/${replyId}`
          : null;
      axiosInstance
        .post(endPoint, reactBody, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
          // console.log(
          //   `${postId}/${commentId}/${replyId}/${comment}/${reply}/${sharedPost}`
          // );
          // console.log(data._id);
          console.log(response);
          dispatch(forceUpdateHandler(200000));
        })
        .catch(error => {
          console.log(error);
        });
    },
    [comment, commentId, dispatch, postId, reply, replyId, sharedPost]
  );

  // used to render reactions from DB, and it's put in a separate useEffect cause of problems related to dependencies:
  useEffect(() => {
    console.log(curruntUserCommentReaction);
    // for comments:
    // Handle incoming reaction from Data Base:
    if (!reactionClicked) {
      // if (curruntUserCommentReaction && !reactionClicked) {
      // Handle className and style for like button in post:
      ReactionClassHandler(curruntUserCommentReaction, setReactClass);

      // Set name or type for the reaction:
      setReactType(curruntUserCommentReaction);
    }

    // For replys:
    // Handle incoming reaction from Data Base:
    // if (!reactionClicked) {
    if (curruntUserReplyReaction && !reactionClicked) {
      // Handle className and style for like button in post:
      ReactionClassHandler(curruntUserReplyReaction, setReactClass);

      // Set name or type for the reaction:
      setReactType(curruntUserReplyReaction);
    }
  }, [curruntUserCommentReaction, curruntUserReplyReaction, reactionClicked]);

  useEffect(() => {
    if (reactType === '' && reactClass === '' && btnClicked) {
      reactHandler('Like');
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
      reactHandler('', false);
    }
  }, [btnClicked, reactClass, reactHandler, reactType]);

  return (
    <Fragment>
      <div className="flex justify-between mb-1 -ml-3  relative">
        <PostReactions
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
          containerClassName={containerClassName}
          careReplyClassName={'lg:w-52 hover:lg:w-60'}
          reactionsFullScreenClassName={
            reactionsFullScreenClassName && ' -ml-5 -mt-8 '
          }
          // For the heart reaction size and position:
          postsProfile={postsProfile}
        />
      </div>

      <button
        type="button"
        className={'hover:underline underline-offset-2 ' + reactClass}
        onMouseOver={() => {
          setTimeout(() => {
            setVisible(true);
          }, 800);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setVisible(false);
          }, 300);
        }}
        onClick={() => {
          setReactionClicked(false);
          setBtnClicked(!btnClicked);
        }}
      >
        {reactType ? reactType : 'Like'}
      </button>
    </Fragment>
  );
};

export default ReplyLikeButton;

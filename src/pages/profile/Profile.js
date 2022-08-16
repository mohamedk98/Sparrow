import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../network/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import ProfileInfos from './ProfileInfos';
import Header from '../../components/home/Header/Header';
import { addOtherUserData } from '../../store/userSlice/OtherUsersData';
import EditPost from '../../components/home/Feed/posts/EditPost';
import AlertMessage from '../../components/home/Feed/posts/AlertMessage';

function Profile() {
  // To show and hide alerts:
  const alert = useSelector(state => state.newsFeed.alert);

  // To open edit post modal:
  const [showModal, setShowModal] = useState(false);

  // const otherUserState = useSelector(state =>
  //   console.log(state.otherUserData.otherUserData)
  // );
  const dispatch = useDispatch();
  const { username } = useParams();
  useEffect(() => {
    axiosInstance
      .get(`/${username}`)
      .then(res => dispatch(addOtherUserData(res.data)))
      .catch(err => console.log(err));
  }, [dispatch, username]);

  return (
    <>
      <div className="dark:bg-zinc-800 transition duration-700">
        <Header />
        <ProfileInfos />
        <Outlet />

        {
          // Edit post:
        }
        {showModal && (
          <EditPost showModal={showModal} setShowModal={setShowModal} />
        )}

        {
          // Show alerts:
        }
        {alert.message && (
          <div className="fixed bottom-0 left-2 ">
            <AlertMessage alert={alert} />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;

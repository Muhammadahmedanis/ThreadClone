import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/slices/userSlice';
import ProfileLayout from '../Layout/ProfileLayout';

function User() {
  const dispatch = useDispatch();
  const[] = useState(null);
  const { userName } = useParams();
  const userData = useSelector((state) => state.user.userProfile);
  console.log(userData);
  
  useEffect(() => {
    if (userName) {
      dispatch(getUser(userName));        
    }
  }, [dispatch, userName]);

  if (!userData) return null;

  return (
    <>
      <UserHeader user={userData} />
      <ProfileLayout user={userData} />
      <UserPost likes={1200} replies={421} postImage='/zuck-avatar.png'  postTitle="Let's talk about thread" />
      <UserPost likes={100} replies={391} postImage='/zuck-avatar.png' postTitle="Let's discuss designing" />
    </>
  )
}

export default User
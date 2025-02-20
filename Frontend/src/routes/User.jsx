import React from 'react'
import UserHeader from '../compoenets/UserHeader'
import UserPost from '../compoenets/UserPost'

function User() {
  return (
    <>
      <UserHeader />
      <UserPost likes={1200} replies={421} postImage='/zuck-avatar.png'  postTitle="Let's talk about thread" />
      <UserPost likes={100} replies={391} postImage='/zuck-avatar.png' postTitle="Let's discuss designing" />
    </>
  )
}

export default User
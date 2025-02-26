import React from 'react'
import UserPost from '../components/UserPost'
import Comment from '../components/Comment'

function Replies() {
    let icon = false
  return (
    <div className='flex flex-col gap-2'>
        <Comment comment="Look's great!" createdAt="1d" userName="Ali" icon={icon}/>
     </div>
  )
}

export default Replies
import React from 'react'
import UserPost from '../components/UserPost'

function Thread() {
  return (
    <div className='flex flex-col gap-2'>
       <UserPost 
       likes={1200} 
       replies={421} 
       postImage="/zuck-avatar.png"  
       postTitle="Let's talk about Threads" 
      /> 
    </div>
  )
}

export default Thread
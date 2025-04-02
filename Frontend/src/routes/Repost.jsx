import React from 'react'
import UserPost from '../components/UserPost'
import { useOutletContext } from 'react-router-dom';

function Repost() {
  const myInfo = useOutletContext();
  console.log(myInfo?.reposts);

  return (
    <div className='flex flex-col gap-2'>
      {/* {
        myInfo?.reposts?.length > 0 ?
        myInfo?.reposts?.map((post) => (
          <UserPost 
            post={post}
            key={post._id}
          />
        )) : 
        <p className='mt-10 font-bold text-3xl'>No Thread yet!</p>
      } */}
      
       <UserPost 
       likes={1200} 
       replies={421} 
       postImage="/zuck-avatar.png"  
       postTitle="Let's talk about Threads" 
      /> 
    </div>
  )
}

export default Repost
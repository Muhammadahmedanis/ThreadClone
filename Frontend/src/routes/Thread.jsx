import React from 'react'
import UserPost from '../components/UserPost'
import { useOutletContext } from 'react-router-dom';

function Thread() {
  const myInfo = useOutletContext();
  console.log(myInfo?.threads);

  return (
    <div className='flex flex-col gap-2'>
      {
        myInfo?.threads?.length > 0 ?
        myInfo?.threads?.map((post) => (
          <UserPost 
            post={post}
            key={post._id}
          />
        )) : 
        <p className='mt-10 font-bold text-3xl'>No Thread yet!</p>
      }
    </div>
  )
}

export default Thread
import React from 'react'
import UserPost from '../components/UserPost'
import Comment from '../components/Comment'
import { useOutletContext } from 'react-router-dom';
import { format } from 'timeago.js';

function Replies() {
  const myInfo = useOutletContext();
  console.log(myInfo?.replies);
  // console.log(myInfo);
  
  return (
    <div className='flex flex-col gap-2'>
      {
        myInfo?.replies?.map((msg) => {
          return <Comment key={msg._id} commentId={msg._id} comment={msg.text} createdAt={format(msg?.createdAt)} id={msg?.commentBy?._id} userName={msg?.post?.postedBy?.userName} img={msg?.post?.postedBy?.profilePic} />
        }
      )
    }
     </div>
  )
}

export default Replies
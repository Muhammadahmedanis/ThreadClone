import React, { useState } from 'react'
import pic from "/zuck-avatar.png";
import { GoCheckCircleFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Action from '../components/Action';
import { format } from 'timeago.js';

function Post({post}) {
const[like, setLike] = useState(false);
const[isOpen, setIsOpen] = useState(false)
// console.log(post);

  return (
      <div className='shadow-md py-2 px-4 over:shadow-xl hover:shadow-gray-300 dark:hover:shadow-gray-700 transition-shadow duration-300 bg-white dark:bg-gray-900 dark:text-white rounded-lg'>
          <div className='flex '>
          <div className='flex w-full items-center gap-3'>
            <img className='rounded-full h-10 md:h-12' src={pic} alt="Mark Zukerburg" />
            <div className='flex items-center'>
              <p>{post?.postedBy?.userName}</p>
              <GoCheckCircleFill size={17} className='text-blue-500 ml-1' />
            </div>
          </div>
          {/* <div className='flex gap-4 items-center'> */}
            <p className='dark:text-[#616161] font-semibold text-[13px] w-28'>{format(post?.createdAt)}</p>
          {/* </div> */}
        </div>
        <p className='my-2'>{post?.text}</p>
        <div className='rounded overflow-hidden border'>
          <img className='md:h-96 w-full' src={post?.img || pic} alt="" />
        </div>

        <div className='flex gap-1 my-1'>
          <Action like={like} setLike={setLike} />
        </div>

        <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
            <p>{post?.comments?.length} comments</p>
            <span>•</span>
            <p>{post?.likes?.length} likes</p>
        </div>
    </div>
  )
}

export default Post
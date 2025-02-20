import React, { useState } from 'react'
import pic from "/zuck-avatar.png";
import { GoCheckCircleFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Action from '../compoenets/Action';
import Comment from '../compoenets/Comment';

function Post() {
  const[like, setLike] = useState(false);
  return (
    <>
      <div className='px-4'>
        <div className='flex'>
          <div className='flex w-full items-center gap-3'>
            <img className='rounded-full h-10 md:h-12' src={pic} alt="Mark Zukerburg" />
            <div className='flex items-center'>
              <p>markzukerburg</p>
              <GoCheckCircleFill size={17} className='text-blue-500 ml-1' />
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <p className='dark:text-[#616161]'>1d</p>
            <BsThreeDots size={21}/>
          </div>
        </div>
        <p className='my-2'>This is my Post</p>
        <div className='rounded overflow-hidden border'>
          <img className='md:h-96 w-full' src={pic} alt="" />
        </div>
        <div className='flex gap-1 my-1'>
          <Action like={like} setLike={setLike} />
        </div>
        <div className='flex gap-2 items-center'>
          <p className='dark:text-[#616161]'>891 replies</p>
          <span>•</span>
          <p className='dark:text-[#616161]'>321 likes</p>
        </div>

        <hr className='my-4 border-[1.5px]'/>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            <p className='text-xl'>👋</p>
            <p className='dark:text-[#616161]'>Get the app to like, reply and post.</p>
          </div>
          <button className='border rounded px-3 py-0.5 font-bold cursor-pointer'>Get</button>
        </div>

        <hr className='my-4 border-[1.5px]'/>
        <Comment comment="Look's great!" createdAt="1d" userName="Ali" likes="1" />
        <Comment comment="Amazing content and working" createdAt="2d" userName="Mark Zukerburg" likes="12" />
      </div>
    </>
  )
}

export default Post
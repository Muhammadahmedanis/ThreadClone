import React from 'react'
import { useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import pic from "/zuck-avatar.png";
import Action from './Action';

function Comment({comment, createdAt, userName, likes='', icon}) {
    const[like, setLike] = useState(false);
  return (
    <>
      <div className='flex gap-3 w-full my-2'>
        <img className='rounded-full h-10 md:h-12' src={pic} alt="Mark Zukerburg" />
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex justify-between items-center w-full'>
                <p className='font-bold'>{userName}</p>
                <div className='flex gap-4 items-center'>
                    <p className='dark:text-[#616161]'>{createdAt}</p>
                    <BsThreeDots size={21}/>
                </div>
            </div>
            <p>{comment}</p>
            {icon && <Action like={like} setLike={setLike} />}
            {likes && <p className='dark:text-[#616161]'>{likes + (like ? 1 : 0) } likes</p>}
        </div>
      </div>
      <hr className='my-1 border-[1.5px] border-gray-300'/>
    </>
  )
}

export default Comment
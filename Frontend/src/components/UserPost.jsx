import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pic from "/zuck-avatar.png";
import { GoCheckCircleFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Action from './Action';


function UserPost({likes, replies, postImage, postTitle}) {
  const[like, setLike] = useState(false);
  return (
    <Link to="/markzuckerberg/post/1">
        <div className='flex gap-2 mt-4 mb-10 py-2 px-5'>
            <div className='flex flex-col items-center'>
                <img className='rounded-full h-10 md:h-12' src={pic} alt="" />
                <div className='w-[1px] h-full bg-[#616161] my-3'></div>
                <div className='relative w-full'>
                    <img className='rounded-full h-6 absolute top-0 left-3.5' src='/zuck-avatar.png' alt="" />
                    <img className='rounded-full h-6 absolute bottom-0 -right-1' src={pic} alt="" />
                    <img className='rounded-full h-6 absolute bottom-0 -left-1' src={pic} alt="" />
                </div>
            </div>
            <div className='flex-1 flex-col gap-2'>
                <div className='flex justify-between w-full'>
                    <div className='flex items-center w-full'>
                       <p className='text-sm font-bold my-2'>markzuckerberg</p>
                       <GoCheckCircleFill size={17} className='text-blue-500 ml-1' />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='dark:text-[#616161]'>1d</p>
                        <BsThreeDots size={21}/>
                    </div>
                </div>
                <p className='py-1'>{postTitle}</p>
                {postImage && 
                    <div className='rounded overflow-hidden border'>
                        <img className='md:h-96 w-full' src={postImage} alt="" />
                    </div>
                }
                <div className='flex gap-1 my-1'>
                    <Action like={like} setLike={setLike} />
                </div>
                <div className='flex gap-2 items-center'>
                    <p className='dark:text-[#616161]'>{replies} replies</p>
                    <span>•</span>
                    <p className='dark:text-[#616161]'>{likes} likes</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default UserPost
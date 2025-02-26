import React, { useState } from 'react'
import pic from "/zuck-avatar.png";
import { GoCheckCircleFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Action from '../components/Action';

function Post() {
const[like, setLike] = useState(false);
const[isOpen, setIsOpen] = useState(false)

  return (
    <div>
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
            <div className="relative">
            <BsThreeDots size={22} className="text-black cursor-pointer hover:text-gray-700 transition" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div
                id="dropdown"
                className="absolute right-1 mt-2 z-20 w-36 bg-white shadow-lg rounded-lg border border-gray-200 transition-all"
                >
                <ul className="py-2">
                    {["Copy Link", "Share", "Report"].map((item, index) => (
                    <li
                        key={index}
                        className="px-4 py-3 cursor-pointer text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                        {item}
                    </li>
                    ))}
                </ul>
                </div>
            )}
            </div>
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
    </div>
  )
}

export default Post
import React from 'react'
import avatar from "/zuck-avatar.png"
import { Link } from 'react-router-dom'
import { LuInstagram } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";
import { useState } from 'react';
import toast from 'react-hot-toast';

function UserHeader() {
const [isOpen, setIsOpen] = useState(false);
const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
        toast.success("Profile link copied");
    });
}

  return (
    <div className='px-5'>
        <div className='flex justify-between w-full'>
            <div>
                <p className='text-xl md:text-2xl font-bold dark:text-white'>Mark Zuckerburg</p>
                <div className='flex gap-2 py-2'>
                    <p className='text-sm font-semibold dark:text-white'>markauckerburg</p>
                    <p className='text-xs bg-[#1e1e1e] text-[#616161] p-1 rounded-full'>threads.net</p>
                </div>
            </div>
            <div className=''>
                <img src={avatar} alt="" className='h-12 md:h-20 rounded-full' />
            </div>
        </div>
        <p className='dark:text-[#616161] text-[#1e1e1e]'>Co-founder, executive and CEO of Meta Platform</p>
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <p>3.2K followers</p>
                <span>•</span>
                <Link href="" className=''>instagram.com</Link>
            </div>
            <div className='flex gap-2 items-center'>
                <LuInstagram size={38} className='hover:rounded-full hover:ease-in-out hover:bg-gray-100 p-1.5' />
            <div className="relative inline-block">
            <CgMoreO
                size={38}
                className="hover:rounded-full hover:ease-in-out hover:bg-gray-100 p-1.5 text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            />

            {isOpen && (
                <div
                id="dropdown"
                className="absolute right-0 left-0.5 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700">
                <ul className="py-1">
                    <li className='px-4 py-2 cursor-pointer' onClick={copyUrl}>
                        Copy link
                    </li>
                </ul>
                </div>
            )}
            </div>
        </div>
    </div>
    <div className='flex w-full'>
        <div className='flex-1 pb-1 cursor-pointer border-b-2 border-black'>
            <p className='font-bold text-center'>Threads</p>
        </div>
        <div className='flex-1 pb-1 cursor-pointer border-b-[1.5px] border-gray-400'>
            <p className='font-bold text-center'>Replies</p>
        </div>
    </div>
    </div>
  )
}

export default UserHeader
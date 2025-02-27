import React from 'react'
import avatar from "/zuck-avatar.png"
import { Link, Outlet } from 'react-router-dom'
import { LuInstagram } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { followUnfollowUser } from '../redux/slices/userSlice';
import CreatePost from '../routes/CreatePost';
import UpdateProfile from '../routes/UpdateProfile';
import { openEditModel } from '../redux/slices/modelSlice';

function ProfileLayout({user}) {
    // const loginUser = useSelector(state => state.auth);
    // const[following, setFollowing] = useState(user?.data.followers?.includes(loginUser?.user?.id));
    // const [followers, setFollowers] = useState(user?.data?.followers || []);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success("Profile link copied");
        });
    };

    // const handleFollow = async () => {
    //     dispatch(followUnfollowUser(user?.data._id));
    //     setFollowers((prevFollowers) => {
    //         if (following) {
    //             return prevFollowers.filter(id => id !== loginUser?.user?.id);
    //         } else {
    //             return [...prevFollowers, loginUser?.user?.id];
    //         }
    //     });
    //     setFollowing(!following);
    // };

  return (
    <div className='px-5 pt-10 max-w-2xl mx-auto'>
        <div className='flex justify-between w-full'>
            <div>
                <p className='text-xl md:text-2xl font-bold dark:text-white'>Mark Zukerburg</p>
                <div className='flex gap-2 py-2'>
                    <p className='text-sm font-semibold dark:text-white'>mark zukerburg</p>
                    <p className='text-xs bg-gray-300 text-gray-400 font-medium p-1 rounded-full'>threads.net</p>
                </div>
            </div>
            <div>
                <img src='/zuck-avatar.png' alt="" className='h-12 w-20 object-cover md:h-20 rounded-full' />
            </div>
        </div>
        <p className='dark:text-[#616161] text-[#1e1e1e]'>i am a Artist</p>

        {/* { user?.data?.userName == JSON.parse(localStorage.getItem("user")).userName ? 
        (<div className='pt-2'>
            <button type="button" className="text-white bg-[#050708] cursor-pointer hover:bg-[#050708]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
            <Link to="/update">
                Update profile
            </Link>
            </button>
        </div>) :
        (<div className='pt-2'>
            <button onClick={handleFollow} type="button" className="text-white bg-[#050708] cursor-pointer hover:bg-[#050708]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
            { following ? "Following" : "Follow"}
            </button>
        </div>) 
    } */}
        <div className='flex justify-between'>
            <div className='flex gap-8 items-center'>
                <div className='flex relative'>
                    <img className='rounded-full h-8 w-8' src='/zuck-avatar.png' alt="" />
                    <img className='rounded-full h-8 w-8 absolute -right-5' src='/zuck-avatar.png' alt="" />
                </div>
                <p>2 followers</p>
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
    <button onClick={() => dispatch(openEditModel(true))} className="cursor-pointer rounded-lg w-full text-center my-2 px-5 py-2.5 text-[15px] font-bold border border-gray-300"> Edit Profile </button>
    
    <div className='flex w-full my-3'>
        <div className='flex-1 pb-1 cursor-pointer border-b-3 border-gray-600'>
            <p className='font-bold text-center'> <Link to={`/profile/thread/1`}>Threads</Link></p>
        </div>
        <div className='flex-1 pb-1 cursor-pointer border-b-[2px] border-gray-300 text-gray-400'>
            <p className='font-bold text-center'><Link to={`/profile/replies/1`}>Replies</Link></p>
        </div>
        <div className='flex-1 pb-1 cursor-pointer border-b-[2px] border-gray-300 text-gray-400'>
            <p className='font-bold text-center'><Link to={`/profile/repost/1`}>Repost</Link></p>
        </div>
    </div>
    <CreatePost />
    <UpdateProfile />
    <Outlet />
    </div>
  )
}

export default ProfileLayout
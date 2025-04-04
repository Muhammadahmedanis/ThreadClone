import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { LuInstagram } from "react-icons/lu";
import { CgMoreO } from "react-icons/cg";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../routes/CreatePost';
import UpdateProfile from '../routes/UpdateProfile';
import { openEditModel } from '../redux/slices/modelSlice';
import { useUserQuery } from '../redux/hooks/useUserQuery';
import { SlUserFollow } from "react-icons/sl";
import { Helmet } from 'react-helmet-async';

function ProfileLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const loginUser = JSON.parse(localStorage.getItem("user"))?.id;
    const { id } = useParams();
    const { myInfo } = useUserQuery(id);
    const[following, setFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    // console.log(myInfo?.data);
    const { followUserMutation } = useUserQuery();
    
    useEffect(() => {
        if(myInfo?.data){
            // const isFollowing = myInfo.data.followers?.some(follower => follower._id === loginUser);
            setFollowers(myInfo?.data?.followers || []);
            setFollowing(myInfo.data.followers?.some(follower => follower._id === loginUser));
        }
    }, [myInfo, loginUser])

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success("Profile link copied");
            setIsOpen(false);
        });
    };

    const handleFollow = async () => {
        console.log(myInfo?.data?._id);
        // return
        followUserMutation.mutate(myInfo?.data?._id);
        setFollowers((prevFollowers) => {
            if (following) {
                return prevFollowers.filter(id => id !== loginUser);
            } else {
                return [...prevFollowers, loginUser];
            }
        });
        setFollowing(!following);
    };

  return (
    <>
    <Helmet>
        <title>
            {
                myInfo?.data ? myInfo?.data?.userName + ' | Thread' : 'Thread'
            }
        </title>
    </Helmet>
    <div className='px-5 pt-10 max-w-2xl mx-auto'>
        <div className='flex justify-between w-full'>
            <div>
                <p className='text-xl md:text-2xl font-bold dark:text-white'>{myInfo?.data?.userName}</p>
                <div className='flex gap-2 py-2'>
                    <p className='text-sm font-semibold dark:text-white'>{myInfo?.data?.email}</p>
                    <p className='text-xs bg-gray-300 text-gray-400 font-medium p-1 rounded-full'>threads.net</p>
                </div>
            </div>
            <div>
                <img src={ myInfo?.data?.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s'} alt="" className='h-12 w-20 object-cover md:h-20 rounded-full p-1 border border-gray-300' />
            </div>
        </div>
        <p className='dark:text-[#616161] text-[#1e1e1e]'>{myInfo?.data?.bio}</p>

        <div className='flex justify-between'>
            <div className='flex gap-1 items-center'>
                <div className=''>
                    <SlUserFollow size={22} className='font-semibold' />
                </div>
                <p>{myInfo?.data?.followers?.length} {myInfo?.data?.followers?.length == 1 ? "follower" : "followers"}</p>
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
        <div className='pt-2'>
            {myInfo?.data?.userName === JSON.parse(localStorage.getItem("user"))?.userName ? (
                <button 
                onClick={() => dispatch(openEditModel(true))}
                className="cursor-pointer rounded-lg w-full text-center my-2 px-5 py-2.5 text-[15px] font-bold border border-gray-300">
                    Edit Profile
                </button>
            ) : (
                <button 
                    onClick={handleFollow}
                    type="button"
                    className="text-white bg-[#050708] cursor-pointer hover:bg-[#050708]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
                    {following ? "Following" : "Follow"}
                </button>
            )}
        </div>
        <div className='flex w-full my-3'>
            {["thread", "replies", "repost"].map((tab) => {
                const isActive = location.pathname.includes(tab); 
                return (
                    <div 
                    key={tab}
                        className={`flex-1 pb-1 cursor-pointer border-b-[3px] ${
                            isActive ? "border-gray-600 text-black font-bold" : "border-gray-300 text-gray-400"
                        }`}
                    >
                        <p className='text-center'>
                            <Link to={`/profile/${tab}/${myInfo?.data?._id}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Link>
                        </p>
                    </div>
                );
            })}
        </div>
    
    <CreatePost />
    <UpdateProfile data={myInfo?.data} />
    <Outlet context={myInfo?.data} />
    </div>
    </>
  )
}

export default ProfileLayout
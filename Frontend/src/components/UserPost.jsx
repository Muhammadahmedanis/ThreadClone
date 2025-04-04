import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import pic from "/zuck-avatar.png";
import { GoCheckCircleFill } from "react-icons/go";
// import { BsThreeDots } from "react-icons/bs";
import Action from './Action';
import CreatePost from '../routes/CreatePost';
import { format } from 'timeago.js';
// import { usePostQuery } from '../redux/hooks/usePostQuery';
// const [isOpen, setIsOpen] = useState(false);
// console.log(post);
// const isUserPost = userId == post?.postedBy?._id;

function UserPost({ post }) {
  const userId = JSON.parse(sessionStorage?.getItem("user"))?.id;
  const [like, setLike] = useState(post?.likes?.flat()?.includes(userId));
  
  return (
    <>
    { post ? (
        <div className="w-[350px] md:w-[640px] mt-3 py-2 px-4 shadow-md hover:shadow-xl hover:shadow-gray-300 dark:hover:shadow-gray-700 transition-shadow duration-300 bg-white dark:bg-gray-900 dark:text-white rounded-lg">
        {/* User Info */}
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <Link to={`/profile/thread/${post?.postedBy?._id}`}>
              <img className="rounded-full h-10 md:h-12 w-12 border border-gray-200 p-0.5" src={post?.postedBy?.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s' } alt="User" />
            </Link>
            <div className="w-[1px] h-full bg-gray-300 dark:bg-gray-700 mt-3 mb-8"></div>
            <div className="relative w-full">
              {
                post?.comments?.length > 0 ? 
                (
                  post?.comments?.map((data) => (
                    <img key={data?._id} className="rounded-full h-6 w-6 absolute bottom-0 right-4" src={data?.commentBy?.profilePic} alt="User" />
                  ))
                ) : 
                ''
              }
            </div>
          </div>
  
          <div className="flex-1 flex-col gap-2">
            <div className="flex justify-between w-full">
              <div className="flex items-center w-full">
                <p className="text-sm font-bold my-2">{post?.postedBy?.userName}</p>
                <GoCheckCircleFill size={17} className="text-blue-500 ml-1" />
              </div>
                <p className='dark:text-[#616161] font-semibold text-[13px] w-28'>{format(post?.createdAt)}</p>
            </div>
  
            <p className="py-1 text-[14px] text-gray-900 dark:text-gray-300">{post?.text}</p>
            {post?.img && (
              <div className="rounded overflow-hidden border border-gray-300 dark:border-gray-700">
                <Link to={`/${post?.postedBy?.userName}/post/${post?._id}`}>
                  <img className="md:h-96 w-full" src={post?.img || null} alt="Post" />
                </Link>
              </div>
            )}
  
            {/* Post Content */}
            <CreatePost />
  
            {/* Actions */}
            <div className="flex gap-1 my-1">
              <Action postId={post?._id} like={like} setLike={setLike} ownerId={post?.postedBy?._id} />
            </div>
  
            {/* Likes and Replies */}
            <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
              <p>{post?.comments?.length} comments</p>
              <span>•</span>
              <p>{post?.likes?.length} likes</p>
            </div>
          </div>
        </div>
      </div>
    )  :
     <BiLoaderCircle className="size-7 animate-spin" />}
    </>
  );
}

export default UserPost;
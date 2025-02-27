import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pic from "/zuck-avatar.png";
import { GoCheckCircleFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Action from './Action';
import CreatePost from '../routes/CreatePost';

function UserPost({ likes, replies, postImage, postTitle }) {
  const [like, setLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[350px] md:w-[640px] mt-3 py-2 px-4 shadow-md hover:shadow-xl 
      hover:shadow-gray-300 dark:hover:shadow-gray-700 transition-shadow duration-300 
      bg-white dark:bg-gray-900 dark:text-white rounded-lg">
      
      {/* User Info */}
      <div className="flex gap-2">
        <div className="flex flex-col items-center">
          <img className="rounded-full h-10 md:h-12" src={pic} alt="User" />
          <div className="w-[1px] h-full bg-gray-300 dark:bg-gray-700 mt-3 mb-8"></div>
          <div className="relative w-full">
            <img className="rounded-full h-6 absolute bottom-0 right-4" src={pic} alt="User" />
            <img className="rounded-full h-6 absolute bottom-0 -left-1" src={pic} alt="User" />
          </div>
        </div>

        <div className="flex-1 flex-col gap-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center w-full">
              <p className="text-sm font-bold my-2">markzuckerberg</p>
              <GoCheckCircleFill size={17} className="text-blue-500 ml-1" />
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-gray-600 dark:text-gray-400">1d</p>
              <div className="relative">
                <BsThreeDots size={22} className="text-black dark:text-white cursor-pointer 
                  hover:text-gray-700 dark:hover:text-gray-400 transition" 
                  onClick={() => setIsOpen(!isOpen)} 
                />
                {isOpen && (
                  <div id="dropdown" className="absolute right-1 mt-2 z-20 w-36 bg-white dark:bg-gray-800 
                    shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-all">
                    <ul className="py-2">
                      {["Copy Link", "Share", "Report"].map((item, index) => (
                        <li key={index} className="px-4 py-3 cursor-pointer text-gray-700 dark:text-gray-300 
                          font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                          onClick={() => setIsOpen(false)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Post Content */}
          <CreatePost />
          <p className="py-1 text-gray-900 dark:text-gray-300">{postTitle}</p>
          
          {postImage && (
            <div className="rounded overflow-hidden border border-gray-300 dark:border-gray-700">
              <Link to="/markzuckerberg/post/1">
                <img className="md:h-96 w-full" src={postImage} alt="Post" />
              </Link>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-1 my-1">
            <Action like={like} setLike={setLike} />
          </div>

          {/* Likes and Replies */}
          <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
            <p>{replies} replies</p>
            <span>•</span>
            <p>{likes} likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPost;
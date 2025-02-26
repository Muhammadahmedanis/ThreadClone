import React from 'react';
import UserPost from '../components/UserPost';
import { BiLoaderCircle } from 'react-icons/bi';

function Home() {
  return (
    <div className="flex flex-col items-center px-4 pt-12 max-w-2xl mx-auto">
      {/* Input Section */}
      <div className="w-full bg-white dark:bg-gray-900 px-4 py-2  border-b shadow-md">
        <div className="flex items-center gap-3">
          <img className="rounded-full h-10 w-10" src="/zuck-avatar.png" alt="User Avatar" />
          <input 
            type="text" 
            placeholder="Start a thread..." 
            className="w-full px-3 py-2 rounded-full border-none outline-none focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        <button className="cursor-pointer inline-flex gap-1 items-center rounded bg-[#343434] hover:bg-[#343434df] px-5 py-1.5 text-[16px] font-medium text-white shadow-sm transition-colors duration-150">
            Post 
        </button>
        </div>
      </div>

      {/* User Post */}
      <UserPost 
        likes={1200} 
        replies={421} 
        postImage="/zuck-avatar.png"  
        postTitle="Let's talk about Threads"
      />
      <button type="button" className="text-gray-900 hover:text-white my-4 border border-gray-800 hover:bg-gray-900 cursor-pointer font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Load More</button>
    </div>
    // <BiLoaderCircle className="size-7 animate-spin" />
  );
}

export default Home;

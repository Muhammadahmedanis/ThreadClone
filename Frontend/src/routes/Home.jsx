import React, { use, useEffect, useState } from 'react';
import UserPost from '../components/UserPost';
import { usePostQuery } from '../redux/hooks/usePostQuery';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
function Home() {
  const[page, setPage] = useState(1);
  const { posts } = usePostQuery(page);
  const[text, setText] = useState('');
  // const me = useOutletContext();
  // console.log(me?._id);
  
  const { createPostMutation } = usePostQuery();
  const handleSubmit = () => {
    // console.log({text});
    if(!text) return
    createPostMutation.mutate({text}, {
      onSuccess: () => {
      },
    });
    setText('');
  }

  // const handleMore = () => {

  // }
  return (
    <>
    <div className="flex flex-col items-center px-4 pt-12 max-w-2xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      {/* Input Section */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700 shadow-md rounded-lg">
        <div className="flex items-center gap-3">
          <img className="rounded-full h-10 w-10 p-0.5"src={posts?.postedBy?.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s'} alt="User Avatar" />
          <input 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            placeholder="Start a thread..." 
            className="w-full px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          <button onClick={handleSubmit} className="cursor-pointer inline-flex gap-1 items-center rounded bg-gray-800 hover:bg-gray-700 px-5 py-1.5 text-[16px] font-medium text-white shadow-sm transition-colors duration-150 dark:bg-gray-600 dark:hover:bg-gray-500">
            Post
          </button>
        </div>
      </div>

        {
          posts?.length > 0 ?
          posts?.map((post) => (
            <UserPost 
            post={post}
            key={post._id}
            />
          )) : 
          <p className='mt-10 font-bold text-3xl'>No Post Found</p>
        }

      {/* Load More Button */}
      {/* <button onClick={handleMore} type="button" className="text-gray-900 hover:text-white my-4 border border-gray-800 hover:bg-gray-900 cursor-pointer font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
        Load More
      </button> */}
    </div>
    </>
  );
}

export default Home;
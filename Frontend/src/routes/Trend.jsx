import React from 'react'
import { usePostQuery } from '../redux/hooks/usePostQuery'
import { useLocation } from 'react-router-dom'
import { GoCheckCircleFill } from 'react-icons/go';
import { format } from 'timeago.js';

function Trend() {
    const location = useLocation();
    const path = location.pathname.replace(/^\/+/, '');
    let trendPost;
    if (path === 'trend') {
        ({ trendPost } = usePostQuery());
    }
    console.log(trendPost?.data);
    
  return (
    <div>
        <h1 className='text-center mt-10 mb-3 text-2xl font-bold'>Trending Post</h1>
        {
            trendPost?.data?.length > 0 ? 
            trendPost?.data?.map((val) => (
              <div key={val._id} className='max-w-[500px] border border-gray-100 mx-auto shadow-lg py-2 px-4 hover:shadow-gray-300 dark:hover:shadow-gray-700 transition-shadow duration-300 bg-white dark:bg-gray-900 dark:text-white rounded-lg'>
                  <div className='flex '>
                  <div className='flex w-full items-center gap-3'>
                    <img className='rounded-full h-10 w-10' src={val?.postedBy?.profilePic} alt="Mark Zukerburg" />
                    <div className='flex items-center'>
                      <p>{val?.postedBy?.userName}</p>
                      <GoCheckCircleFill size={17} className='text-blue-500 ml-1' />
                    </div>
                  </div>
                    <p className='dark:text-[#616161] font-semibold text-[13px] w-28'>{format(val?.createdAt)}</p>
                </div>
                <p className='my-2'>{val?.text}</p>
                <div className='rounded overflow-hidden border'>
                  <img className='md:h-96 w-full' src={val?.img} alt="" />
                </div>
            </div>
            )) : 
            <div>No post Exist</div>
        }
    </div>
  )
}

export default Trend
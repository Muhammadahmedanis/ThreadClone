import React, { useState } from 'react'
import { useUserQuery } from '../redux/hooks/useUserQuery'
import { IoSearchOutline } from "react-icons/io5";

function Search() {
  const[search, setSearch] = useState('');
  const { queryUser } = useUserQuery(null, null, search);
  const handleSearch = (e) => {
    if(e.key === 'Enter'){
      setSearch(e.target.value.toLowerCase())
    }
  }
  console.log(queryUser?.data);
  return (
    <div className='max-w-2xl mx-auto'>
      <div className="pt-10">   
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className='text-gray-500' size={20} />
            </div>
            <input onKeyDown={handleSearch} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm shadow-lg shadow-gray-300 text-gray-900 border-none outline-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search Mockups, Logos..."/>
        </div>
     </div>
     {queryUser?.data ? (
          queryUser?.data?.length > 0 ? (
            <div className="flex justify-between p-3 mt-3 border-b-2 border-gray-300">
              <div className="flex gap-2">
                <img className="rounded-full h-10 w-10 p-1 border border-gray-300" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s' || queryUser?.data?.userName?.profilePic} alt="User Avatar" />
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold">{queryUser?.data?.userName}</p>
                  <p className="text-sm text-gray-500">{queryUser?.data?.userName}</p>
                  <p className="text-xs text-gray-500 font-semibold">{queryUser?.data?.followers?.length || 0} followers</p>
                </div>
              </div>
              <button className="cursor-pointer h-fit inline-flex gap-1 items-center rounded bg-[#343434] hover:bg-[#343434df] px-5 py-1.5 text-[15px] font-medium text-white shadow-sm transition-colors duration-150">
                Follow
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <img src="https://cdn-icons-png.flaticon.com/512/7486/7486791.png" alt="No user" className="h-24 w-24 opacity-70" />
              <p className="text-lg font-semibold text-gray-600 mt-2">No User Found</p>
              <p className="text-sm text-gray-500">Try searching for another username.</p>
            </div>
          )
        ) : (
          <div className="text-center font-semibold text-xl mt-10 text-gray-700">
            <p className="text-2xl">🔍 Start Searching...</p>
          </div>
          
        )}


      
      {/* <div className='flex justify-between p-3 mt-3 border-b-2 border-gray-300'>
        <div className='flex gap-2'>
          <img className='rounded-full h-10 w-10' src='/zuck-avatar.png' alt="" />
          <div className='flex flex-col gap-2'>
            <p>Mark Zukerburg</p>
            <p className='text-xs text-gray-500 font-semibold'>Mark Zukerburg</p>
            <p className='text-xs text-gray-500 font-semibold'>3 followers</p>
          </div>
        </div>
        <button className="cursor-pointer h-fit inline-flex gap-1 items-center rounded bg-[#343434] hover:bg-[#343434df] px-5 py-1.5 text-[15px] font-medium text-white shadow-sm transition-colors duration-150">
            Follow
        </button>
      </div> */}

    </div>
  )
}

export default Search
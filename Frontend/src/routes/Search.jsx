import React from 'react'

function Search() {
  return (
    <div className='max-w-2xl mx-auto'>
      <div className="pt-10">   
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm shadow-lg shadow-gray-300 text-gray-900 border-none outline-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search Mockups, Logos..."/>
        </div>
     </div>

      <div className='flex justify-between p-3 mt-3 border-b-2 border-gray-300'>
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
      </div>

      
      <div className='flex justify-between p-3 mt-3 border-b-2 border-gray-300'>
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
      </div>

    </div>
  )
}

export default Search
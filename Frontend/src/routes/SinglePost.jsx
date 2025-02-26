import React, { useState } from 'react'
import Comment from '../components/Comment';
import Post from '../components/Post';

// bcryptjs cookie-parser dotenv http-status-codes jsonwebtoken mongoose multer nodemailer uuid helmet express-rate-limit express-mongo-sanitize

function SinglePost() {
  return (
    <>
      <div className='px-4 max-w-2xl mx-auto pt-12'>
        <Post />     
        <hr className='my-4 border-[1.5px]'/>
        <div class="my-3">
          <div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
              <label className="sr-only">Your comment</label>
              <textarea id="comment" rows='3' className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..."></textarea>
          </div>
          <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center border bg-primary-700 rounded-lg hover:bg-primary-800">
              Post comment
          </button>
        </div>  
        <hr className='my-4 border-[1.5px]'/>
        <Comment comment="Look's great!" createdAt="1d" userName="Ali" likes="1" />
        <Comment comment="Amazing content and working" createdAt="2d" userName="Mark Zukerburg" likes="12" />
      </div>
    </>
  )
}

export default SinglePost
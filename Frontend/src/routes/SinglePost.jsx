import React, { useEffect, useState } from 'react'
import Post from '../components/Post';
import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';
import { usePostQuery } from '../redux/hooks/usePostQuery';
import { format } from 'timeago.js'
// bcryptjs cookie-parser dotenv http-status-codes jsonwebtoken mongoose multer nodemailer uuid helmet express-rate-limit express-mongo-sanitize

function SinglePost() {
  const[comment, setComment] = useState('');
  const { postId } = useParams();
  const { post, createCommentMutation } = usePostQuery(1, postId);
  
  const handleComment = () => {
    if (postId && comment) {
      createCommentMutation.mutate({ text: comment, postId });
      setComment('');
    } 
  }

  useEffect(() => {
    if (post) {
        // console.log(post?.comments);
    }
}, [post]);
  
  return (
    <div className='px-4 max-w-2xl mx-auto pt-12 my-2'>
      <Post post={post} />     
      <hr className='my-4 border-[1.5px]'/>
      <div className="my-3">
        <div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <label className="sr-only">Your comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} id="comment" rows='3' className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..."></textarea>
        </div>
        <button onClick={handleComment} type="submit"
            className="inline-flex items-center cursor-pointer hover:bg-gray-200 py-2.5 px-4 text-xs font-medium text-center border bg-primary-700 rounded-lg hover:bg-primary-800">
            Post comment
        </button>
      </div>  
      {post?.comments?.length > 0 && <hr className='my-4 border-[1.5px]'/>}
      {
        post?.comments?.map((msg) => {
          return <Comment key={msg._id} postId={msg.post} commentId={msg._id} comment={msg.text} createdAt={ format(msg?.createdAt) } userName={msg?.commentBy?.userName} id={msg?.commentBy?._id} />
        }
      )
      }
    </div>
  )
}

export default SinglePost
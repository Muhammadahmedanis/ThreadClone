import React from 'react'
import { useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import pic from "/zuck-avatar.png";
import Action from './Action';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { usePostQuery } from '../redux/hooks/usePostQuery';

function Comment({postId, comment, userName, createdAt, id, commentId, img=''}) {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const[like, setLike] = useState(false);
    const { deleteCommentMutation } = usePostQuery();
    const handleDelComment = () => {
      if(comment){
        // console.log({postId, commentId});
        deleteCommentMutation.mutate({postId, commentId});
      }
    }
  return (
    <>
      <div className='flex gap-3 w-full my-2'>
        <img className='rounded-full h-10 md:h-12 p-1 border border-gray-300' src={img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s' } alt="Mark Zukerburg" />
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex justify-between items-center w-full'>
                <p className='font-bold'>{userName}</p>
                <div className='flex gap-4 items-center'>
                    <p className='dark:text-[#616161] text-sm'>{createdAt}</p>
                    {id === userId && <button onClick={handleDelComment} className='cursor-pointer'>
                      <MdOutlineDeleteOutline size={23} className='text-gray-600'/>
                    </button>}
                </div>
            </div>
            <p>{comment}</p>
        </div>
      </div>
      <hr className='my-1 border-[1.5px] border-gray-300'/>
    </>
  )
}

export default Comment
{/* {icon && <Action like={like} setLike={setLike} />} */}
{/* {likes && <p className='dark:text-[#616161]'>{likes + (like ? 1 : 0) } likes</p>} */}
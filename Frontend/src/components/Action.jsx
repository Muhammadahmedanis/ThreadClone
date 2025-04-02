import React from 'react'
import { FaRegHeart, FaHeart} from "react-icons/fa6";
import { BsChat  } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { LuRepeat } from "react-icons/lu";
import { usePostQuery } from '../redux/hooks/usePostQuery';
import { Link } from 'react-router-dom';

function Action({like, setLike, postId}) {
  const { likePostMutation } = usePostQuery()
  const handleLike = () => {
    setLike(!like);
    if (like) {
      likePostMutation.mutate({ postId, action: "unlike" }); // API call to remove like
    } else {
      likePostMutation.mutate({ postId, action: "like" }); // API call to add like
    }
  }
  return (
    <div className='flex items-center gap-3 my-2 cursor-pointer' onClick={(e) => e.preventDefault()}>
        <div onClick={handleLike}>
            {
                like ? 
                (<FaHeart size={22} className='text-[rgb(237,73,86)]' />) :
                (<FaRegHeart size={22} onClick={() => setLike(!like)} />)
            }
        </div>
        <LuRepeat size={22} />
        <Link to='/'>
          <BsChat size={22} />
        </Link>
        <FiSend size={20} />
    </div>
  )
}

export default Action
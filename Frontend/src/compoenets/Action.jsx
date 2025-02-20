import React from 'react'
import { FaRegHeart, FaHeart} from "react-icons/fa6";
import { BsChat  } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { LuRepeat } from "react-icons/lu";

function Action({like, setLike}) {
  return (
    <div className='flex items-center gap-3 my-2 cursor-pointer' onClick={(e) => e.preventDefault()}>
        <div onClick={() => setLike(!like)}>
            {
                like ? 
                (<FaHeart size={22} className='text-[rgb(237,73,86)]' />) :
                (<FaRegHeart size={22} onClick={() => setLike(!like)} />)
            }
        </div>
        <LuRepeat size={22} />
        <BsChat size={22} />
        <FiSend size={20} />
    </div>
  )
}

export default Action
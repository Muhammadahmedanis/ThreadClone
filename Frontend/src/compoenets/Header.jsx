import React from 'react'
import dark from "/dark-logo.svg"

function Header() {
  return (
    <div className='flex justify-center my-5 p-3'>
      <img src={dark} alt="" className='cursor-pointer h-10' />
    </div>
  )
}

export default Header
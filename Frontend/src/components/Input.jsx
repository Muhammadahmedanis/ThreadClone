import React from 'react'

function Input({type, name, placeholder='', className=""}) {
  return (
    <input type={type} name={name} placeholder={placeholder}  className={` ${className} peer block w-full rounded-md outline-none border border-gray-300 px-3 py-2 leading-6 transition-all duration-200 ease-linear focus:text-primary dark:text-white dark:placeholder:text-neutral-300`} />
  )
}

export default Input
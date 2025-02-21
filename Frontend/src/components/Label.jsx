import React from 'react'

function Label({labelName, htmlFor}) {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{labelName}</label>
  )
}

export default Label
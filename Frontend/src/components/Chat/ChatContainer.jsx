import React from 'react'
import MessageInput from './MessageInput'
import MessageSkelton from './MessageSkelton'
import ChatHeader from './ChatHeader'

function ChatContainer() {
  if("messageLoading") return(
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkelton />
      <MessageInput />
    </div>
  )
  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <p>message...</p>
      <MessageInput />
    </div>
  )
}

export default ChatContainer
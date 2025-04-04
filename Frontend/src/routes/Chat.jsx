import React from 'react'
import Sidebar from '../components/Chat/Sidebar'
import NoChatSelected from '../components/Chat/NoChatSelected'

function Chat() {
  return (
    <div className='h-screen bg-base-200 bg-gray-400 mt-5 overflow-y-none'>
    <div className='flex items-center justify-center pt-20 px-4'>
      <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
        <div className='flex h-full rounded-lg overflow-hidden'>
          <Sidebar />
          {"selectedUser" ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Chat
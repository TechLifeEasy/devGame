import React from 'react'
import Chat from './Chat'
import Editor from './Problem'
import Users from './Users'


export default function Index(props) {
  return (
    <div className='flex  w-full h-full'>
      <button  onClick={()=>{
              window.location.href='/';
            }} className=' absolute top-2 right-2 py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black  focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg z-20 '>
        Left
      </button>
      <Users {...props}></Users>
      <Editor ></Editor>
      <Chat></Chat>
    </div>
  )
}

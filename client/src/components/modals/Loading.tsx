import React from 'react'

const Loading = () => {
  return (
    <div className='absolute top-0 left-0 z-10 h-full w-full bg-slate-400 opacity-80 flex justify-center items-center'>
      <p className='opacity-100 text-[2rem]'>Loading...</p>
    </div>
  )
}

export default Loading
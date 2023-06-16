import React from 'react'

import { AnimatedJunimo } from 'assets'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 h-[100vh] w-full bg-slate-400 opacity-70 flex flex-col justify-center items-center gap-4'>
      <img src={AnimatedJunimo} alt="load" />
      <p className='opacity-100 text-[2rem]'>Loading...</p>
    </div>
  )
}

export default Loading
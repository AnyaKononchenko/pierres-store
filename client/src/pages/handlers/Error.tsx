import React from 'react'
import { Link } from 'react-router-dom'

const Error = ({message} : {message: string} ) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[90vh] '>
      <h2 className='text-lg font-bold'>{message}</h2>
      <p>Return to <Link to='/' className='text-[#00f] text-lg'>Home</Link></p>
    </div>
  )
}

export default Error
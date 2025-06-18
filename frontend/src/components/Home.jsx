import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex min-h-full flex-col justify-center py-6 px-12'>
      <h1 className='text-2xl'>Welcome to Home Page</h1>
      <Link to='/login' className='text-blue-500 hover:underline'>
        Go to Login</Link>
    </div>
  )
}

export default Home

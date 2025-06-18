import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/" className='text-blue-500 hover:underline'>Home</Link>
        <Link to="/login" className='text-blue-500 hover:underline ml-4'>Login</Link>
    </div>
  )
}

export default Header

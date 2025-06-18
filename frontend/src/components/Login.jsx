import React from 'react'

const Login = () => {
  return (
    <div>
      <div className='flex min-h-full flex-col justify-center py-6 px-12'>
        <h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Login Screen</h1>
        <div className='border-gray-300 border-2 rounded-lg p-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-center'>
            <h2>Sign in to continue</h2>
            <form action="">
                <div className='flex flex-wrap justify-between mb-4 '>
                <label htmlFor="username">Username:</label>
                <input className ='border-2 rounded-lg' type='text'></input>
                </div>
                <div className='flex flex-wrap justify-between mb-4 '>
                <label htmlFor='password'>Password:</label>
                <input className ='border-2 rounded-lg' type='password'></input><br/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login

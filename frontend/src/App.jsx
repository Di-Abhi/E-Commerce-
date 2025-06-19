import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'

const App = () => {
  return (
    <div className='container text-center mx-auto mt-10'>
      <Routes>
        <Route path='/' element={<AppLayout><Home /></AppLayout>} />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const AppLayout = ({children}) => {
  return (
    <>
    {/*Header*/ }
    <div className='container mx-auto mt-10'>
        <Header/>
    </div>
    {children}
    {/* footer */}
    <div>
        <div className='container mx-auto mt-10 text-center'>
            <Footer/>
        </div>
    </div>
    </>
  )
}

export default AppLayout

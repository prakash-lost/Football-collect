import React from 'react'
import Header from './component/Header'
import Navbar from './component/Navbar'
import {Outlet} from 'react-router'
import Footer from './component/Footer'

const Layout = () => {
  return (
    <div>
      {/* <Header/> */}
      <Navbar/>
      <main className='flex-1'>

      <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
import React, { useContext } from 'react'
import Header from './component/Header'
import Navbar from './component/Navbar'
import {Outlet} from 'react-router'
import Footer from './component/Footer'
import { ThemeContext } from './context/ThemeContext'

const Layout = () => {
  const {isDark}=useContext(ThemeContext)
  return (
    <div className={isDark ?"dark":""}>
      <div>

      {/* <Header/> */}
      <Navbar/>
      <main className='flex-1 bg-white'>

      <Outlet/>
      </main>
      <Footer/>
      </div>
    </div>
  )
}

export default Layout
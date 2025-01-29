import React from 'react'
import Header from './src/components/Header'
import Footer from './src/components/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Header />
      <div className='container h-[95vh]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout

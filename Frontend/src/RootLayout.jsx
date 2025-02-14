import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Header />
      <div className='h-[95vh]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout

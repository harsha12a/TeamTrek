import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Header />
      <div className='h-[min(95vh, 100%)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout

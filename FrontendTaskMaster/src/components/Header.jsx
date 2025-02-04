import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function Header() {
  let [menu, setMenu] = useState(false)
  let [dis, setDis] = useState({ sm: 'hidden' })
  useEffect(() => {
    setDis({ sm: 'block' })
  }, [menu])
  return (
    <div className='bg-green-300 p-5'>
      <nav className='flex h-[50px] justify-between flex-wrap items-center'>
        <div className='text-2xl'>TaskMaster</div>
        {
          menu &&
          <div className={dis.sm}>
            <div className='flex flex-col z-50 absolute flex-wrap justify-between items-center gap-20'>
              {/* <li>Sign in</li> */}
              <Link className='cursor-pointer text-[17px]' to={'/'}>Home</Link>
              <Link className='cursor-pointer text-[17px]' to={'register'}>Register</Link>
            </div>
          </div>
        }
        <div className='hidden md:block sm:block'>
          <div className='flex flex-wrap justify-between items-center gap-20'>
            {/* <li>Sign in</li> */}
            <Link className='cursor-pointer text-[17px]' to={'/'}>Home</Link>
            <Link className='cursor-pointer text-[17px]' to={'register'}>Register</Link>
          </div>
        </div>
        <div className='block md:hidden sm:hidden cursor-pointer text-[24px]' onClick={() => setMenu(!menu)}>{
          menu ? '✕' : '☰'
        }</div>
      </nav>
    </div>
  )
}

export default Header

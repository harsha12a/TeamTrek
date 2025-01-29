import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='bg-green-300 p-5'>
        <nav className='flex h-[50px] justify-between flex-wrap items-center'>
            <div className='text-2xl'>TaskMaster</div>
            <div>
                <div className='flex flex-wrap justify-between items-center gap-20'>
                    {/* <li>Sign in</li> */}
                    <Link className='cursor-pointer text-[17px]'>Home</Link>
                    <Link className='cursor-pointer text-[17px]'>Register</Link>
                    <Link to={'about'} className='cursor-pointer text-[17px]'>About</Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header

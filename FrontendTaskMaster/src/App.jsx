import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import RootLayout from '../RootLayout'
import About from './components/About'
function App({children}) {
  const browser = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browser} />
  )
}

export default App

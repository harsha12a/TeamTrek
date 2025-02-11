import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import RootLayout from './RootLayout'
import Register from './components/Register'
import Login from './components/Login'
function App() {
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
          path: 'register',
          element: <Register />
        },
        {
          path: 'login',
          element: <Login />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browser} />
  )
}

export default App

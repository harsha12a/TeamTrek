import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import RootLayout from './RootLayout'
import Register from './components/Register'
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
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browser} />
  )
}

export default App

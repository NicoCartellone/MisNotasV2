import { createBrowserRouter } from 'react-router-dom'

import { Login, Register, Dashboard, NotFound, Profile } from '../pages/index'
import { RootLayout, PrivateLayout } from '../Layout/index'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'dashboard',
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'profile',
            element: <Profile />
          }
        ]
      }
    ]
  }
])

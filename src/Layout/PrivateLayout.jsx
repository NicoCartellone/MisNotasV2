import { Outlet, Navigate } from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

const Private = () => {
  const { user } = useContext(UserContext)
  return user ? <Outlet /> : <Navigate to='/' />
}

export default Private

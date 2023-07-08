import { Outlet } from 'react-router-dom'
import NavBar from '../components/Layout/NavBar'

const Root = () => {
  return (
    <>
      <NavBar />
      <div className='mx-auto mt-10 w-96'>
        <Outlet />
      </div>
    </>
  )
}

export default Root

import { Outlet } from 'react-router-dom'
import NavBar from '../components/Layout/NavBar'
import { Toaster } from 'sonner'

const Root = () => {
  return (
    <>
      <Toaster position='top-right' richColors />
      <NavBar />
      <div className='mx-auto mt-10 w-96'>
        <Outlet />
      </div>
    </>
  )
}

export default Root

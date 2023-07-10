import { useContext } from 'react'
import { Dropdown, Navbar, Avatar, Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/UserProvider'

import { auth } from '../../config/firebase'
const NavBar = () => {
  const { user, signOutUser } = useContext(UserContext)
  const navegate = useNavigate()
  return (
    <Navbar
      rounded
      border
    >
      <Navbar.Brand href='/'>
        <img
          alt='Flowbite React Logo'
          className='h-8 mr-3 sm:h-10'
          src='/src/assets/tareas.avif'
        />
        <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
          MisNotas
        </span>
      </Navbar.Brand>

      {user
        ? (
          <Dropdown
            inline
            label={<Avatar alt='User settings' img={auth.currentUser.photoURL} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm capitalize'>
                {auth.currentUser.displayName}
              </span>
              <span className='block text-sm font-medium truncate'>
                {auth.currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navegate('/dashboard')}>
              Notas
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navegate('/dashboard/profile')}>
              Perfil
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOutUser}>
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown>
          )
        : (
          < >
            <Navbar.Toggle />
            <Navbar.Collapse>
              <div className='flex flex-col gap-2 md:flex-row'>
                <Button size='sm' color='outline' onClick={() => navegate('/')}>Iniciar Sesión</Button>
                <Button size='sm' onClick={() => navegate('register')}>Registro</Button>
              </div>
            </Navbar.Collapse>
          </>
          )}
    </Navbar>
  )
}
export default NavBar

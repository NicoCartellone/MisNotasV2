import { useState } from 'react'
import { Dropdown, Navbar, Avatar, Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
  const [user, setUser] = useState(false)
  const navegate = useNavigate()
  return (
    <Navbar
      rounded
      border
    >
      <Navbar.Brand href='https://flowbite-react.com'>
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
            label={<Avatar alt='User settings' img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>
                Bonnie Green
              </span>
              <span className='block text-sm font-medium truncate'>
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>
              Settings
            </Dropdown.Item>
            <Dropdown.Item>
              Earnings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              Sign out
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

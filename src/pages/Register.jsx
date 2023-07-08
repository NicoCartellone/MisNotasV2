import { Button, Label, TextInput } from 'flowbite-react'
import GoogleBtn from '../components/Login/GoogleBtn'
const Register = () => {
  return (
    <div>
      <h1 className='my-5 text-4xl text-center capitalize'>Registrate</h1>
      <form className='flex flex-col max-w-md gap-4'>
        <div>
          <div className='block mb-2'>
            <Label
              htmlFor='email2'
              value='Email'
            />
          </div>
          <TextInput
            id='email2'
            placeholder='name@flowbite.com'
            required
            shadow
            type='email'
          />
        </div>
        <div>
          <div className='block mb-2'>
            <Label
              htmlFor='password2'
              value='Contraseña'
            />
          </div>
          <TextInput
            id='password2'
            required
            shadow
            type='password'
            placeholder='*********'
          />
        </div>
        <div>
          <div className='block mb-2'>
            <Label
              htmlFor='repeat-password'
              value='Repetir contraseña'
            />
          </div>
          <TextInput
            id='repeat-password'
            required
            shadow
            type='password'
            placeholder='*********'
          />
        </div>
        <Button type='submit'>
          Registrate
        </Button>
      </form>
      <div className='flex justify-center w-full mt-8 mb-8 align-center'>
        <div className='flex w-5/12 h-px bg-gray-300' />
        <p className='flex items-center justify-center w-1/12 -mt-3'>O</p>
        <div className='flex w-5/12 h-px bg-gray-300' />
      </div>
      <div className='flex justify-center'>
        <GoogleBtn />
      </div>
    </div>
  )
}
export default Register

import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

import { Button, Label, TextInput } from 'flowbite-react'
import GoogleBtn from '../components/Login/GoogleBtn'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const loginScheme = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email no valido')
    .trim('No debe contener espacion en blanco')
    .required('Campo obligatorio'),
  password: Yup.string()
    .trim('No debe contener espacion en blanco')
    .min(4, 'Minimo 8 caracteres')
    .max(8, 'Maximo 12 caracteres')
    .required('Campo obligatorio')
})
const Login = () => {
  const { loginUser, user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  const handleSubmit = ({ email, password }) => {
    loginUser(email, password)
  }
  return (
    <div>
      <h1 className='my-5 text-4xl text-center capitalize'>Iniciar sesión</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginScheme}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors
        }) => (
          <Form className='flex flex-col max-w-md gap-4 px-6 md:px-0'>
            <div>
              <div className='block mb-2'>
                <Label
                  htmlFor='email1'
                  value='Email'
                  color={errors.email && 'failure'}
                />
              </div>
              <TextInput
                id='email1'
                placeholder='ejemplo@mail.com'
                required
                type='email'
                name='email'
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                color={errors.email && 'failure'}
                helperText={errors.email ? <span className='text-red-600'>{errors.email}</span> : null}
              />
            </div>
            <div>
              <div className='block mb-2'>
                <Label
                  htmlFor='password1'
                  value='Contraseña'
                  color={errors.password && 'failure'}
                />
              </div>
              <TextInput
                id='password1'
                required
                type='password'
                placeholder='*********'
                name='password'
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                color={errors.password && 'failure'}
                helperText={errors.password ? <span className='text-red-600'>{errors.password}</span> : null}
              />
            </div>
            <Button type='submit' onClick={handleSubmit}>
              Acceder
            </Button>
          </Form>
        )}
      </Formik>
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
export default Login

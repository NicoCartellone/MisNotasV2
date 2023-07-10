import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

import { Button, Label, TextInput } from 'flowbite-react'
import GoogleBtn from '../components/Login/GoogleBtn'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const registerScheme = Yup.object().shape({
  name: Yup.string()
    .trim('No debe contener espacion en blanco')
    .max(20, 'Maximo 20 caracteres')
    .min(4, 'Minimo 4 caracteres')
    .required('Campo obligatorio'),
  email: Yup.string()
    .email('Formato de email no valido')
    .trim('No debe contener espacion en blanco')
    .required('Campo obligatorio'),
  password: Yup.string()
    .trim('No debe contener espacion en blanco')
    .min(4, 'Minimo 8 caracteres')
    .max(20, 'Maximo 20 caracteres')
    .required('Campo obligatorio'),
  repassword: Yup.string()
    .trim('No debe contener espacion en blanco')
    .required('Campo obligatorio')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
})
const Register = () => {
  const { registerUser, user, loading } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  const handleSubmit = ({ email, password, name }) => {
    registerUser(email, password, name)
  }
  return (
    <div>
      <h1 className='my-5 text-4xl text-center capitalize'>Registrate</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '', repassword: '' }}
        validationSchema={registerScheme}
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
                  htmlFor='nombre'
                  value='Nombre completo'
                  color={errors.name && 'failure'}
                />
              </div>
              <TextInput
                id='nombre'
                placeholder='Nombre Apellido'
                required
                shadow
                type='text'
                name='name'
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                color={errors.name && 'failure'}
                helperText={errors.name ? <span className='text-red-600'>{errors.name}</span> : null}
              />
            </div>
            <div>
              <div className='block mb-2'>
                <Label
                  htmlFor='email'
                  value='Email'
                  color={errors.email && 'failure'}
                />
              </div>
              <TextInput
                id='email'
                placeholder='ejemplo@mail.com'
                required
                shadow
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
                  htmlFor='password2'
                  value='Contraseña'
                  color={errors.password && 'failure'}
                />
              </div>
              <TextInput
                id='password2'
                required
                shadow
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
            <div>
              <div className='block mb-2'>
                <Label
                  htmlFor='repeat-password'
                  value='Repetir contraseña'
                  color={errors.repassword && 'failure'}
                />
              </div>
              <TextInput
                id='repeat-password'
                required
                shadow
                type='password'
                placeholder='*********'
                name='repassword'
                onChange={handleChange('repassword')}
                onBlur={handleBlur('repassword')}
                value={values.repassword}
                color={errors.repassword && 'failure'}
                helperText={errors.repassword ? <span className='text-red-600'>{errors.repassword}</span> : null}
              />
            </div>
            <Button
              type='submit'
              onClick={handleSubmit}
              isProcessing={loading && true}
              disabled={loading && true}
            >
              Registrate
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
export default Register

import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

import { Button, Label, TextInput } from 'flowbite-react'
import GoogleBtn from '../components/Login/GoogleBtn'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const formularioScheme = Yup.object().shape({
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
  const { loginUser } = useContext(UserContext)

  const handleSubmit = (values) => {
    loginUser(values.email, values.password)
  }

  return (
    <div>
      <h1 className='my-5 text-4xl text-center capitalize'>Iniciar sesión</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={formularioScheme}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <Form className='flex flex-col max-w-md gap-4'>
            <div>
              <div className='block mb-2'>
                <Label
                  htmlFor='email1'
                  value='Email'
                />
              </div>
              <TextInput
                id='email1'
                placeholder='example@mail.com'
                required
                type='email'
                name='email'
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? console.log(errors.email) : null}
            </div>
            <div>
              <div className='block mb-2'>
                <Label
                  htmlFor='password1'
                  value='Contraseña'
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
              />
              {errors.email && touched.email ? console.log(errors.password) : null}
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

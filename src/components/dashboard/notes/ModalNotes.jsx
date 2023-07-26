import { useState } from 'react'
import { Button, Textarea, Label, Modal, TextInput } from 'flowbite-react'
import PlusIcon from '../icons/PlusIcon'
import { useFirestore } from '../../../hooks/useFirestore'
import { auth } from '../../../config/firebase'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const addNoteScheme = Yup.object().shape({
  title: Yup.string()
    .trim('No se permiten caracteres vacios al inicio y al final')
    .min(3, 'Minimo 3 caracteres')
    .max(20, 'Maximo 20 caracteres')
    .required('Campo obligatorio'),
  note: Yup.string()
    .trim('No se permiten caracteres vacios al inicio y al final')
    .min(3, 'Minimo 3 caracteres')
    .max(100, 'Maximo 100 caracteres')
    .required('Campo obligatorio')
})

const ModalNotes = () => {
  const [openModal, setOpenModal] = useState()
  const props = { openModal, setOpenModal }

  const { addData } = useFirestore()

  const handleSubmit = async ({ title, note }) => {
    if (title && note !== '') {
      await addData(title, note, auth.currentUser.uid)
    }
  }

  return (
    <>
      <Button pill onClick={() => props.setOpenModal('form-elements', ' dismissible')}>
        <PlusIcon />
      </Button>
      <Modal dismissible show={props.openModal === 'form-elements' && 'dismissible'} size='md' popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <Formik
            initialValues={{ title: '', note: '' }}
            validationScheema={addNoteScheme}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors
            }) => (
              <Form className='space-y-6'>
                <h3 className='text-xl font-medium text-center text-gray-900 dark:text-white'>Crear nueva nota</h3>
                <div>
                  <div className='block mb-2'>
                    <Label
                      htmlFor='title'
                      value='Titulo'
                      color={errors.title && 'failure'}
                    />
                  </div>
                  <TextInput
                    id='title'
                    placeholder='Mi nota'
                    required
                    type='text'
                    name='title'
                    onChange={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    color={errors.title && 'failure'}
                    helperText={errors.title ? <span className='text-red-600'>{errors.title}</span> : null}
                  />
                </div>
                <div>
                  <div className='block mb-2'>
                    <Label
                      htmlFor='note'
                      value='Nota'
                      color={errors.note && 'failure'}
                    />
                  </div>
                  <Textarea
                    id='note'
                    placeholder='Escriba su nota aqui...'
                    required
                    rows={4}
                    name='note'
                    onChange={handleChange('note')}
                    onBlur={handleBlur('note')}
                    value={values.note}
                    color={errors.note && 'failure'}
                    helperText={errors.note ? <span className='text-red-600'>{errors.note}</span> : null}
                  />
                </div>
                <div className='flex justify-center w-full'>
                  <Button
                    type='submit'
                    onClick={handleSubmit}
                  >Crear
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalNotes

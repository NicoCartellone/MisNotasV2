import { useEffect, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'

import { auth } from '../config/firebase'

import { Card, Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import ModalNotes from '../components/dashboard/notes/ModalNotes'

import CardDeleteNoteBtn from '../components/dashboard/notes/CardDeleteNoteBtn'
import EditIcon from '../components/dashboard/icons/EditIcon'

const Dashboard = () => {
  const { data, getData } = useFirestore()

  const [openModal, setOpenModal] = useState()
  const [email, setEmail] = useState('')
  const props = { openModal, setOpenModal, email, setEmail }
  const [itemData, setItemData] = useState()

  useEffect(() => {
    getData(auth.currentUser.uid)
  }, [])

  return (
    <>
      <div className='flex flex-wrap justify-center gap-4 mx-5 my-5 mt-10'>
        {
        data.map((item) => (
          <Card key={item.id} className='max-w-sm min-w-full bg-yellow-200'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <p className='text-2xl font-bold capitalize'>{item.titulo}</p>
                <p className='text-sm text-gray-700 font-extralight'>{item.fecha}</p>
              </div>
              <div className='gap-2'>
                <button onClick={() => { props.setOpenModal('form-elements'); setItemData(item) }}> <EditIcon /></button>
                <CardDeleteNoteBtn itemId={item.id} />
              </div>
            </div>
            <p className='text-xl text-center break-words'>{item.nota}</p>
          </Card>
        ))
      }
      </div>
      <div className='fixed bottom-4 md:bottom-8 lg:bottom-12 right-4 md:right-8 lg:right-12'>
        <ModalNotes />
      </div>
      <Modal show={props.openModal === 'form-elements'} size='md' popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>{itemData?.titulo}</h3>
            <div>
              <div className='block mb-2'>
                <Label htmlFor='email' value='Your email' />
              </div>
              <TextInput id='email' placeholder='name@company.com' required />
            </div>
            <div>
              <div className='block mb-2'>
                <Label htmlFor='password' value='Your password' />
              </div>
              <TextInput id='password' type='password' required />
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <Checkbox id='remember' />
                <Label htmlFor='remember'>Remember me</Label>
              </div>
              <a href='/modal' className='text-sm text-cyan-700 hover:underline dark:text-cyan-500'>
                Lost Password?
              </a>
            </div>
            <div className='w-full'>
              <Button>Log in to your account</Button>
            </div>
            <div className='flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300'>
              Not registered?&nbsp;
              <a href='/modal' className='text-cyan-700 hover:underline dark:text-cyan-500'>
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default Dashboard

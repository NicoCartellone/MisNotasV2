import { useEffect } from 'react'
import { useFirestore } from '../hooks/useFirestore'

import { auth } from '../config/firebase'

import { Button, Card } from 'flowbite-react'
import ModalNotes from '../components/dashboard/notes/ModalNotes'
import CardEditNoteBtn from '../components/dashboard/notes/CardEditNoteBtn'
import CardDeleteNoteBtn from '../components/dashboard/notes/CardDeleteNoteBtn'

const Dashboard = () => {
  const { data, getData } = useFirestore()

  useEffect(() => {
    getData(auth.currentUser.uid)
  }, [])

  return (
    <>
    <div className='flex justify-center mt-10 mx-5 my-5 gap-4 flex-wrap'>
      {
        data.map((item) => (
          <Card key={item.id} className='bg-yellow-200 max-w-sm min-w-full'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <p className='text-2xl capitalize font-bold'>{item.titulo}</p>
                <p className='font-extralight text-sm text-gray-700'>{item.fecha}</p>
              </div>
              <div className='gap-2'>
              <CardEditNoteBtn/>
              <CardDeleteNoteBtn itemId={item.id}/>
              </div>
            </div>
            <p className='break-words text-center text-xl'>{item.nota}</p>
          </Card>
        ))
      }
    </div>
    <div className='fixed bottom-4 md:bottom-8 lg:bottom-12 right-4 md:right-8 lg:right-12'>
        <ModalNotes />
      </div>
    </>
  )
}
export default Dashboard

import { useEffect } from 'react'
import { useFirestore } from '../hooks/useFirestore'

import { auth } from '../config/firebase'

import { Button, Card } from 'flowbite-react'
import PlusIcon from '../components/dashboard/icons/PlusIcon'

const Dashboard = () => {
  const { data, getData } = useFirestore()

  useEffect(() => {
    getData(auth.currentUser.uid)
  }, [])

  return (
    <div className='text-center'>
      {
        data.map((item) => (
          <Card key={item.id} className=''>
            <p>{item.titulo}</p>
            <p>{item.fecha}</p>
            <p>{item.nota}</p>
          </Card>
        ))
      }
      <div className='fixed bottom-4 md:bottom-8 lg:bottom-12 right-4 md:right-8 lg:right-12'>
        <Button pill>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
export default Dashboard

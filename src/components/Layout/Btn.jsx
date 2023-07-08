import { Button } from 'flowbite-react'

const customTheme = {
  color: {
    primary: 'bg-red-500 hover:bg-red-600'
  }
}

export default function Btn () {
  return <Button theme={customTheme}>Click me</Button>
}

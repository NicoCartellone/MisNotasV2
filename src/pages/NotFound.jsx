import logo from '../assets/tareas.avif'
const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <img class='h-auto max-w-full' src={logo} alt='image description' width='70' height='70' />
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        404: Opps, Page NotFound
      </h1>
    </div>
  )
}
export default NotFound

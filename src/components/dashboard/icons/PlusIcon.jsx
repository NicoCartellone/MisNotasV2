const PlusIcon = ({ width = 24, height = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={width}
      height={height}
      fill={color}
    >
      <path d='M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V5a1 1 0 0 1 1-1z' />
    </svg>
  )
}

export default PlusIcon

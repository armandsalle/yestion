const Handle = ({ handleProps }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        cursor: 'grab',
      }}
      className="mr-4 bg-gray-400 handle"
      {...handleProps}
    ></div>
  )
}

export default Handle

const Delete = ({ onClick }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        cursor: 'pointer',
      }}
      className="mr-4 bg-red-700 delete"
      onClick={onClick}
    ></div>
  )
}

export default Delete

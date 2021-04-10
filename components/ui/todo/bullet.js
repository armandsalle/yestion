const Bullet = ({ as }) => {
  return (
    <div
      style={{
        width: '6px',
        height: '6px',
        display: as === 'List' ? 'block' : 'none',
        flex: '0 0 auto',
      }}
      className="bg-gray-800 rounded-full"
    ></div>
  )
}

export default Bullet

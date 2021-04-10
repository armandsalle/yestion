import cn from 'classnames'

const Button = ({ children, red, ...props }) => {
  return (
    <button
      className={cn(
        'ml-3 px-3 py-2 rounded-md',
        red ? 'bg-red-600 text-white' : 'bg-black text-white'
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

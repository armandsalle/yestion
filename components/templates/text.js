import classNames from 'classnames'
import { useState, useCallback, useEffect, useRef } from 'react'

const TextTemplate = ({ value, as }) => {
  const asTitle = 'text-2xl'
  const asListItem = 'transform translate-x-4'
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(value)
  const inputRef = useRef(null)

  const save = useCallback(() => {
    setContent(inputRef.current.innerText)
    setEditing(false)
  }, [])

  return (
    <div className="mt-3 relative">
      <div
        style={{
          width: 10,
          height: 10,
          transform: 'translate(-160%, -40%)',
          cursor: 'grab',
          opacity: editing ? 1 : 0,
          transition: 'opacity .15s ease-out',
        }}
        className="absolute top-1/2  bg-gray-400"
      ></div>
      <div
        style={{
          width: '5px',
          height: '5px',
          transform: 'translate(80%, -50%)',
          display: as === 'ListItem' ? 'block' : 'none',
        }}
        className="absolute top-1/2 bg-gray-800 rounded-full"
      ></div>
      <div
        onMouseEnter={() => setEditing(true)}
        onMouseLeave={() => setEditing(false)}
        className={classNames(
          `border-none outline-none`,
          as === 'Title' && asTitle,
          as === 'ListItem' && asListItem
        )}
        onClick={!editing ? () => setEditing(true) : undefined}
        contentEditable={true}
        ref={inputRef}
        onBlur={save}
        suppressContentEditableWarning={true}
        placeholder="Type '/' for commands"
      >
        {content}
      </div>
    </div>
  )
}

export default TextTemplate

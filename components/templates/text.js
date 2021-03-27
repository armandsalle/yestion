import classNames from 'classnames'
import { useState, useCallback, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const TextTemplate = ({ value, as, dId, index }) => {
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
    <Draggable draggableId={dId} index={index}>
      {(provided) => {
        return (
          <div
            className="mt-3 relative flex items-center"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              style={{
                width: 10,
                height: 10,
                cursor: 'grab',
              }}
              className="mr-4 bg-gray-400"
              {...provided.dragHandleProps}
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
      }}
    </Draggable>
  )
}

export default TextTemplate
